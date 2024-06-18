import { Common } from "../src/reuse/modules/common/Common";
import { NonUi5 } from "../src/reuse/modules/nonUi5/NonUi5";
import { Service } from "../src/reuse/modules/service/Service";
import { Ui5 } from "../src/reuse/modules/ui5/Ui5";
import { Util } from "../src/reuse/modules/util/Util";
import { Runtime } from "../src/reuse/modules/runtime/Runtime";
import { Ariba } from "../src/reuse/modules/ariba/Ariba";

declare global {
  var browser: any;
  var $: any;
  var $$: any;

  var runtime: Runtime;

  var util: Util;
  var ui5: Ui5;
  var nonUi5: NonUi5;
  var common: Common;
  var service: Service;
  var ariba: Ariba

  var expect: any;

  var sap: any;
}

export { Util, Ui5, NonUi5, Common, Service, Runtime };
