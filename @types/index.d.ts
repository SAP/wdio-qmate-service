import { Common } from "../src/reuse/modules/common/Common";
import { NonUi5 } from "../src/reuse/modules/nonUi5/NonUi5";
import { Service } from "../src/reuse/modules/service/Service";
import { Ui5 } from "../src/reuse/modules/ui5/Ui5";
import { Util } from "../src/reuse/modules/util/Util";
import { Runtime } from "../src/reuse/modules/runtime/Runtime";
import { Mobile } from "../src/reuse/modules/mobile/Mobile";
import { Flp } from "../src/reuse/modules/flp/Flp";

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
  var mobile: Mobile;
  var flp: Flp;

  var expect: any;

  var sap: any;
}

export { Util, Ui5, NonUi5, Common, Service, Runtime, Mobile, Flp };
