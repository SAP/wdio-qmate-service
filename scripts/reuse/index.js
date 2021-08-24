"use strict";

// Note: need to merge (not to overwrite!) all global variables to keep users' global scope
const ReuseLibrary = function () {
  this.load = function () {
    /**
     * @namespace utilities
     * @description Namespace for utilities modules.
     */
    const utilities = {
      function: require("./utilities/modules/function.js"),
      formatter: require("./utilities/modules/formatter.js"),
      dialogInteraction: require("./utilities/modules/dialogInteraction.js"),
      qUnit: require("./utilities/modules/qUnit"),
      mockserver: require("./utilities/modules/mockserver"),
      browser: require("./utilities/modules/browser.js"),
      execute: require("./utilities/modules/execute.js"),
      os: require("./utilities/modules/os.js"),
      console: require("./utilities/modules/console.js"),
    };
    global.utilities = {
      ...global.utilities,
      ...utilities
    };
    /**
     * @namespace ui5
     * @description Namespace for ui5 modules.
     */
    const ui5 = {
      /**
       * @namespace common
       * @description Namespace for common modules.
       * @memberof ui5
       */
      common: {
        users: require("./ui5/common/data/users.json"),
        appIntents: require("./ui5/common/data/appIntents.json"),
        authenticators: require("./ui5/common/data/authenticators.json"),

        session: require("./ui5/common/modules/session.js"),
        navigation: require("./ui5/common/modules/navigation.js"),
        locator: require("./ui5/common/modules/locator.js"),
        userInteraction: require("./ui5/common/modules/userInteraction.js"),
        confirmationDialog: require("./ui5/common/modules/confirmationDialog.js"),
        assertion: require("./ui5/common/modules/assertion.js"),
        date: require("./ui5/common/modules/date.js"),
        navigationBar: require("./ui5/common/modules/navigationBar.js"),
        footerBar: require("./ui5/common/modules/footerBar.js"),
        messageBox: require("./ui5/common/modules/messageBox.js"),
        iconTabBar: require("./ui5/common/modules/iconTabBar.js"),
        formatter: require("./ui5/common/modules/formatter.js"),
        client: require("./ui5/common/modules/client"),
        errorDialog: require("./ui5/common/modules/errorDialog.js")
      }
    };
    global.ui5 = {
      ...ui5,
      ...global.ui5
    };

    /**
     * @namespace non_ui5
     * @description Namespace for non ui5 modules.
     */
    const nonUi5 = {
      /**
       * @namespace common
       * @description Namespace for common modules.
       * @memberof non_ui5
       */
      common: {
        assertion: require("./nonUi5/common/modules/assertion.js"),
        navigation: require("./nonUi5/common/modules/navigation.js"),
        locator: require("./nonUi5/common/modules/locator.js"),
        userInteraction: require("./nonUi5/common/modules/userInteraction.js")
      }
    };
    global.non_ui5 = {
      ...global.non_ui5,
      ...nonUi5
    }; //merge

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ obsolete: use ui5 namespace instead ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    const common = {
      // data
      users: require("./ui5/common/data/users.json"),
      appIntents: require("./ui5/common/data/appIntents.json"),
      authenticators: require("./ui5/common/data/authenticators.json"),

      // modules
      session: require("./ui5/common/modules/session.js"),
      navigation: require("./ui5/common/modules/navigation.js"),
      locator: require("./ui5/common/modules/locator.js"),
      userInteraction: require("./ui5/common/modules/userInteraction.js"),
      confirmationDialog: require("./ui5/common/modules/confirmationDialog.js"),
      assertion: require("./ui5/common/modules/assertion.js"),
      date: require("./ui5/common/modules/date.js"),
      navigationBar: require("./ui5/common/modules/navigationBar.js"),
      footerBar: require("./ui5/common/modules/footerBar.js"),
      messageBox: require("./ui5/common/modules/messageBox.js"),
      iconTabBar: require("./ui5/common/modules/iconTabBar.js"),
      formatter: require("./ui5/common/modules/formatter.js")
    };
    global.common = common;
    // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ obsolete: use ui5 namespace instead ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
  };

  /**
   * @namespace odata
   * @description Namespace for odata modules.
   */
  const odata = {
    /**
     * @namespace common
     * @description Namespace for common modules.
     * @memberof odata
     */
    common: {
      service: require("./odata/common/modules/service.js")
    }
  };
  global.oData = odata;
  global.odata = odata;
};

module.exports = new ReuseLibrary();