import { Common } from "../src/reuse/modules/common/Common";
import { NonUi5 } from "../src/reuse/modules/nonUi5/NonUi5";
import { Service } from "../src/reuse/modules/service/Service";
import { Ui5 } from "../src/reuse/modules/ui5/Ui5";
import { Util } from "../src/reuse/modules/util/Util";
import { Runtime } from "../src/reuse/modules/runtime/Runtime";
import { Mobile } from "../src/reuse/modules/mobile/Mobile";
import { Flp } from "../src/reuse/modules/flp/Flp";

declare global {
  namespace WebdriverIO {
    interface Browser {
      config: any;
      params: any;
      mockServerActionInBrowser: () => Promise<any>;
      controlActionInBrowser: (callbackFunction: Function, selectorOrElement: WebdriverIO.Element | Ui5Selector | Ui5SelectorWithOptions, args?: any) => Promise<any>;
      waitUI5ToStabilize: (any) => Promise<any>;
      stableDomElementCount: (any) => Promise<any>;
      getDisplayedElements: (any) => Promise<any>;
      uiControlExecuteLocator: (any) => Promise<any>;
      loadMockData: (any) => Promise<any>;
      uiControls: (selector: any, timeout: number) => Promise<any>;
    }

    interface MultiRemoteBrowser {
      mockServerActionInBrowser: () => Promise<any>;
      controlActionInBrowser: (callbackFunction: Function, selectorOrElement: WebdriverIO.Element | Ui5Selector | Ui5SelectorWithOptions, args?: any) => Promise<any>;
      waitUI5ToStabilize: (any) => Promise<any>;
      stableDomElementCount: (any) => Promise<any>;
      getDisplayedElements: (any) => Promise<any>;
      uiControlExecuteLocator: (any) => Promise<any>;
      loadMockData: (any) => Promise<any>;
      uiControls: (selector: any, timeout: number) => Promise<any>;
    }

    interface Element {
      getUI5Property(property: string): Promise<any>;
      getBindingProperty(property: string): Promise<any>;
      getBindingContextPath(): Promise<string>;
    }
  }

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
