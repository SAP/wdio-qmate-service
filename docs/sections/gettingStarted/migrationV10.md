# Migration Guide: wdio v8 → v10

## Overview

WebdriverIO v10 ships with breaking changes to browser management, protocol defaults, and API surface. This document captures all findings from the wdio-qmate-service migration.

---

## 1. Chrome / Browser Management

### What changed

| v8 | v10 |
|---|---|
| `wdio-chromedriver-service` + `chromedriver` package | Built-in via `@wdio/utils` + `@puppeteer/browsers` |
| ChromeDriver downloaded separately, matched to pre-installed Chrome | Chrome + ChromeDriver downloaded together as a matched pair |
| Chrome version = pre-installed runner version | Chrome version = latest stable (auto-downloaded) unless pinned |

### What was removed

```json
// package.json — remove these
"chromedriver": "^150.0.1",
"wdio-chromedriver-service": "^8.1.1"
```

Remove `wdio-chromedriver-service` from `services` in your config as well.

### Pinning Chrome version

wdio v10 resolves `browserVersion` via `@puppeteer/browsers`. Set it in your capability:

```js
capabilities: [{
  browserName: "chrome",
  browserVersion: "150",  // resolves to latest 150.x.x patch
  ...
}]
```

A major version string (e.g. `"150"`) is treated as a milestone and resolved against Google's `latest-versions-per-milestone.json`. A full build ID (e.g. `"150.0.7049.0"`) pins exactly and skips the resolution call.

**Why this matters:** Chrome 152+ switched headless to a full browser process (previously `--headless=new` was opt-in). Chrome 155 in CI caused >90s cold-start navigation to SAP pages, exceeding undici's default `headersTimeout`. Pinning to 150 restores v8-equivalent behaviour.

---

## 2. HTTP Client: `got` → `undici`

wdio v10 replaced `got` with `undici` for all WebDriver HTTP communication.

### Timeout behaviour

undici ties `headersTimeout` to `connectionRetryTimeout` (default: 90000ms). If Chrome takes longer than 90s to navigate (e.g. on first load of a heavy SPA in CI), you'll see:

```
UND_ERR_HEADERS_TIMEOUT when running "url" with method "POST"
```

Fix: pin Chrome to a version with faster cold-start (see section 1), or increase `connectionRetryTimeout` in your config.

---

## 3. BiDi (WebSocket) enabled by default

wdio v10 enables WebDriver BiDi by default. **`webSocketUrl: false` in config does not disable it** — this setting is silently ignored because wdio v10 injects `webSocketUrl: true` directly into capabilities at session start, overriding any config-level value.

### To force Classic WebDriver mode

Set the capability flag instead:

```js
capabilities: [{
  "wdio:enforceWebDriverClassic": true,
  ...
}]
```

### BiDi browser support

BiDi is not universally supported:

| Browser | BiDi support |
|---|---|
| Chrome / Chromium | Yes (since ~Chrome 112) |
| Firefox | Yes |
| Edge | Yes (follows Chrome) |
| Safari | No |

Use `wdio:enforceWebDriverClassic: true` for Safari capabilities or any environment where BiDi is unavailable.

### Branching on BiDi at runtime

Use `browser.isBidi` to detect the active mode:

```js
if (browser.isBidi) {
  // BiDi path
} else {
  // Classic WebDriver path
}
```

---

## 4. `browser.url()` navigation in BiDi

`browser.url()` (and `common.navigation.navigateToUrl`) works in BiDi, but resolves on `DOMContentLoaded` rather than `load` — external scripts that load after `DOMContentLoaded` may not yet be available when the command returns.

For applications that depend on external scripts (e.g. UI5 bootstrap from a CDN), add a `readyState` guard in your `before` hook or wdio config:

```js
browser.overwriteCommand("url", async (origFn, url) => {
  await origFn(url);
  await browser.waitUntil(
    async () => (await browser.execute(() => document.readyState)) === "complete",
    { timeout: 30000, interval: 200 }
  );
});
```

`common.navigation.navigateToUrl` wraps `browser.url()` and inherits this behaviour. No changes to test scripts are required as long as the guard is in place at the config level.

---

## 5. Frame / iframe switching

`browser.switchFrame()` throws in BiDi sessions:

```
`switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10.
```

### BiDi frame model

In BiDi, there is no global frame switch. Instead, `browser.browsingContexts()` returns all top-level `BrowsingContext` objects, and you call `ctx.frame({ selector })` on a top-level context to get a child frame context. All element queries must then be issued on the returned context rather than on `browser`:

```js
// BiDi
const [topCtx] = await browser.browsingContexts();
const frame = await topCtx.frame({ selector: 'iframe#myFrame' });
const text = await frame.$('h1').getText();  // scoped to frame
```

`browser.switchWindow()` is also removed in BiDi. Use `browser.getWindowHandles()` + `browser.switchToWindow()` instead (qmate's `switchToNewWindow` already handles this).

### qmate implementation: `getContext()` pattern

qmate's `util.browser.switchToIframe()` and all reuse-layer element queries have been updated to work natively in BiDi mode via a stored context pattern:

- `switchToIframe(selector)` polls `browser.browsingContextGetTree` until a child BiDi browsing context appears, then stores it as `_frameContext`.
- `switchToDefaultContent()` clears `_frameContext` (sets it to `null`).
- `getContext()` returns `_frameContext ?? browser` — all `$`/`$$` calls in the reuse layer go through `getContext()` to scope to the active frame.

If you write custom test helpers that interact with elements inside an iframe, use `util.browser.getContext()` instead of the bare `browser` or `$()` shorthand:

```js
// inside an iframe after util.browser.switchToIframe(selector)
const ctx = util.browser.getContext();
const text = await ctx.$('h1').getText();  // scoped to the iframe
```

#### Pitfall: frame BiDi context initialization timing

`topCtx.frame(element)` and `topCtx.frame({ selector })` both route through wdio's `frameFromElement` internally. `frameFromElement` calls `element.waitForExist()` — a single blocking call that waits up to `waitforTimeout` (300s in CI). If the iframe's BiDi browsing context isn't initialized yet, this hangs for the full timeout before throwing.

The fix: poll `browser.browsingContextGetTree` directly (at 500ms intervals) until a child context appears, then call `topCtx.frame({ id: contextId })`. The `{ id }` form resolves via a single synchronous tree walk with no internal polling:

```ts
const timeout = browser.options.waitforTimeout ?? 30000;
const contextId = await browser.waitUntil(
  async () => {
    const { contexts } = await browser.browsingContextGetTree({ root: topCtx.contextId });
    const children = contexts[0]?.children ?? [];
    return children.length > 0 ? children[0].context : false;
  },
  { timeout, interval: 500 }
);
this._frameContext = await topCtx.frame({ id: contextId });
```

#### Pitfall: stale frame context across specs

`_frameContext` is an instance variable on the `util.browser` singleton. In a WDIO worker that runs multiple spec files sequentially, a frame context stored by spec A becomes a dead `BrowsingContext` once the browser navigates away. Calling `switchToIframe` without first calling `switchToDefaultContent` would leave `_frameContext` set — and `getContext()` in the next spec would return the dead context.

qmate resets `_frameContext = null` at the start of every `switchToIframe` call so that the element visibility check runs against the top-level page, not a stale iframe context. Always call `switchToDefaultContent()` when finished with an iframe to make the reset explicit.

---

## 6. `browser.act()` — LLM dependency (CI blocker at SAP)

wdio v10 introduces `browser.act()`, an agentic API that sends natural-language instructions to an LLM to drive the browser. Example:

```js
await browser.act('click the submit button and wait for the confirmation dialog');
```

### Blocker for SAP CI pipelines

`browser.act()` requires:

1. **Outbound HTTPS to an LLM provider** (`api.openai.com`, `api.anthropic.com`, etc.)
2. **An API key** in the environment (`OPENAI_API_KEY` / `ANTHROPIC_API_KEY`)
3. **An `ai` config block** in your wdio config pointing at the provider/model

At SAP, agent/LLM API access is not yet enabled in CI pipelines (GHA, Jenkins). Any test using `browser.act()` will fail at runtime with a network or auth error.

**Recommendation:** Avoid `browser.act()` in automated test suites until LLM access is cleared for SAP CI infrastructure. It is safe for local exploratory use only.

---

## 7. `browser.uploadFile()` removed

`browser.uploadFile()` no longer exists in v10. In Classic WebDriver mode, pass local file paths directly to `setValue()` on the file input — the driver handles the transfer natively:

```js
// before
const remotePath = await browser.uploadFile(localPath);
await elem.addValue(remotePath);

// after — single file
await elem.setValue(path.resolve(localPath));

// after — multiple files (newline-separated)
await elem.setValue(files.map(f => path.resolve(f)).join("\n"));
```

---

## 8. `isDisplayedInViewport()` removed

`element.isDisplayedInViewport()` no longer exists in wdio v10. Replace with `element.isDisplayed()`.

This applies to both `.ts` and plain `.js` source files.

```js
// before
return (await el.isDisplayedInViewport());

// after — use intermediate variable to satisfy no-return-await lint rule
const visible = await el.isDisplayed();
return visible;
```

---

## 9. `$$()[n]` out-of-bounds behaviour changed

In v8, accessing an out-of-bounds index on a `$$()` result returned `undefined` (plain JS array). In v10, `$$()` returns a smart array — out-of-bounds index access triggers `browser.waitUntil()` waiting for that index to appear, then times out:

```
Error: Index out of bounds! $$(selector) returned only N elements.
```

This can cause tests to hang for the full `waitforTimeout` before failing. Fix: guard before access:

```js
if (index >= elems.length) return false;
return elems[index].isExisting();
```

---

## 10. WebDriver error message format change

v10 wraps WebDriver errors with a prefix and session info:

```
// v8
"invalid element state"

// v10
"WebDriverError: invalid element state\n  (Session info: chrome=150...) when running \"element/.../clear\" with method \"POST\""
```

Update `toThrow()` assertions to match a stable substring rather than the full message:

```js
// before
.rejects.toThrow("Function 'x' failed with: Retries done. Failed to execute the function:invalid element state")

// after
.rejects.toThrow("invalid element state")
```

---

## 11. Chrome error message format

`browser.execute()` errors from Chrome no longer carry the `"javascript error:"` prefix in v10:

```
// v8
"javascript error: Cannot read properties of undefined (reading 'parts')"

// v10
"waitUntil condition failed with the following reason: TypeError: Cannot read properties of undefined (reading 'parts')"
```

Update any `toThrow()` assertions that match against the old prefix.

---

## 12. `lib/` rebuild on CI

`lib/` is gitignored but rebuilt on every `npm ci` via the `prepare` hook (`npm run build` → `tsc`). Source fixes in `src/` are always picked up — no need to commit compiled output.
