"use strict";

const ReuseLibrary = function () {
  this.load = function () {

    /**
     * @global common
     * @description Global namespace for common modules.
     */
    const common = {
      userInteraction: require("./common/userInteraction.js"),
      assertion: require("./common/assertion.js"),
      navigation: require("./common/navigation.js")
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
      userInteraction: require("./ui5/userInteraction.js"),
      assertion: require("./ui5/assertion.js"),
      navigation: require("./ui5/navigation.js")
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

  };
};
module.exports = new ReuseLibrary();