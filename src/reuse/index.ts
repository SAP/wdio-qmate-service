"use strict";

const legacyMapper = require("./helper/legacySupport/legacyMapper.js");

// modules
import utilQmate from './modules/util/Util'
import commonQmate from './modules/common/Common'
import nonUi5Qmate from './modules/nonUi5/NonUi5';
import serviceQmate from './modules/service/Service'

// data
import appIntents from './data/appIntents.json';
import authenticators from './data/authenticators.json'
import users from './data/users.json'

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
      file: utilQmate.file,
      formatter: utilQmate.formatter,
      function: utilQmate.function,
      performance: utilQmate.perfomance,
      system: utilQmate.system
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
      assertion: require("./modules/ui5/assertion.js"),
      confirmationDialog: require("./modules/ui5/confirmationDialog.js"),
      control: require("./modules/ui5/control.js"),
      date: require("./modules/ui5/date.js"),
      errorDialog: require("./modules/ui5/errorDialog.js"),
      element: require("./modules/ui5/element.js"),
      footerBar: require("./modules/ui5/footerBar.js"),
      mockserver: require("./modules/ui5/mockserver.js"),
      navigation: require("./modules/ui5/navigation.js"),
      navigationBar: require("./modules/ui5/navigationBar.js"),
      session: require("./modules/ui5/session.js"),
      userInteraction: require("./modules/ui5/userInteraction.js"),
      qunit: require("./modules/ui5/qunit.js"),
      // data
      appIntents,
      authenticators,
      users
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
      odata: serviceQmate.odata
    };
    global.service = {
      ...service,
      ...global.service
    };

    legacyMapper();
  };
};

export default new ReuseLibrary();