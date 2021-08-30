"use strict";

const ReuseLibrary = function () {
  this.load = function () {

    /**
     * @global ui5
     * @description Global namespace for UI5 modules.
     */
    const ui5 = {
      userInteraction: require("./ui5/userInteraction.js")
    };
    global.ui5 = {
      ...ui5,
      ...global.ui5
    };

    /**
     * @global nonUi5
     * @description Global namespace for non UI5 modules.
     */
    const nonUi5 = {};
    global.non_ui5 = {
      ...global.nonUi5,
      ...nonUi5
    };

  };
};
module.exports = new ReuseLibrary();