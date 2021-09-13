/**
* @class assertion
* @memberof ui5.common
*/
const Assertion = function () {

  //--------------------------------- ATTRIBUTE --------------------------------
  /**
   * @function expectAttributeToBe
   * @memberOf ui5.common.assertion
   * @description Expects the passed elements attribute to be the compare value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} attribute - The attribute to be compared.
   * @param {String | Boolean | Number | Object} compareValue - The compare value.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectAttributeToBe(selector, "text", "Hello", 0, 30000, 10000);
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
          console.info("Removing trailing spaces didn't work for 'text' property");
        }
      }
      return value;
    }
  };


  /**
   * @function expectAttributeToContain
   * @memberOf ui5.common.assertion
   * @description Expects the passed elements attribute to contain the compare value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} attribute - The attribute to be compared.
   * @param {String} compareValue - The compare value.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectAttributeToContain(selector, "text", "Hello", 0, 30000, 10000);
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
        console.info("Removing trailing spaces didn't work");
      }
    }
    // Only string and array?
    await expect(value).toContain(compareValue);
  };


  /**
   * @function expectValidationError
   * @memberOf ui5.common.assertion
   * @description Expects the valueState of the element to be "Error".
   * @param {Object} selector - The selector describing the element.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectValidationError(selector, 30000, 10000);
   */
  this.expectValidationError = async function (selector, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    return this.expectAttributeToBe(selector, "valueState", "Error", index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectValidationSuccess
   * @memberOf ui5.common.assertion
   * @description Expects the valueState of the element to be "None".
   * @param {Object} selector - The selector describing the element.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectValidationSuccess(selector, 30000, 10000);
   */
  this.expectValidationSuccess = async function (selector, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    return this.expectAttributeToBe(selector, "valueState", "None", index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectBindingPathToBe
   * @memberOf ui5.common.assertion
   * @description Expects the passed elements attribute binding-path  to contain the compare value
   * @param {Object} selector - The selector describing the element.
   * @param {String} attribute - The attribute to be compared.
   * @param {String | String[]} compareValue - The compare value.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectBindingPathToBe(selector, "text", "Hello");
   */
  this.expectBindingPathToBe = async function (selector, attribute, compareValue, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    const elem = await browser.uiControl(selector, index, timeout);
    let values = null;
    if (loadPropertyTimeout > 0) {
      await browser.waitUntil(async function () {
        values = await elem.getBindingProperty(attribute);
        return values !== null;
      }, { timeout: loadPropertyTimeout, timeoutMsg: "Property could not loaded, timeout was reached." });
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
   * @memberOf ui5.common.assertion
   * @description Expects the passed elements binding-context-path to be the compare value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} compareValue - The compare value.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectBindingContextPathToBe(selector, "text", "Hello");
   */
  this.expectBindingContextPathToBe = async function (selector, compareValue, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    const elem = await browser.uiControl(selector, index, timeout);
    let value = null;
    if (loadPropertyTimeout > 0) {
      await browser.waitUntil(async function () {
        value = await elem.getBindingContextPath();
        return value;
      }, { timeout: loadPropertyTimeout, timeoutMsg: "Property could not loaded, timeout was reached." });
    } else {
      value = await elem.getBindingContextPath();
    }
    expect(value).toEqual(compareValue);
  };

  /**
   * @function expectTextToBe
   * @memberOf ui5.common.assertion
   * @description Expects the passed elements text attribute to be the compare value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} compareValue - The compare value.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectTextToBe(selector, "Hello");
   */
  this.expectTextToBe = async function (selector, compareValue, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    return this.expectAttributeToBe(selector, "text", compareValue, index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectValueToBe
   * @memberOf ui5.common.assertion
   * @description Expects the passed elements text value to be the compare value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} compareValue - The compare value.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectValueToBe(selector, "123");
   */
  this.expectValueToBe = async function (selector, compareValue, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    return this.expectAttributeToBe(selector, "value", compareValue, index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectValueToBeDefined
   * @memberOf ui5.common.assertion
   * @description Expects the passed elements value to be defined.
   * @param {Object} selector - The selector describing the element.
   * @param {Integer} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Integer} timeout - The timeout to wait (default value: 30 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectValueToBeDefined(selector);
   */
  this.expectValueToBeDefined = async function (selector, index = 0, timeout = 30000) {
    const value = await ui5.common.locator.getValue(selector, "value", index, timeout);
    await ui5.common.assertion.expectDefined(value);
    await ui5.common.assertion.expectUnequal(value, "");
  };

  //-------------------------------- Enabled --------------------------------
  /**
   * @function expectToBeNotEnabled
   * @memberOf ui5.common.assertion
   * @description Expects that the element is enabled to the user. Will fail if it is not enabled.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectToBeNotEnabled(selector);
   */
  this.expectToBeNotEnabled = async function (selector, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    await this.expectAttributeToBe(selector, "enabled", false, index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectToBeEnabled
   * @memberOf ui5.common.assertion
   * @description Expects that the element is enabled to the user. Will fail if it is not enabled.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectToBeEnabled(selector);
   */
  this.expectToBeEnabled = async function (selector, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    await this.expectAttributeToBe(selector, "enabled", true, index, timeout, loadPropertyTimeout);
  };


  //-------------------------------- VISIBILITY --------------------------------
  /**
   * @function expectToBeVisible
   * @memberOf ui5.common.assertion
   * @description Expects that the element is visible to the user. Will fail if it is not visible.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectToBeVisible(selector);
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
      }, { timeout: loadPropertyTimeout, timeoutMsg: "Property could not loaded, timeout was reached." });
    } else {
      const isUi5Visible = await elem.getUI5Property("visible");
      const isDomVisible = await elem.isDisplayed();
      value = isUi5Visible || isDomVisible;
    }
    this.expectTrue(value);
  };

  /**
   * @function expectToBeVisibleInViewport
   * @memberOf ui5.common.assertion
   * @description Expects that the element is visible to the user in viewport. Will fail if it is not visible in viewport.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @param {Number} loadPropertyTimeout - The timeout to wait for specific property to have value as specified in the value param (default value: 0 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectToBeVisibleInViewport(selector);
   */
  this.expectToBeVisibleInViewport = async function (selector, index = 0, timeout = 30000, loadPropertyTimeout = 0) {
    const elem = await browser.uiControl(selector, index, timeout);
    let value = null;
    if (loadPropertyTimeout > 0) {
      await expect(elem).toBeDisplayedInViewport({
        wait: loadPropertyTimeout,
        interval: 100,
        message: "Timeout by waiting for element to be visible."
      });
      await browser.waitUntil(async function () {
        const isDomVisible = await elem.isDisplayedInViewport();
        return isDomVisible !== null && isDomVisible !== undefined;
      }, { timeout: loadPropertyTimeout, timeoutMsg: "Property could not loaded, timeout was reached." });
    } else {
      const isDomVisible = await elem.isDisplayedInViewport();
      value = isDomVisible;
    }
    this.expectTrue(value);
  };

  /**
   * @function expectToBeNotVisible
   * @memberOf ui5.common.assertion
   * @description Expects that the element is not visible to the user. Will fail if it is visible.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectToBeNotVisible(selector);
   */
  this.expectToBeNotVisible = async function (selector, index = 0, timeout = 30000) {
    // By default we retrieve all elements in DOM, even invisible.
    let elem;
    try {
      elem = await browser.uiControl(selector, index, timeout, true);
    } catch (e) {
      console.log("Cannot get element in expectToBeNotVisible with the selector ", selector);
      return;
    }

    await elem.waitForDisplayed({
      timeout: timeout,
      reverse: true,
      timeoutMsg: "Element is visible, timeout reached.",
      interval: 100
    });
  };

  //-------------------------------- APPLICATION -------------------------------
  /**
   * @function expectPageTitle
   * @memberOf ui5.common.assertion
   * @description Expects the page title of the current page to be the compare value.
   * @param {String} compareValue - The compare value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectPageTitle("Home");
   */
  this.expectPageTitle = async function (compareValue) {
    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.shell.ShellAppTitle",
        "mProperties": {
          "text": compareValue,
          "tooltip": [{ "path": "i18n>shellNavMenu_openMenuTooltip" }]
        }
      }
    };
    const elem = await browser.uiControl(ui5ControlProperties);
    await expect(elem).toBeDisplayedInViewport({
      wait: 10000,
      interval: 100,
      message: "Timeout by waiting for element to be visible."
    });
  };

  /**
   * @function expectShellHeader
   * @memberOf ui5.common.assertion
   * @description Expects the shell header to be visible
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectShellHeader();
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
   * @memberOf ui5.common.assertion
   * @description Expects the logout text after logout to be "You have been logged off.
   *             This is essential for chaining scripts, therefore there is no hard browser sleep required anymore in the spec itself".
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectLogoutText();
   */
  this.expectLogoutText = async function () {
    const elem = await non_ui5.common.locator.getElementById("msgText");
    await non_ui5.common.assertion.expectToBeVisible(elem);
  };

  /**
   * @function expectUnsupportedNavigationPopup
   * @memberOf ui5.common.assertion
   * @description Expects navigation to an app that is not supported.
   *              This can be the case for Mocked tests when the application does not exist
   *              or when the app is not included in a role.
   * @param {String} navigationTarget - The selector describing the element.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectUnsupportedNavigationPopup("#SupplierInvoice-display?FiscalYear=1234&SupplierInvoice=1234567890");
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
    await ui5.common.userInteraction.click(moreDetailsButton);

    const selector = {
      "elementProperties": {
        "metadata": "sap.m.FormattedText",
        "ancestorProperties": missingNavigationPopup
      }
    };
    const detailsTextElement = await ui5.common.locator.getDisplayedElement(selector);
    const dataHtmlText = await detailsTextElement.getAttribute("data-htmltext");
    const stringExists = await dataHtmlText.includes(navigationTarget.replace(/&/g, "&amp;"));

    return this.expectTrue(stringExists);
  };

  /**
   * @function expectMessageToastText
   * @memberOf ui5.common.assertion
   * @description Expects the message toast with the passed text.
   * @param {String} text - The text to expect in the Message Toast
   * @param {Number} timeout - The timeout to wait (default value: 30 sec).
   * @returns {boolean}
   * @example await ui5.common.assertion.expectMessageToastText(text);
   */
  this.expectMessageToastText = async function (text, timeout = 30000) {
    if (!text) {
      throw new Error("expectMessageToast failed. Please provide first parameter as text.");
    }
    const xpath = "//div[contains(@class, 'sapMMessageToast') and contains(string(), '" + text + "')]";
    const elem = await non_ui5.common.locator.getElementByXPath(xpath, 0, timeout);
    return non_ui5.common.assertion.isVisible(elem);
  };

  //-------------------------------- BROWSER -------------------------------
  /**
   * @function expectUrlToBe
   * @memberOf ui5.common.assertion
   * @description Expects the url to be the passed value.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectUrlToBe("www.sap.com");
   */
  this.expectUrlToBe = async function (urlExp) {
    return expect(browser.getUrl()).resolves.toBe(urlExp);
  };

  //-------------------------------- GENERAL -------------------------------
  /**
   * @function expectEqual
   * @memberOf ui5.common.assertion
   * @description Expects the passed values to be equal.
   * @param {Any} value1 - Value (1) to be equal to value (2)
   * @param {Any} value2 - Value (2) to be equal to value (1)
   * @example ui5.common.assertion.expectEqual(value1, value2);
   */
  this.expectEqual = function (value1, value2) {
    return non_ui5.common.assertion.expectEqual(value1, value2);
  };

  /**
   * @function expectUnequal
   * @memberOf ui5.common.assertion
   * @description Expects the passed values to be unequal.
   * @param {Any} value1 - Value (1) to be unequal to value (2)
   * @param {Any} value2 - Value (2) to be unequal to value (1)
   * @example ui5.common.assertion.expectUnequal(value1, value2);
   */
  this.expectUnequal = function (value1, value2) {
    return non_ui5.common.assertion.expectUnequal(value1, value2);
  };

  /**
   * @function expectTrue
   * @memberOf ui5.common.assertion
   * @description Expects the passed value to be true.
   * @param {Any} value - Value to be equal to true
   * @example ui5.common.assertion.expectTrue(value);
   */
  this.expectTrue = function (value) {
    return non_ui5.common.assertion.expectTrue(value);
  };

  /**
   * @function expectFalse
   * @memberOf ui5.common.assertion
   * @description Expects the passed value to be false.
   * @param {Boolean} value - The value to be false.
   * @returns {Promise} The promise to be resolved.
   * @example await ui5.common.assertion.expectFalse(false);
   */
  this.expectFalse = async function (value) {
    return non_ui5.common.assertion.expectFalse(value);
  };

  /**
   * @function expectDefined
   * @memberOf ui5.common.assertion
   * @description Expects the passed values is defined.
   * @param {Any} value - Value to be defined (not undefined)
   * @example ui5.common.assertion.expectDefined(value);
   */
  this.expectDefined = function (value) {
    return non_ui5.common.assertion.expectDefined(value);
  };

  /**
   * @function expectUndefined
   * @memberOf ui5.common.assertion
   * @description Expects the passed values is undefined.
   * @param {Any} value - Value to be undefined
   * @example ui5.common.assertion.expectUndefined(value);
   */
  this.expectUndefined = function (value) {
    return non_ui5.common.assertion.expectUndefined(value);
  };

};
module.exports = new Assertion();
