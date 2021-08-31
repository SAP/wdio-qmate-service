"use strict";

const legacyMapper = require("./helper/legacyMapper.js");

const ReuseLibrary = function () {
  this.load = function () {

    /**
     * @global common
     * @description Global namespace for common modules.
     */
    const common = {
      userInteraction: require("./modules/common/userInteraction.js"),
      assertion: require("./modules/common/assertion.js"),
      navigation: require("./modules/common/navigation.js"),
      console: require("./modules/common/console.js")
    };
    global.common = {
      ...common,
      ...global.common
    };

    /**
     * @global ui5
     * @description Global namespace for UI5 modules.
     */
    const ui5 = {
      userInteraction: require("./modules/ui5/userInteraction.js"),
      assertion: require("./modules/ui5/assertion.js"),
      navigation: require("./modules/ui5/navigation.js"),
      element: require("./modules/ui5/element.js")
    };
    global.ui5 = {
      ...ui5,
      ...global.ui5
    };

    /**
     * @global nonUi5
     * @description Global namespace for non UI5 modules.
     */
    const nonUi5 = {

    };
    global.nonUi5 = {
      ...global.nonUi5,
      ...nonUi5
    };

    legacyMapper();
  };
};
module.exports = new ReuseLibrary();