import { Browser } from "@wdio/types";
import { Common } from "../src/reuse/modules/common/Common";
import { NonUi5 } from "../src/reuse/modules/nonUi5/NonUi5";
import { Util } from "../src/reuse/modules/util/Util";

declare global {
  var browser: Browser;
  var $: any;
  var $$: any;

  var util: Util;
  var ui5: any;
  var nonUi5: NonUi5;
  var common: Common;
  var service: any;

  var expect: any;

  var sap: any;
}

export {};
