var vyperLocator = require("../../locators/vyperLocator");
var uiveri5Locator = require("../../locators/uiveri5Locator");
var lib = require("./lib");
const { ui5ControlLocator, ui5ControlsLocators, getUI5Property,
  getUI5Aggregation, getUI5Association, getBindingContextPath,
  getBindingProperty, getAllUI5Properties, getAllUI5Aggregations,
  getAllUI5Associations
} = require("./locatorCommands");

var AddLocatorCommands = function () {
  this.addControlCommands = async function () {
    // Add Vyper locator strategy
    await browser.addLocatorStrategy("ui5All", vyperLocator.ui5All);
    await browser.addLocatorStrategy("ui5Veri5", uiveri5Locator.ui5Veri5);
    // Register global names
    //global.uiControl = ui5ControlLocator;
    //global.uiControls = ui5ControlsLocator;

    // Add command for control
    await browser.addCommand("uiControl", async function (ui5Selector, index, timeout, returnAllDomElements = false) {
      return await ui5ControlLocator(ui5Selector, index, timeout, this, returnAllDomElements);
    }, true);
    await browser.addCommand("uiControl", async function (ui5Selector, index, timeout, returnAllDomElements = false) {
      return await ui5ControlLocator(ui5Selector, index, timeout, undefined, returnAllDomElements);
    });

    // Add command for controls
    await browser.addCommand("uiControls", async function (ui5Selector, timeout) {
      return await ui5ControlsLocators(ui5Selector, timeout, this);
    }, true);
    await browser.addCommand("uiControls", async function (ui5Selector, timeout) {
      return await ui5ControlsLocators(ui5Selector, timeout);
    });
  };

  this.addGetBindingInfos = async function () {
    // Add command for element properties
    await browser.addCommand("getBindingContextPath", async function () {
      return await getBindingContextPath(this);
    }, true);

    // Add command for browser properties
    await browser.addCommand("getBindingContextPath", async function (ui5SelectorOrElement) {
      return await getBindingContextPath(ui5SelectorOrElement);
    });

    // Add command for element properties
    await browser.addCommand("getBindingProperty", async function (propName) {
      return await getBindingProperty(propName, this);
    }, true);

    // Add command for browser properties
    await browser.addCommand("getBindingProperty", async function (propName, ui5SelectorOrElement) {
      return await getBindingProperty(propName, ui5SelectorOrElement);
    });

  };

  this.addGetControlProperties = async function () {
    // Add command for element properties
    await browser.addCommand("getUI5Property", async function (propertyName) {
      return await getUI5Property(propertyName, this);
    }, true);

    // Add command for browser properties
    await browser.addCommand("getUI5Property", async function (propertyName, ui5SelectorOrElement) {
      return await getUI5Property(propertyName, ui5SelectorOrElement);
    });

    // Add command for element properties
    await browser.addCommand("getUI5Aggregation", async function (propertyName) {
      return await getUI5Aggregation(propertyName, this);
    }, true);

    // Add command for browser properties
    await browser.addCommand("getUI5Aggregation", async function (propertyName, ui5SelectorOrElement) {
      return await getUI5Aggregation(propertyName, ui5SelectorOrElement);
    });

    // Add command for element properties
    await browser.addCommand("getUI5Association", async function (propertyName) {
      return await getUI5Association(propertyName, this);
    }, true);

    // Add command for browser properties
    await browser.addCommand("getUI5Association", async function (propertyName, ui5SelectorOrElement) {
      return await getUI5Association(propertyName, ui5SelectorOrElement);
    });

    await browser.addCommand("getAllUI5Properties", async function () {
      return await getAllUI5Properties(this);
    }, true);

    await browser.addCommand("getAllUI5Properties", async function (ui5SelectorOrElement) {
      return await getAllUI5Properties(ui5SelectorOrElement);
    });

    await browser.addCommand("getAllUI5Aggregations", async function () {
      return await getAllUI5Aggregations(this);
    }, true);

    await browser.addCommand("getAllUI5Aggregations", async function (ui5SelectorOrElement) {
      return await getAllUI5Aggregations(ui5SelectorOrElement);
    });

    await browser.addCommand("getAllUI5Associations", async function () {
      return await getAllUI5Associations(this);
    }, true);

    await browser.addCommand("getAllUI5Associations", async function (ui5SelectorOrElement) {
      return await getAllUI5Associations(ui5SelectorOrElement);
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
        return await lib.controlActionInBrowser(fnBrowser, this, aCustomParams.toString());
      } else {
        return await lib.controlActionInBrowser(fnBrowser, this);
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
        return await lib.controlActionInBrowser(fnBrowser, selectorOrElement, aCustomParams.join(","));
      } else {
        return await lib.controlActionInBrowser(fnBrowser, selectorOrElement);
      }
    });

  };

};
module.exports = new AddLocatorCommands();