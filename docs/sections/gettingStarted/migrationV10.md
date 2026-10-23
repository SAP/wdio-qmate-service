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

## 4. Frame / iframe switching

`browser.switchFrame()` is removed for BiDi sessions and throws:

```
`switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10.
```

The BiDi replacement is `browser.frame()`, which accepts a CSS selector string, an element, a URL, a context ID, or a predicate function.

```js
// switchToIframe
if (browser.isBidi) {
  await browser.frame(selector);               // CSS selector string
} else {
  await browser.switchFrame(await $(selector));
}

// switchToDefaultContent (return to top-level context)
if (browser.isBidi) {
  await browser.frame((ctx) => !ctx.isFrame);  // predicate: find top context
} else {
  await browser.switchFrame(null);
}
```

`browser.switchFrame(null)` in Classic mode and `browser.switchFrame(element)` still work when `wdio:enforceWebDriverClassic: true` is set.

---

## 5. `browser.uploadFile()` removed

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

## 6. `isDisplayedInViewport()` removed

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

## 7. `$$()[n]` out-of-bounds behaviour changed

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

## 8. WebDriver error message format change

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

## 9. Chrome error message format

`browser.execute()` errors from Chrome no longer carry the `"javascript error:"` prefix in v10:

```
// v8
"javascript error: Cannot read properties of undefined (reading 'parts')"

// v10
"waitUntil condition failed with the following reason: TypeError: Cannot read properties of undefined (reading 'parts')"
```

Update any `toThrow()` assertions that match against the old prefix.

---

## 10. `lib/` rebuild on CI

`lib/` is gitignored but rebuilt on every `npm ci` via the `prepare` hook (`npm run build` → `tsc`). Source fixes in `src/` are always picked up — no need to commit compiled output.
