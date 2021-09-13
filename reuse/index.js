"use strict";

const legacyMapper = require("./helper/legacyMapper.js");

const ReuseLibrary = function () {
  this.load = function () {

    /**
     * @global
     * @description Global namespace for common modules.
     */
    const common = {
      assertion: require("./modules/common/assertion.js"),
      date: require("./modules/common/date.js"),
      navigation: require("./modules/common/navigation.js"),
      userInteraction: require("./modules/common/userInteraction.js")
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
      browser: require("./modules/util/browser.js"),
      console: require("./modules/util/console.js"),
      file: require("./modules/util/file.js"),
      formatter: require("./modules/util/formatter.js"),
      function: require("./modules/util/function.js"),
      system: require("./modules/util/system.js")
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
      messageBox: require("./modules/ui5/messageBox.js"),
      navigation: require("./modules/ui5/navigation.js"),
      navigationBar: require("./modules/ui5/navigationBar.js"),
      session: require("./modules/ui5/session.js"),
      userInteraction: require("./modules/ui5/userInteraction.js")
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
      assertion: require("./modules/nonUi5/assertion.js"),
      element: require("./modules/nonUi5/element.js"),
      userInteraction: require("./modules/nonUi5/userInteraction.js")
    };
    global.nonUi5 = {
      ...global.nonUi5,
      ...nonUi5
    };

    legacyMapper();
  };
};
module.exports = new ReuseLibrary();