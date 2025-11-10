import { defineConfig, globalIgnores } from "eslint/config";
import * as wdioPlugin from "eslint-plugin-wdio";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  globalIgnores(["**/node_modules/", "**/results/", "**/lib/", "**/packages/", "**/docs-gen/", "src/scripts/locators/qmateLocator.js", "**/eslint.config.mjs"]),
  {
    extends: compat.extends("plugin:wdio/recommended"),

    plugins: {
      wdioPlugin
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.jasmine,
        ...globals.node,
        jQuery: "readonly",
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        ui5: "readonly",
        nonUi5: "readonly",
        common: "readonly",
        util: "readonly",
        service: "readonly",
        flp: "readonly"
      },

      ecmaVersion: 2021,
      sourceType: "commonjs"
    },

    rules: {
      "keyword-spacing": 2,

      indent: [
        2,
        2,
        {
          ignoreComments: true,
          SwitchCase: 1
        }
      ],

      "no-console": 1,
      "no-const-assign": 2,
      "no-extra-semi": 2,
      "no-irregular-whitespace": 2,
      "no-redeclare": 2,
      "no-undef": 2,
      "no-unused-expressions": 2,
      "no-return-await": 2,
      "no-empty": 2,
      quotes: [
        2,
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ],

      "prefer-const": 1,
      semi: [2, "always"]
    }
  }
]);
