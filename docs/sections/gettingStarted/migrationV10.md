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

wdio v10 enables WebDriver BiDi by default, injecting `webSocketUrl: true` into capabilities. This changes how navigation errors surface — instead of Mocha timeouts you get protocol-level errors.

Disable it for classic WebDriver behaviour:

```js
// base.conf.js
webSocketUrl: false
```

---

## 4. `isDisplayedInViewport()` removed

`element.isDisplayedInViewport()` no longer exists in wdio v10. Replace with `element.isDisplayed()`.

This applies to both `.ts` and plain `.js` source files — sed-based scripts targeting only `*.ts` will miss JS files.

```js
// before
return (await el.isDisplayedInViewport());

// after — use intermediate variables to satisfy no-return-await lint rule
const visible = await el.isDisplayed();
return visible;
```

---

## 5. Chrome error message format

`browser.execute()` errors from Chrome no longer carry the `"javascript error:"` prefix in v10. They are wrapped differently:

```
// v8
"javascript error: Cannot read properties of undefined (reading 'parts')"

// v10
"waitUntil condition failed with the following reason: TypeError: Cannot read properties of undefined (reading 'parts')"
```

Update any `toThrow()` / `rejects.toThrow()` assertions that match against the old prefix.

---

## 6. `lib/` rebuild on CI

`lib/` is gitignored but rebuilt on every `npm ci` via the `prepare` hook (`npm run build` → `tsc`). Source fixes in `src/` are always picked up — no need to commit compiled output.
