/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
// @ts-nocheck
var clientsidescripts = require("../../clientsideUI5scripts");

function isEmptyObjectOrUndefined(obj) {
  return !obj || (Object.keys(obj).length === 0 && obj.constructor === Object);
}

//TODO: Consider count stable later
var COUNT_STABLE = 1;
var LibScripts = function () {

  this.mockServerActionInBrowser = async function () {
    const aCustomParams = [];
    let browserFunction = null;
    let mockServerPath = null;
    if (typeof arguments[0] === "function") {
      browserFunction = arguments[0];
    } else {
      throw new Error("Make sure first parameter is a client function.");
    }
    if (arguments[1]) {
      try {
        mockServerPath = arguments[1];
      } catch (error) {
        throw new Error("No web element found.");
      }
    } else {
      throw new Error("Make sure first parameter is an element or a selector.");
    }
    if (arguments.length > 2) {
      for (var i = 2; i < arguments.length; i++) {
        if (arguments[i] !== null && arguments[i] !== undefined) {
          //console.log("Adding extra argument:" + arguments[i]);
          aCustomParams.push(arguments[i]);
        }
      }
    }
    if (browserFunction !== null && browserFunction !== undefined && mockServerPath) {
      var nConvFunction = function (browserFunction, mockServerPath, aCustomParams, callBack) {
        var mockserver = null;
        var userDefFunction = "userDefFunction = " + browserFunction;
        try {
          if (mockServerPath) {
            // eslint-disable-next-line no-undef
            mockserver = sap.ui.requireSync(mockServerPath);
          }
        } catch (ex) {
          throw new Error("Conversion to UI5 mockserver was unsuccesful:" + ex);
        }

        try {
          userDefFunction = eval(userDefFunction);
        } catch (e) {
          throw new Error("Eval failed:" + e);
        }
        if (aCustomParams && aCustomParams.length) {
          const args = [mockserver].concat(aCustomParams).concat([callBack]);
          return userDefFunction.apply(this, args);

          // Note: here is a difference between 'controlActionInBrowser' and 'mockServerActionInBrowser'
          // return userDefFunction(mockserver, aCustomParams.toString(), callBack);
        }
        return userDefFunction(mockserver, callBack);
      };
      return browser.executeAsync(nConvFunction, browserFunction.toString(), mockServerPath, aCustomParams);
    } else {
      throw new Error("Invalid parameters.");
    }
  };

  this.controlActionInBrowser = async function () {
    const aCustomParams = [];
    let browserFunction = null;
    let webElem = null;
    if (typeof arguments[0] === "function") {
      browserFunction = arguments[0];
    } else {
      throw new Error("Make sure you provide a function to be executed in browser");
    }

    if (!arguments[1]) {
      throw new Error("Make sure you provide an element or a selector. Currently is undefined");
    }

    try {
      if (arguments[1].getAttribute) {
        try {
          webElem = arguments[1];
        } catch (error) {
          throw new Error("No web element found.");
        }
      } else if (arguments[1].elementProperties) {
        const returnAllDomElements = arguments[1].returnAllDomElements;
        webElem = await this.uiControlExecuteLocator(arguments[1], 0, 30000, undefined, returnAllDomElements);
      } else if (arguments[1].selector) {
        const index = arguments[1].index || 0;
        const timeout = arguments[1].timeout || 30000;
        const selector = arguments[1].selector;
        const returnAllDomElements = arguments[1].returnAllDomElements;
        webElem = await this.uiControlExecuteLocator(selector, index, timeout, undefined, returnAllDomElements);
      } else {
        throw new Error("Make sure you provide an element or a selector. Currently is undefined");
      }
    } catch (error) {
      throw error;
    }


    if (arguments.length > 2) {
      for (var i = 2; i < arguments.length; i++) {
        if (arguments[i]) {
          aCustomParams.push(arguments[i]);
        }
      }
    }
    if (browserFunction !== null && browserFunction !== undefined &&
        webElem !== null && webElem !== undefined) {
      var nConvFunction = function (browserFunction, webElem, aCustomParams, callBack) {
        var control = null;
        var userDefFunction = "userDefFunction = " + browserFunction;
        try {
          if (webElem) {
            // eslint-disable-next-line no-undef
            control = sap.ui.core.Element.registry.get(webElem.getAttribute("id"));
          }
        } catch (ex) {
          throw new Error("Conversion to UI5 control was unsuccesful:" + ex);
        }

        try {
          userDefFunction = eval(userDefFunction);
        } catch (e) {
          throw new Error("Eval failed:" + e);
        }
        if (aCustomParams && aCustomParams.length) {
          return userDefFunction(control, ...aCustomParams, callBack);
        }
        return userDefFunction(control, callBack);
      };
      return browser.executeAsync(nConvFunction, browserFunction.toString(), webElem, aCustomParams);
    } else {
      throw new Error("Invalid parameters.");
    }
  };

  this.waitUI5ToStabilize = async function (ui5Selector) {
    if (!browser.config.waitForUI5Timeout) {
      browser.config.waitForUI5Timeout = 90000;
    }
    if (!browser.config.waitForUI5PollingInterval) {
      browser.config.waitForUI5PollingInterval = 10;
    }
    try {
      await browser.waitUntil(async () => {
        return (await browser.execute(clientsidescripts.loadUI5CoreAndAutowaiter)) === true;
      }, {
        timeout: browser.config.waitForUI5Timeout,
        timeoutMsg: `Timeout of ${browser.config.waitForUI5Timeout / 1000}s reached, UI5 libraries did not load`,
        interval: 10
      });

      var mScriptParams = {};
      mScriptParams.waitForUI5Timeout = browser.config.waitForUI5Timeout;
      mScriptParams.waitForUI5PollingInterval = browser.config.waitForUI5PollingInterval;
      await browser.waitUntil(async () => {
        return (await browser.execute(clientsidescripts.loadUI5Page, mScriptParams)) === true;
      }, {
        timeout: browser.config.waitForUI5Timeout,
        timeoutMsg: `Timeout of ${browser.config.waitForUI5Timeout / 1000}s reached, UI5 page did not load`,
        interval: 10
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      //console.log(`waitUI5ToStabilize(ui5Selector): Function raised an exception and ignored... Selector: ${util.formatter.stringifyJSON(ui5Selector)} and error: ${error}`);
    }

  };

  this.stableDomElementCount = async function (ui5Selector, rootElement, countStable, elmLength, allTries) {
    if (countStable && countStable > 0 && allTries && allTries > 0) {
      let aElements = null;
      if (!isEmptyObjectOrUndefined(ui5Selector)) {
        if (ui5Selector && (ui5Selector.elementProperties || ui5Selector.ancestorProperties
            || ui5Selector.descendantProperties || ui5Selector.siblingProperties
            || ui5Selector.parentProperties || ui5Selector.childProperties
            || ui5Selector.prevSiblingProperties || ui5Selector.nextSiblingProperties)) {
          aElements = await browser.custom$$("ui5All", ui5Selector, rootElement);
        } else if (ui5Selector && ui5Selector.controlType) {
          aElements = await browser.custom$$("ui5Veri5", ui5Selector);
        }
      }
      if (!aElements || aElements.length === 0) return null;
      const displayedElements = [];
      for (let i = 0; i < aElements.length; i++) {
        const isDisplayedInPort = await aElements[i].isDisplayedInViewport();
        if (isDisplayedInPort) {
          displayedElements.push(aElements[i]);
        }
      }
      var newLength = elmLength;
      if (displayedElements.length === newLength) {
        countStable--;
      } else {
        newLength = displayedElements.length;
        countStable = COUNT_STABLE;
      }
      allTries--;
      // eslint-disable-next-line no-console
      //console.log("Countstable:" + countStable +" All tries" + allTries +" Stability check, found:" + displayedElements.length + " expected:" + newLength);
      return this.stableDomElementCount(ui5Selector, rootElement, countStable, newLength, allTries);
    }
  };

  this.getDisplayedElements = async function (ui5Selector, rootElement, countStable, allTries, returnAllDomElements = false) {
    var aElements = null;
    try {
      if (!isEmptyObjectOrUndefined(ui5Selector)) {
        if (ui5Selector && (ui5Selector.elementProperties || ui5Selector.ancestorProperties
            || ui5Selector.descendantProperties || ui5Selector.siblingProperties
            || ui5Selector.parentProperties || ui5Selector.childProperties
            || ui5Selector.prevSiblingProperties || ui5Selector.nextSiblingProperties)) {
          if (!ui5Selector.elementProperties || isEmptyObjectOrUndefined(ui5Selector.elementProperties)) {
            throw new Error(`The selector your provided ${ui5Selector ? JSON.stringify(ui5Selector) : ui5Selector} does not contain elementProperties, please provide a valid selector with elementProperties`);
          }
          aElements = await browser.custom$$("ui5All", ui5Selector, rootElement);
        } else if (ui5Selector && ui5Selector.controlType){
          aElements = await browser.custom$$("ui5Veri5", ui5Selector);
        } else {
          return null;
        }
      }
      if (aElements && Array.isArray(aElements) && aElements.length > 0) {
        var displayedElements = [];
        for (let i = 0; i < aElements.length; i++) {
          if (returnAllDomElements) {
            displayedElements.push(aElements[i]);
          } else {
            const isDisplayed = await aElements[i].isDisplayed();
            if (isDisplayed) {
              displayedElements.push(aElements[i]);
            }
          }
        }

        if (displayedElements && Array.isArray(displayedElements) && displayedElements.length > 0) {
          await this.stableDomElementCount(ui5Selector, rootElement, countStable, displayedElements.length, allTries);
          return displayedElements;
        }
      }
    } catch (error) {
      // If the element is not there yet will throw an error that node was not present,
      // javascript error: no node html elements found
      // In such cases we have to wait untill it appears until timeout is reached
      // Later we have to investigate on appropriate messaging
      // console.log(`getDisplayedElements(): Function raised exception and is ignored... Selector: ${ui5Selector} and error: ${error}`);
      return null;
    }
    return null;
  };

  this.uiControlExecuteLocator = async function (ui5Selector, index, timeout, rootElement, returnAllDomElements = false) {
    var elems = null;
    var that = this;
    const countStable = COUNT_STABLE;
    const allTries = browser.config.stableCountTries || 1;
    const finalTimeout = timeout || browser.config.waitforTimeout;

    if (browser.config.useWaitUI5ToStabilize !== false) {
      /*
      * If not used it will not wait for the page to be stabilized before next action
      */
      // console.log("Waiting page to stabilize");
      await this.waitUI5ToStabilize(ui5Selector);
      // console.log("Page stabilized, continue...");
    }

    // Note: it is possible to use () => {} - arrow function to keep scope:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    await browser.waitUntil(async () => {
      elems = await that.getDisplayedElements(ui5Selector, rootElement, countStable, allTries, returnAllDomElements);
      return elems && Array.isArray(elems) && elems.length > 0;

    }, {
      timeout: finalTimeout,
      timeoutMsg: `uiControlExecuteLocator(): No visible elements found with selector: ${util.formatter.stringifyJSON(ui5Selector)} in ${finalTimeout / 1000}s`,
      interval: 50
    });
    if (elems && Array.isArray(elems) && elems.length > 0 &&
        index !== null && index !== undefined && index < elems.length) {
      return elems[index];
    }
    return elems;
  };

  this.loadMockData = async function (responsePath, isText) {
    return browser.executeAsync(clientsidescripts.loadMockData, {
      responsePath: responsePath,
      isText: isText
    });
  };
};

module.exports = new LibScripts();