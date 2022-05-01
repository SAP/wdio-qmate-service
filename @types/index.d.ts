import { Common } from "../src/reuse/modules/common/Common";
import { NonUi5 } from "../src/reuse/modules/nonUi5/NonUi5";
import { Service } from "../src/reuse/modules/service/Service";
import { Ui5 } from "../src/reuse/modules/ui5/Ui5";
import { Util } from "../src/reuse/modules/util/Util";

declare global {
  var browser: any;
  var $: any;
  var $$: any;

  var util: Util;
  var ui5: Ui5;
  var nonUi5: NonUi5;
  var common: Common;
  var service: Service;

  // @ts-ignore
  var expect: any;

  var sap: any;
}

export {};
