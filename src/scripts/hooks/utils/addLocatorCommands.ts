// @ts-nocheck
var qmateLocator = require("../../locators/qmateLocator");
var uiveri5Locator = require("../../locators/uiveri5Locator");
var lib = require("./lib");
import { ui5ControlLocator, ui5ControlsLocators, getUI5Property,
  getUI5Aggregation, getUI5Association, getBindingContextPath,
  getBindingProperty, getAllUI5Properties, getAllUI5Aggregations,
  getAllUI5Associations
} from "./locatorCommands";

var AddLocatorCommands = function () {
  this.addControlCommands = async function () {
    // Add Qmate locator strategy
    await browser.addLocatorStrategy("ui5All", qmateLocator.ui5All);
    await browser.addLocatorStrategy("ui5Veri5", uiveri5Locator.ui5Veri5);
    // Register global names
    //global.uiControl = ui5ControlLocator;
    //global.uiControls = ui5ControlsLocator;

    // Add command to trigger coverage collection
    await browser.addCommand("collectCoverage", async function () {
      return true;
    });

    // Add command for control
    await browser.addCommand("uiControl", async function (ui5Selector, index, timeout, returnAllDomElements = false) {
      return ui5ControlLocator(ui5Selector, index, timeout, this, returnAllDomElements);
    }, true);
    await browser.addCommand("uiControl", async function (ui5Selector, index, timeout, returnAllDomElements = false) {
      return ui5ControlLocator(ui5Selector, index, timeout, undefined, returnAllDomElements);
    });

    // Add command for controls
    await browser.addCommand("uiControls", async function (ui5Selector, timeout) {
      return ui5ControlsLocators(ui5Selector, timeout, this);
    }, true);
    await browser.addCommand("uiControls", async function (ui5Selector, timeout) {
      return ui5ControlsLocators(ui5Selector, timeout);
    });
  };

  this.addGetBindingInfos = async function () {
    // Add command for element properties
    await browser.addCommand("getBindingContextPath", async function () {
      return getBindingContextPath(this);
    }, true);

    // Add command for browser properties
    await browser.addCommand("getBindingContextPath", async function (ui5SelectorOrElement) {
      return getBindingContextPath(ui5SelectorOrElement);
    });

    // Add command for element properties
    await browser.addCommand("getBindingProperty", async function (propName) {
      return getBindingProperty(propName, this);
    }, true);

    // Add command for browser properties
    await browser.addCommand("getBindingProperty", async function (propName, ui5SelectorOrElement) {
      return getBindingProperty(propName, ui5SelectorOrElement);
    });

  };

  this.addGetControlProperties = async function () {
    // Add command for element properties
    await browser.addCommand("getUI5Property", async function (propertyName) {
      return getUI5Property(propertyName, this);
    }, true);

    // Add command for browser properties
    await browser.addCommand("getUI5Property", async function (propertyName, ui5SelectorOrElement) {
      return getUI5Property(propertyName, ui5SelectorOrElement);
    });

    // Add command for element properties
    await browser.addCommand("getUI5Aggregation", async function (propertyName) {
      return getUI5Aggregation(propertyName, this);
    }, true);

    // Add command for browser properties
    await browser.addCommand("getUI5Aggregation", async function (propertyName, ui5SelectorOrElement) {
      return getUI5Aggregation(propertyName, ui5SelectorOrElement);
    });

    // Add command for element properties
    await browser.addCommand("getUI5Association", async function (propertyName) {
      return getUI5Association(propertyName, this);
    }, true);

    // Add command for browser properties
    await browser.addCommand("getUI5Association", async function (propertyName, ui5SelectorOrElement) {
      return getUI5Association(propertyName, ui5SelectorOrElement);
    });

    await browser.addCommand("getAllUI5Properties", async function () {
      return getAllUI5Properties(this);
    }, true);

    await browser.addCommand("getAllUI5Properties", async function (ui5SelectorOrElement) {
      return getAllUI5Properties(ui5SelectorOrElement);
    });

    await browser.addCommand("getAllUI5Aggregations", async function () {
      return getAllUI5Aggregations(this);
    }, true);

    await browser.addCommand("getAllUI5Aggregations", async function (ui5SelectorOrElement) {
      return getAllUI5Aggregations(ui5SelectorOrElement);
    });

    await browser.addCommand("getAllUI5Associations", async function () {
      return getAllUI5Associations(this);
    }, true);

    await browser.addCommand("getAllUI5Associations", async function (ui5SelectorOrElement) {
      return getAllUI5Associations(ui5SelectorOrElement);
    });
  };

  this.addInBrowserHandling = async function () {
    await browser.addCommand("controlActionInBrowser", async function (fnBrowser) {
      if (arguments.length > 1) {
        // Inject web element in index 1
        const aCustomParams = [];
        for (var i = 1; i < arguments.length; i++) {
          if (arguments[i]) {
            aCustomParams.push(arguments[i]);
          }
        }
        return lib.controlActionInBrowser(fnBrowser, this, aCustomParams.toString());
      } else {
        return lib.controlActionInBrowser(fnBrowser, this);
      }
    }, true);

    await browser.addCommand("controlActionInBrowser", async function (fnBrowser, selectorOrElement) {
      if (arguments.length > 2) {
        const aCustomParams = [];
        for (var i = 2; i < arguments.length; i++) {
          if (arguments[i]) {
            aCustomParams.push(arguments[i]);
          }
        }
        return lib.controlActionInBrowser(fnBrowser, selectorOrElement, aCustomParams.join(","));
      } else {
        return lib.controlActionInBrowser(fnBrowser, selectorOrElement);
      }
    });

  };

};
export default new AddLocatorCommands();