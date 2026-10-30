// Consumer entry: source-build globals in index.d.ts intentionally stay separate.
import type * as WdioGlobals from "@wdio/globals";
import type {} from "expect-webdriverio";
import "./locatorTypes";
import QmateService = require("../lib/index");

declare global {
  var browser: typeof WdioGlobals.browser;
  function $(...args: Parameters<typeof WdioGlobals.$>): ReturnType<typeof WdioGlobals.$>;
  function $$(...args: Parameters<typeof WdioGlobals.$$>): ReturnType<typeof WdioGlobals.$$>;
  var expect: typeof WdioGlobals.expect;
  var runtime: QmateService.Runtime;
  var util: QmateService.Util;
  var ui5: QmateService.Ui5;
  var nonUi5: QmateService.NonUi5;
  var common: QmateService.Common;
  var service: QmateService.Service;
  var flp: QmateService.Flp;
}

export = QmateService;
