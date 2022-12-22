"use strict";

// modules
import utilQmate from "./modules/util/Util";
import commonQmate from "./modules/common/Common";
import ui5Qmate from "./modules/ui5/Ui5";
import nonUi5Qmate from "./modules/nonUi5/NonUi5";
import serviceQmate from "./modules/service/Service";

// data
import authenticators from "./data/authenticators.json";

class ReuseLibrary {
  load() {
    /**
     * @global
     * @description Global namespace for common modules.
     */
    const common = {
      assertion: commonQmate.assertion,
      date: commonQmate.date,
      navigation: commonQmate.navigation,
      userInteraction: commonQmate.userInteraction
    };
    global.common = {
      ...common,
      ...global.common
    };

    /**
     * @global
     * @description Global namespace for util modules.
     */
    const util = {
      browser: utilQmate.browser,
      console: utilQmate.console,
      data: utilQmate.data,
      file: utilQmate.file,
      formatter: utilQmate.formatter,
      function: utilQmate.function,
      system: utilQmate.system,
      component: utilQmate.component
    };
    global.util = {
      ...util,
      ...global.util
    };

    /**
     * @global
     * @description Global namespace for UI5 modules.
     */
    const ui5 = {
      assertion: ui5Qmate.assertion,
      confirmationDialog: ui5Qmate.confirmationDialog,
      control: ui5Qmate.control,
      date: ui5Qmate.date,
      errorDialog: ui5Qmate.errorDialog,
      element: ui5Qmate.element,
      footerBar: ui5Qmate.footerBar,
      mockserver: ui5Qmate.mockserver,
      navigation: ui5Qmate.navigation,
      navigationBar: ui5Qmate.navigationBar,
      session: ui5Qmate.session,
      table: ui5Qmate.table,
      userInteraction: ui5Qmate.userInteraction,
      qunit: ui5Qmate.qunit,
      // data
      authenticators
    };
    global.ui5 = {
      ...ui5,
      ...global.ui5
    };

    /**
     * @global
     * @description Global namespace for non UI5 modules.
     */
    const nonUi5 = {
      assertion: nonUi5Qmate.assertion,
      element: nonUi5Qmate.element,
      navigation: nonUi5Qmate.navigation,
      userInteraction: nonUi5Qmate.userInteraction
    };
    global.nonUi5 = {
      ...nonUi5,
      ...global.nonUi5
    };

    /**
     * @global
     * @description Global namespace for service modules.
     */
    const service = {
      odata: serviceQmate.odata,
      rest: serviceQmate.rest
    };
    global.service = {
      ...service,
      ...global.service
    };
  }
}

export default new ReuseLibrary();
