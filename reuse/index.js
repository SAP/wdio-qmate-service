"use strict";

const ReuseLibrary = function () {
  this.load = function () {

    /**
     * @global ui5
     * @description Global namespace for UI5 modules.
     */
    const ui5 = {
      userInteraction: require("./ui5/userInteraction.js"),
      assertion: require("./ui5/assertion.js")
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
      userInteraction: require("./nonUi5/userInteraction.js"),
    };
    global.nonUi5 = {
      ...global.nonUi5,
      ...nonUi5
    };

  };
};
module.exports = new ReuseLibrary();