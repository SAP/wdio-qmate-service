# Migration Guide: wdio v8 → v10

## Overview

WebdriverIO v10 ships with breaking changes to browser management, protocol defaults, and API surface. This document captures all findings from the wdio-qmate-service migration.

Use Node.js **22.19.0 or newer**; the local cross-repository integration checks use Node.js 24. The installed WDIO v10 dependency graph requires this minimum, even where an older package manifest still accepts earlier Node.js releases.

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

**Why this matters:** the migration uses Chrome 150 as a tested compatibility baseline. Earlier migration runs observed slow navigation with a newer browser, but that is not evidence of a general headless architecture change at Chrome 152. Keep the browser version explicit while comparing migration results, and validate newer browser versions separately.

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

In BiDi, frame ownership is explicit. `browser.browsingContexts()` returns top-level contexts; choose the one matching `browser.getWindowHandle()`, not simply the first entry. Qmate resolves the requested iframe and exposes its owned context:

```js
await util.browser.switchToIframe('iframe#myFrame');
const heading = await nonUi5.element.getByCss('h1');
const text = await nonUi5.element.getValue(heading);
await util.browser.switchToDefaultContent();
```

`browser.switchWindow()` is also removed in BiDi. Use `browser.getWindowHandles()` + `browser.switchToWindow()` instead (qmate's `switchToNewWindow` already handles this).

### qmate implementation: `getContext()` pattern

Qmate uses a stored context pattern for frame-aware helpers:

- `switchToIframe(selector)` finds that exact iframe in the active tab, reads its native WindowProxy context reference, resolves `topCtx.frame({ id: contextId })`, and stores it as `_frameContext`.
- `switchToDefaultContent()` clears `_frameContext` (sets it to `null`).
- `getContext()` returns `_frameContext ?? browser`. Use it for frame-scoped queries and scripts; a bare `browser` call is still top-level.

Keep ordinary test code on qmate's reuse APIs. No wdi5 integration is required. When extending the reuse-library implementation itself, use `util.browser.getContext()` for low-level frame-scoped WDIO calls instead of the bare `browser` or `$()` shorthand:

```js
// inside an iframe after util.browser.switchToIframe(selector)
const ctx = util.browser.getContext();
const text = await ctx.$('h1').getText();  // scoped to the iframe
```

#### Pitfall: selecting the first child is not selecting the requested iframe

A context-tree query followed by `children[0]` can select a decoy iframe. The old polling workaround is superseded by exact iframe resolution (section 17). The native WindowProxy reference also avoids the cross-realm execute-serialization problem observed with WDIO 10.0.2's `frame({ selector })`.

#### Pitfall: stale frame context across specs

`_frameContext` is an instance variable on the `util.browser` singleton. In a WDIO worker that runs multiple spec files sequentially, a frame context stored by spec A becomes a dead `BrowsingContext` once the browser navigates away. Calling `switchToIframe` without first calling `switchToDefaultContent` would leave `_frameContext` set — and `getContext()` in the next spec would return the dead context.

qmate resets `_frameContext = null` at the start of every `switchToIframe` call so that the element visibility check runs against the top-level page, not a stale iframe context. The qmate wrappers also clear it after successful refresh, session reload, back/forward navigation, tab switching and tab closure. Always call `switchToDefaultContent()` when finished with an iframe to make the reset explicit. Raw WDIO navigation bypasses these qmate lifecycle guarantees.

#### Pitfall: `element ("[object Object]") still not existing after 300000ms`

wdio v10's `custom$$` locator strategy sets `element.selector = strategyRef` on every returned element, where `strategyRef` is a plain JS object `{ strategy, strategyName, strategyArguments }`. Any wdio API that needs to check element existence calls `isExisting()`, which calls `findAllAgain()` when `canFindAgain(element)` is truthy (i.e., when `element.selector` is set). `findAllAgain()` calls `parent.$$(selector)` — since `strategyRef` is not a string, it serialises as `[object Object]` as a CSS selector, which never matches, causing `waitForExist` to time out at `waitforTimeout` (300000ms in CI).

This affects any call chain that passes through `isClickable()`, `toBeClickable()`, `waitForExist()`, or any other wdio method that checks element existence — even simple things like clicking a UI5 element inside an iframe.

**Fix**: qmate overwrites `custom$$` and `custom$` at browser-setup time (`addControlCommands`) to null the `selector` property on every returned element:

```ts
await browser.overwriteCommand("custom$$", async (origFn, ...args) => {
  const elems = await origFn(...args);
  if (Array.isArray(elems)) elems.forEach(el => { if (el) el.selector = null; });
  return elems;
});
```

When `selector` is null, `canFindAgain()` returns false immediately. `isExisting()` then uses the fast path — `getElementTagName(elementId)` — which is a direct WebDriver call on the element's BiDi `sharedId` and resolves in milliseconds.

#### Pitfall: `browser.getActiveElement()` returns top-level active element in BiDi iframe sessions

In Classic WebDriver, `browser.getActiveElement()` returns the focused element within whatever frame is currently selected. In BiDi mode, `browser.getActiveElement()` always targets the **top-level** browsing context — even after `switchToIframe`. Inside an iframe, this returns the iframe element itself, not the focused element inside it.

**Fix**: use `ctx.execute(() => document.activeElement)` scoped to the frame context, then wrap the returned element reference with `ctx.$()` to get a proper wdio element:

```ts
const ctx = util.browser.getContext();  // returns frame context after switchToIframe
const elemRef = await ctx.execute(() => document.activeElement);
const elem = await ctx.$(elemRef);  // wrap the BiDi node reference into a wdio element
await elem.addValue(value);  // or setValue
```

In BiDi mode `execute()` returns a plain `{ [ELEMENT_KEY]: sharedId }` reference object — not a wdio element wrapper. Passing that reference to `ctx.$()` creates the wrapper via `getElement(void 0, elemRef)`, which is the same path that `$()` takes for any element reference it receives.

This applies to any code that calls `browser.getActiveElement()` inside an iframe — including `common.userInteraction.fillActive`, `clearAndFillActive`, and their retry variants, which have all been updated.

#### Pitfall: bare `$()` inside an iframe targets top-level context in BiDi

In Classic WebDriver, `$()` / `browser.$()` targets the currently selected frame. In BiDi, `$()` and `browser.$()` always target the **top-level** browsing context, regardless of any frame switch. An element that exists inside the iframe will not be found.

**Fix**: always use `util.browser.getContext().$()` when querying elements after `switchToIframe`:

```js
// before — works in v8, fails in v10 BiDi
const element = await $("[id='myElement']");

// after — works in both v8 and v10 BiDi
const element = await util.browser.getContext().$("[id='myElement']");
```

#### Pitfall: `browser.execute()` inside an iframe runs in top-level context in BiDi

In Classic WebDriver, `browser.execute()` runs in the currently selected frame. In BiDi, `browser.execute()` always targets the **top-level** browsing context. Any script that accesses `window.sap`, `sap.ui.core.Element.registry`, or other UI5 globals will not find controls that live inside an iframe.

**Fix**: use `util.browser.getContext().execute()` instead of `browser.execute()`:

```ts
// before — works in v8, fails silently in v10 BiDi (sap.ui.core.Element.registry is empty)
return browser.execute(fn, ...args);

// after — runs in frame context when inside an iframe
return util.browser.getContext().execute(fn, ...args);
```

This fix has been applied to `controlActionInBrowser` in `lib.ts`, so `ui5.control.getAggregationProperty`, `getAssociationProperty`, and all `controlActionInBrowser`-based methods work correctly inside iframes in v10 BiDi.

---

## 6. `browser.act()` — optional AI service

wdio v10 introduces `browser.act()`, an agentic API that sends natural-language instructions to an LLM to drive the browser. Example:

```js
await browser.act('click the submit button and wait for the confirmation dialog');
```

Install `@wdio/ai-service` and the LangChain adapter for your chosen provider, then configure `services: [["ai", { model: "provider:model" }]]`. Hosted providers need their corresponding credentials and network access. Local providers such as Ollama do not require a hosted-provider API key.

The service can record and replay steps. `cache: "locked"` is the replay-only mode for runs that must not call a model; missing or incompatible recordings fail instead of asking a model to repair them. The default CI healing mode can make model calls. See the current [AI service setup](https://webdriver.io/docs/ai-service) and [AI steps/cache documentation](https://webdriver.io/docs/ai-steps).

Provider access and an approved data-handling setup have not been established for this migration's CI pipelines. The integration gate therefore uses deterministic qmate commands and local fixtures, without AI calls. `browser.act()` does not by itself replace qmate's reuse APIs, test-authoring guidance, or an MCP server's non-browser tools; assess those responsibilities separately.

---

## 7. `browser.uploadFile()` removed

`browser.uploadFile()` no longer exists in v10. Pass absolute file paths to the file input. The files must already be accessible on the machine running the browser; passing a runner-local path does **not** promise a transfer to a remote grid. Provision remote files separately using your provider's supported mechanism.

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

`element.isDisplayedInViewport()` no longer exists in WDIO v10. Preserve viewport semantics with `element.isDisplayed({ withinViewport: true })`; plain `isDisplayed()` can also return true for an offscreen element.

This applies to both `.ts` and plain `.js` source files.

```js
// before
return (await el.isDisplayedInViewport());

// after — use intermediate variable to satisfy no-return-await lint rule
const visible = await el.isDisplayed({ withinViewport: true });
return visible;
```

`nonUi5.element.isVisible(element, strict)` passes the `strict` flag as `withinViewport`, preserving the caller's choice.

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

## 12. Passing wdio elements to `execute()` in BiDi: chained `$$()[n]` elements

In Classic WebDriver, passing a wdio element as an argument to `browser.execute()` serializes it as a DOM node reference. In BiDi, elements retrieved via **chained** `$$()` (e.g. `(await parent.$$('li[...]'))[0]`) may not serialize correctly when passed as execute arguments to `controlActionInBrowser` — the `sharedId` for child-context elements is not reliably available cross-context.

**Workaround**: use top-level `$()` with a specific CSS selector instead of `parent.$$()[n]` when passing elements to qmate UI5 command methods (`getUI5Property`, `getAllUI5Properties`, etc.):

```js
// avoid — chained $$()[n] element fails in controlActionInBrowser
const parent = await $("#listUl");
const elem = (await parent.$$('li[id*="item"]'))[0];
await elem.getAllUI5Properties();  // fails in BiDi

// use — direct $ with specific selector
const elem = await $('li[id*="item-0"]');
await elem.getAllUI5Properties();  // works in BiDi
```

Chained `$$` elements still work fine for non-execute operations like `getBindingContextPath()` or `getUI5Property` when the element came from `uiControlExecuteLocator` (qmate UI5 selector path).

---

## 13. `lib/` rebuild on CI

`lib/` is gitignored but rebuilt on every `npm ci` via the `prepare` hook (`npm run build` → `tsc`). Source fixes in `src/` are always picked up — no need to commit compiled output.

---

## 14. Form submission with BiDi request interception

In a BiDi session, `browser.action("pointer").perform()` can still use the Classic WebDriver actions endpoint when called on the top-level browser. With ChromeDriver 150 and BiDi request interception enabled, a form submission through that endpoint can leave navigation pending: subsequent `browser.getUrl()` and session teardown time out.

`ui5.session` and the config-driven form/custom authenticators share a submit helper that resolves the active tab or iframe as a `BrowsingContext` and performs the pointer action on that context. This uses BiDi `input.performActions` and keeps intercepted navigation off the Classic command queue. The static login tests cover interception; local CLI fixtures also cover login without a URL change.

Do not require the URL to change after login: a form may update the current page, and a redirect may already be complete by the time the click returns. Do not navigate to the resulting URL again to complete login, since that reloads application state. Verify the expected logged-in UI instead.

---

## 15. Execute scripts in the active frame and return promises

`util.browser.executeScript` must call `execute` on `util.browser.getContext()`. Calling the top-level `browser.execute` after a BiDi iframe switch runs scripts in the parent page instead, where the frame's UI5 controls do not exist. Both string scripts and async function callbacks are covered by local iframe regression tests.

WDIO v10 compiles string scripts as ordinary function bodies. A top-level `await` in such a string is invalid JavaScript. Return a promise from the string, or pass an async function callback instead. The table helpers return their filtering and scrolling promises so WDIO waits for completion.

For table rows without navigation arrows, BiDi's element-click interactability check can reject the row even when its contents are visible. The table helper uses a pointer action on the resolved row in that case; tests still verify the resulting navigation state.

---

## 16. Serialize aggregation graphs as data

WDIO v10's BiDi result serializer recursively visits returned objects asynchronously. UI5 aggregation graphs can contain internal promises with their own `then` methods. Decycling such a promise produces a plain object while retaining the method, so serializing it can throw `TypeError: Method Promise.prototype.then called on incompatible receiver #<Object>`.

`getUI5Aggregation` JSON-encodes the decycled graph inside the browser, then parses and retrocycles it in Node. This keeps runtime methods out of the transport while preserving aggregation values and circular references. The browser regression covers a promise with an own `then` method nested inside an aggregation; the caller-facing aggregation API is unchanged.

---

## 17. Resolve the requested iframe and keep context ownership explicit

`util.browser.switchToIframe(selector)` resolves the matching iframe in the active tab. Selecting the first child from the BiDi context tree is not equivalent: pages can have multiple iframes, and a refresh or rerender can replace the sample frame. Regression tests cover a preceding decoy frame, frame replacement, and a second tab.

In WDIO 10.0.2, `context.frame({ selector })` returns the iframe's `contentWindow` through WDIO's execute serializer. That serializer can traverse a cross-realm Window as an object and throw on restricted properties such as `localStorage`. Qmate reads the native WindowProxy context reference with BiDi `scriptCallFunction`, then resolves it with `context.frame({ id })`.

Qmate no longer searches CommonJS `require.cache` to modify WDIO's internal `ContextManager`. The local runner loads WDIO as ESM, so that workaround did nothing and emitted `[qmate bidi] WARN: could not find local-runner webdriverio in require.cache` on every frame/default-content switch. Frame-owned elements already route their commands to their own context. The separate custom-selector workaround remains in place; tests cover custom-locator visibility, clickability, clicking, and returning to the parent page without changing WDIO's global context.

---

## 18. Center UI5 elements without wheel gestures

WDIO v10 implements element `scrollIntoView` using wheel actions before falling back to DOM scrolling. Centering an already visible, left-aligned control can generate a large negative horizontal wheel delta. In Chrome 150 on Linux, the select tests navigated back to `about:blank` immediately after that wheel event, destroying the sample iframe. Later steps reported missing dropdown options or `no such frame`, obscuring the original cause.

`ui5.userInteraction.scrollToElement` uses the element's DOM `scrollIntoView` through its owned context in BiDi sessions. This preserves the requested alignment while avoiding browser history gestures. Classic sessions retain the existing WDIO command. A regression centers an initially visible checkbox and verifies that the page URL and frame element survive; the Select and MultiComboBox tests still assert the selected values.

## 19. UI5 mockservers and dialogs belong to their document

The parent document need not load UI5 just because an iframe does. After `util.browser.switchToIframe`, mockserver operations and relative mock-data loading must execute in that frame. The shared helpers now use the selected context for both operations.

Each UI5 document also owns its own static area. Dialog discovery must not inspect the parent and then look up the returned popup IDs in the child. A local OpenUI5 fixture covers mockserver get/set, relative JSON loading, ordinary child-button clicks and priority for a child dialog over an identically labelled page button. These tests invoke the public qmate APIs through the CLI; they do not introduce wdi5.

## 20. Extension-request mocking remains explicitly opt-in

Set `qmate.enableUi5ExtensionMocking: true` to enable extension blocking in BiDi. An omitted or false option leaves it disabled, including after `util.browser.reloadSession()`.

WDIO v10 accepts string or URLPattern definitions for `browser.mock`, not the old RegExp definitions. The old regex objects had identical undefined pattern components, so later registrations replaced earlier mocks. Qmate now uses explicit URLPatterns for xRayControls paths/query strings and Joule/WalkMe hostnames, paths and query strings. Local tests check the response payload, backend request counts, reload behavior and overlapping matches.

There is an open upstream limitation in WDIO 10.1.0 with Chrome 150: overlapping early-response mocks can emit `Failed to answer a paused request` with `Invalid InterceptionId` or `No blocked request found`. Two plain WDIO mocks reproduce it independently of qmate's extension feature. Response and backend-blocking assertions pass, but this optional feature is not yet warning-clean. Do not confuse these messages with the removed `require.cache` warning in section 17.

## 21. Await reporter screenshots before session teardown

WDIO can delete the browser session before asynchronous reporter event handlers finish. Waiting only for reporter synchronization is too late for a pending screenshot. The migrated qmate reporter exposes `completePendingTestUpdates()`; migrated report profiles await it in their `after` hook, including when a user teardown hook throws.

Standalone reporter configurations must also await this drain in `after` (see the reporter configuration guide). Local CLI cases verify success reports, intentional failure exit codes, HTML/JUnit output and embedded failure screenshots, including a throwing user teardown. Parallel-context reporter identifiers and screenshots overlapping a subsequent test still need dedicated coverage.
