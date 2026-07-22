/**
 * ESLint v9 flat config — migrated from legacy .eslintrc.yml + .eslintignore.
 *
 * Original config source (kept 1:1 semantic parity):
 *   env:      browser, commonjs, es2021, jasmine, node
 *   plugins:  ["wdio"]
 *   extends:  "plugin:wdio/recommended"
 *   parserOptions.ecmaVersion: 2024
 *   globals:  jQuery, Atomics, SharedArrayBuffer, ui5, nonUi5, common, util, service
 *   rules:    (see `rules` block below — copied verbatim)
 *
 * Old .eslintignore entries are now in the `ignores` block.
 */

const globals = require("globals");
const wdioPlugin = require("eslint-plugin-wdio");

module.exports = [
  // ── Ignore patterns (replaces .eslintignore) ────────────────────────────
  {
    ignores: [
      "node_modules/**",
      "results/**",
      "lib/**",
      "packages/**",
      "docs-gen/**"
    ]
  },

  // ── Bring in eslint-plugin-wdio recommended (flat-config form) ─────────
  // eslint-plugin-wdio v9+ exposes a flat config under `configs["flat/recommended"]`.
  // Fallback: build it manually from the legacy recommended if the flat export
  // is not present (older 9.x versions may still ship legacy only).
  wdioPlugin.configs?.["flat/recommended"] ?? {
    plugins: { wdio: wdioPlugin },
    rules: wdioPlugin.configs?.recommended?.rules ?? {}
  },

  // ── Main project config ─────────────────────────────────────────────────
  // NOTE: Original .eslintrc.yml linted **JavaScript only** (no TS parser was
  // ever configured). To preserve 1:1 behaviour we scope this block to JS
  // extensions. TypeScript is compile-time-checked by `tsc` (see build script).
  // If you want to lint TS too, add `@typescript-eslint/parser` and extend the
  // `files` glob to include "**/*.ts".
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "commonjs",
      globals: {
        // env: browser + commonjs + es2021 + jasmine + node
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2021,
        ...globals.jasmine,
        ...globals.node,
        // explicit globals from the old config
        jQuery: "readonly",
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        ui5: "readonly",
        nonUi5: "readonly",
        common: "readonly",
        util: "readonly",
        service: "readonly",
        // added: `flp` is used in test/reuse/flp/**/*.spec.js but was missing
        // from the legacy globals list (previously it was silently accepted
        // because ESLint didn't run on those files consistently).
        flp: "readonly"
      }
    },
    // Rules — 1:1 port from .eslintrc.yml
    rules: {
      "keyword-spacing": 2,
      indent: [2, 2, { ignoreComments: true, SwitchCase: 1 }],
      "no-console": 1,
      "no-const-assign": 2,
      "no-extra-semi": 2,
      "no-irregular-whitespace": 2,
      "no-redeclare": 2,
      "no-undef": 2,
      "no-unused-expressions": 2,
      "no-return-await": 2,
      quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: true }],
      "prefer-const": 1,
      semi: [2, "always"]
    }
  }
];