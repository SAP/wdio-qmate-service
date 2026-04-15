# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

`@sap_oss/wdio-qmate-service` is a WebdriverIO plugin that extends WebdriverIO with domain-specific testing modules for SAP UI5 applications, non-UI5 web apps, mobile testing, and API/service testing. It compiles to CommonJS (`./lib/`) and is consumed as a WebdriverIO service.

## Commands

```bash
# Build (required before running integration tests)
npm run build         # locator build + tsc
npm run build:dev     # watch mode (tsc --watch)

# Lint / Format
npm run lint          # ESLint
npm run lint:fix      # ESLint with auto-fix
npm run prettier      # Check formatting
npm run prettier:fix  # Auto-fix formatting

# Unit tests (Vitest — fast, no browser needed)
npm run test:unit
npm run test:unit:watch

# Integration tests (require Chrome + built lib/)
npx wdio ./test/reuse/util/data/test.data.conf.js   # example: run a single module's tests
npm run test:reuse:util          # all util module tests
npm run test:reuse:ui5           # all UI5 module tests
npm run test:reuse               # all reuse module tests

# Docs
npm run serve-docs               # generate and serve locally (requires mkdocs)
```

## Architecture

### Service Lifecycle

`src/index.ts` is the WebdriverIO service entry point. It implements WebdriverIO's service hooks (`onPrepare`, `beforeSession`, `before`, `after`, `onComplete`) and delegates to scripts under `src/scripts/hooks/`. The `before` hook is the main one — it initialises the global namespaces by calling `src/reuse/index.ts`.

### Global Namespaces

`src/reuse/index.ts` (the `ReuseLibrary` class) instantiates every module and assigns them to `global.*`. Test specs access everything through these globals — no imports required:

| Global | Source directory | Purpose |
|--------|-----------------|---------|
| `global.common` | `src/reuse/modules/common/` | Cross-platform: assertion, date, navigation, userInteraction |
| `global.util` | `src/reuse/modules/util/` | browser, console, data, file, formatter, function, system, component, userSettings |
| `global.ui5` | `src/reuse/modules/ui5/` | SAP UI5 controls: assertion, control, element, session, table, navigation, confirmationDialog, errorDialog, navigationBar, footerBar, mockserver, qunit |
| `global.nonUi5` | `src/reuse/modules/nonUi5/` | Standard web: assertion, element, navigation, userInteraction, session |
| `global.service` | `src/reuse/modules/service/` | API clients: odata, rest |
| `global.mobile` | `src/reuse/modules/mobile/` | element, userInteraction, gestures, device, android, ios |
| `global.flp` | `src/reuse/modules/flp/` | Fiori Launchpad: userSettings, userLocks |
| `global.cit` | `src/reuse/runner/` | Test runner utilities |

ESLint is configured to recognise all these as globals (see `.eslintrc.yml`), so `no-undef` won't fire on them.

### Build Pipeline

1. `src/scripts/locators/qmateLocatorSrc/build.js` — bundles the locator script (esbuild)
2. `tsc` — compiles all `src/**/*.ts` to `./lib/` (ES2024 target, CommonJS, strict)

Always run `npm run build` before running integration tests; the tests load from `./lib/`.

### Test Layout

- `test/unit/` — Vitest unit tests (minimal coverage, very fast)
- `test/reuse/<namespace>/<module>/` — Each module has its own wdio config (`test.*.conf.js`) and spec files. Run a single module in isolation with `npx wdio ./test/reuse/<namespace>/<module>/test.*.conf.js`.
- `test/core/` — Data exchange, functional chaining, locator, and watch-mode tests
- `test/authenticator/` — Authentication flow tests (staticLogin / systemLogin variants)

### Local Package

`packages/qcrypt/` is a local `file:` dependency providing the encryption/decryption primitives used by `util.data.decrypt` and the secure-data flow in `src/reuse/modules/util/data.ts`.

## Code Conventions

- **2-space indentation**, **double quotes**, **semicolons** (enforced by ESLint + Prettier)
- Prettier `printWidth` is 300 — long lines are acceptable
- Every module class is instantiated and exported as a singleton (`export default new Foo()`)
- JSDoc comments on public methods feed the doc generator (`npm run generate-docs`)
- `VerboseLoggerFactory` and `ErrorHandler` are the standard logging/error patterns — use `this.vlf.initLog(this.methodName)` at the top of every method
