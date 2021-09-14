/**
 * @class assertion
 * @memberof ui5
 */
const Assertion = function () {

  // =================================== PROPERTIES ===================================
  /**
   * @function expectAttributeToBe
   * @memberOf ui5.assertion
   * @description Expects the passed elements attribute to be the compare value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} attribute - The attribute to be compared.
   * @param {String | Boolean | Number | Object} compareValue - The compare value.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectAttributeToBe(selector, "text", "Hello");
   */
  this.expectAttributeToBe = async function (selector, attribute, compareValue, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    const elem = await browser.uiControl(selector, index, timeout);

    if (loadPropertyTimeout > 0) {
      await browser.waitUntil(async function () {
        const receivedValue = await getUI5PropertyForSelector(attribute);
        return receivedValue === compareValue;
      }, {
        timeout: loadPropertyTimeout,
        timeoutMsg: "Timeout while waiting for element.",
        interval: 100,
      });
    }
    const value = await getUI5PropertyForSelector(attribute);
    return expect(String(value)).toEqual(String(compareValue));

    async function getUI5PropertyForSelector(attribute) {
      let value = await elem.getUI5Property(attribute);
      if (attribute.toLowerCase() === "text") {
        try {
          value = value.trim();
        } catch (e) {
          util.console.info("Removing trailing spaces didn't work for 'text' property.");
        }
      }
      return value;
    }
  };

  /**
   * @function expectAttributeToContain
   * @memberOf ui5.assertion
   * @description Expects the passed elements attribute to contain the compare value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} attribute - The attribute to be compared.
   * @param {String} compareValue - The compare value.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectAttributeToContain(selector, "text", "abc");
   */
  this.expectAttributeToContain = async function (selector, attribute, compareValue, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    const elem = await browser.uiControl(selector, index, timeout);

    if (loadPropertyTimeout > 0) {
      await expect(elem).toHaveAttributeContaining(attribute, compareValue, {
        wait: loadPropertyTimeout,
        interval: 100,
        message: "Timeout while waiting for element."
      });
    }
    let value = await elem.getUI5Property(attribute);

    if (attribute.toLowerCase() === "text") {
      try {
        value = value.trim();
      } catch (e) {
        util.console.info("Removing trailing spaces didn't work for 'text' property.");
      }
    }
    return expect(value).toContain(compareValue);
  };

  /**
   * @function expectTextToBe
   * @memberOf ui5.assertion
   * @description Expects the passed elements text attribute to be the compare value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} compareValue - The compare value.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectTextToBe(selector, "Hello");
   */
  this.expectTextToBe = async function (selector, compareValue, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    return this.expectAttributeToBe(selector, "text", compareValue, index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectValueToBe
   * @memberOf ui5.assertion
   * @description Expects the passed elements value attribute to be the compare value.
   * @param {Object} selector - The selector describing the element.
   * @param {String | Number} compareValue - The compare value.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectValueToBe(selector, "123");
   */
  this.expectValueToBe = async function (selector, compareValue, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    return this.expectAttributeToBe(selector, "value", compareValue, index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectValueToBeDefined
   * @memberOf ui5.assertion
   * @description Expects the passed elements value to be defined.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectValueToBeDefined(selector);
   */
  this.expectValueToBeDefined = async function (selector, index = 0, timeout = 30000) {
    const value = await ui5.element.getValue(selector, "value", index, timeout);
    await common.assertion.expectDefined(value);
    await common.assertion.expectUnequal(value, "");
  };

  /**
   * @function expectToBeNotEnabled
   * @memberOf ui5.assertion
   * @description Expects that the element is enabled to the user. 
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectToBeNotEnabled(selector);
   */
  this.expectToBeNotEnabled = async function (selector, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    await this.expectAttributeToBe(selector, "enabled", false, index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectToBeEnabled
   * @memberOf ui5.assertion
   * @description Expects that the element is enabled to the user. 
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectToBeEnabled(selector);
   */
  this.expectToBeEnabled = async function (selector, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    await this.expectAttributeToBe(selector, "enabled", true, index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectValidationError
   * @memberOf ui5.assertion
   * @description Expects the "valueState" of the element to be "Error".
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectValidationError(selector);
   */
  this.expectValidationError = async function (selector, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    return this.expectAttributeToBe(selector, "valueState", "Error", index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectValidationSuccess
   * @memberOf ui5.assertion
   * @description Expects the valueState of the element to be "None".
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectValidationSuccess(selector);
   */
  this.expectValidationSuccess = async function (selector, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    return this.expectAttributeToBe(selector, "valueState", "None", index, timeout, loadPropertyTimeout);
  };


  // =================================== BINDINGS ===================================
  /**
   * @function expectBindingPathToBe
   * @memberOf ui5.assertion
   * @description Expects the passed elements attribute binding-path to contain the compare value
   * @param {Object} selector - The selector describing the element.
   * @param {String} attribute - The attribute to be compared.
   * @param {String | String[]} compareValue - The compare value(s).
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectBindingPathToBe(selector, "text", "Hello");
   */
  this.expectBindingPathToBe = async function (selector, attribute, compareValue, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    const elem = await browser.uiControl(selector, index, timeout);
    let values = null;
    if (loadPropertyTimeout > 0) {
      await browser.waitUntil(async function () {
        values = await elem.getBindingProperty(attribute);
        return values !== null;
      }, {
        timeout: loadPropertyTimeout,
        timeoutMsg: "Property could not be loaded, timeout was reached."
      });
    } else {
      values = await elem.getBindingProperty(attribute);
    }
    if (Array.isArray(compareValue)) {
      for (let x = 0; x < compareValue.length; x++) {
        expect(values[x].path).toContain(compareValue[x]);
      }
    } else {
      expect(values[0].path).toContain(compareValue);
    }
  };

  /**
   * @function expectBindingContextPathToBe
   * @memberOf ui5.assertion
   * @description Expects the passed elements binding-context-path to be the compare value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} attribute - The attribute to be compared.
   * @param {String} compareValue - The compare value.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectBindingContextPathToBe(selector, "text", "Hello");
   */
  this.expectBindingContextPathToBe = async function (selector, compareValue, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    const elem = await browser.uiControl(selector, index, timeout);
    let value = null;
    if (loadPropertyTimeout > 0) {
      await browser.waitUntil(async function () {
        value = await elem.getBindingContextPath();
        return value;
      }, {
        timeout: loadPropertyTimeout,
        timeoutMsg: "Property could not loaded, timeout was reached."
      });
    } else {
      value = await elem.getBindingContextPath();
    }
    expect(value).toEqual(compareValue);
  };


  // =================================== VISIBILITY ===================================
  /**
   * @function expectToBeVisible
   * @memberOf ui5.assertion
   * @description Expects that the element is visible to the user.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectToBeVisible(selector);
   */
  this.expectToBeVisible = async function (selector, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    const elem = await browser.uiControl(selector, index, timeout);
    let value = null;
    if (loadPropertyTimeout > 0) {
      await expect(elem).toBeVisible({
        wait: loadPropertyTimeout,
        interval: 100,
        message: "Timeout by waiting for element to be visible."
      });
      await browser.waitUntil(async function () {
        const isUi5Visible = await elem.getUI5Property("visible");
        const isDomVisible = await elem.isDisplayed();
        return isUi5Visible !== null && isUi5Visible !== undefined ||
          isDomVisible !== null && isDomVisible !== undefined;
      }, {
        timeout: loadPropertyTimeout,
        timeoutMsg: "Property could not be loaded, timeout was reached."
      });
    } else {
      const isUi5Visible = await elem.getUI5Property("visible");
      const isDomVisible = await elem.isDisplayed();
      value = isUi5Visible || isDomVisible;
    }
    common.assertion.expectTrue(value);
  };

  /**
   * @function expectToBeVisibleInViewport
   * @memberOf ui5.assertion
   * @description Expects that the element is visible in the viewport. 
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout=0] - The timeout to wait for a specific property to have the given compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectToBeVisibleInViewport(selector);
   */
  this.expectToBeVisibleInViewport = async function (selector, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    const elem = await browser.uiControl(selector, index, timeout);
    let value = null;
    if (loadPropertyTimeout > 0) {
      await expect(elem).toBeVisibleInViewport({
        wait: loadPropertyTimeout,
        interval: 100,
        message: "Timeout by waiting for element to be visible."
      });
      await browser.waitUntil(async function () {
        const isDomVisible = await elem.isDisplayedInViewport();
        return isDomVisible !== null && isDomVisible !== undefined;
      }, {
        timeout: loadPropertyTimeout,
        timeoutMsg: "Property could not be loaded, timeout was reached."
      });
    } else {
      const isDomVisible = await elem.isDisplayedInViewport();
      value = isDomVisible;
    }
    this.expectTrue(value);
  };

  /**
   * @function expectToBeNotVisible
   * @memberOf ui5.assertion
   * @description Expects that the element is not visible to the user.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectToBeNotVisible(selector);
   */
  this.expectToBeNotVisible = async function (selector, index = 0, timeout = 30000) {
    let elem;
    try {
      elem = await browser.uiControl(selector, index, timeout, true);
    } catch (e) {
      // util.console.log("Cannot get element in expectToBeNotVisible with the selector ", selector); // TODO: should we log this as it is expected?
      return;
    }

    await elem.waitForDisplayed({
      timeout: timeout,
      reverse: true,
      timeoutMsg: "Element is visible, timeout reached.",
      interval: 100
    });
  };


  // =================================== APPLICATION ===================================
  /**
   * @function expectPageTitle
   * @memberOf ui5.assertion
   * @description Expects the page title of the current page to be the compare value.
   * @param {String} compareValue - The compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectPageTitle("Home");
   */
  this.expectPageTitle = async function (compareValue) {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.shell.ShellAppTitle",
        "mProperties": {
          "text": compareValue,
          "tooltip": [{
            "path": "i18n>shellNavMenu_openMenuTooltip"
          }]
        }
      }
    };
    const elem = await browser.uiControl(selector);
    await expect(elem).toBeVisibleInViewport({
      wait: 10000,
      interval: 100,
      message: "Timeout by waiting for element to be visible."
    });
  };

  /**
   * @function expectShellHeader
   * @memberOf ui5.assertion
   * @description Expects the shell header to be visible
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectShellHeader();
   */
  this.expectShellHeader = async function () {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.ShellHeader",
        "id": "shell-header"
      }
    };
    return this.expectToBeVisible(selector);
  };

  /**
   * @function expectLogoutText
   * @memberOf ui5.assertion
   * @description Expects the logout text after logout to be "You have been logged off.
   * This is essential for chaining scripts, so that no static browser sleep in the spec itself is required anymore.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectLogoutText();
   */
  this.expectLogoutText = async function () {
    const elem = await nonUi5.element.getElementById("msgText");
    await nonUi5.assertion.expectToBeVisible(elem);
  };

  /**
   * @function expectUnsupportedNavigationPopup
   * @memberOf ui5.assertion
   * @description Expects navigation to an app that is not supported.
   * This can be the case for Mocked tests when the application does not exist or when the app is not included in a role.
   * @param {String} navigationTarget - The selector describing the element.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectUnsupportedNavigationPopup("#SupplierInvoice-display?FiscalYear=1234&SupplierInvoice=1234567890");
   */
  this.expectUnsupportedNavigationPopup = async function (navigationTarget) {
    const missingNavigationPopup = {
      "elementProperties": {
        "metadata": "sap.m.Dialog",
        "type": "Message",
        "state": "Error"
      }
    };
    await this.expectToBeVisible(missingNavigationPopup);

    const moreDetailsButton = {
      "elementProperties": {
        "metadata": "sap.m.Link",
        "ancestor": missingNavigationPopup
      }
    };
    await ui5.userInteraction.click(moreDetailsButton);

    const selector = {
      "elementProperties": {
        "metadata": "sap.m.FormattedText",
        "ancestorProperties": missingNavigationPopup
      }
    };
    const detailsTextElement = await ui5.element.getDisplayedElement(selector);
    const dataHtmlText = await detailsTextElement.getAttribute("data-htmltext");
    const stringExists = await dataHtmlText.includes(navigationTarget.replace(/&/g, "&amp;"));

    return common.assertion.expectTrue(stringExists);
  };

  /**
   * @function expectMessageToastText
   * @memberOf ui5.assertion
   * @description Expects the message toast with the passed text.
   * @param {String} text - The expected text.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.assertion.expectMessageToastText(text);
   */
  this.expectMessageToastText = async function (text, timeout = 30000) {
    if (!text) {
      throw new Error("Function 'expectMessageToast' failed. Please provide the expected text as argument.");
    }
    const xpath = "//div[contains(@class, 'sapMMessageToast') and contains(string(), '" + text + "')]";
    const elem = await nonUi5.element.getElementByXPath(xpath, 0, timeout);
    return nonUi5.element.isVisible(elem); //TODO: should be a strict assertion which fails instead of returning true/false
  };

};
module.exports = new Assertion();