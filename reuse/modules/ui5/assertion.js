"use strict";
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
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectAttributeToBe(selector, "text", "Hello");
   */
  this.expectAttributeToBe = async function (selector, attribute, compareValue, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 10000) {
    let elem;
    let value;
    try {
      elem = await ui5.element.getDisplayed(selector, index, timeout);
    } catch (error) {
      throw new Error(`Function 'expectAttributeToBe' failed:${error}`);
    }


    if (loadPropertyTimeout > 0) {
      await browser.waitUntil(async function () {
        value = await getUI5PropertyForElement(elem, attribute);
        return String(value) === String(compareValue);
      }, {
        timeout: loadPropertyTimeout,
        timeoutMsg: "Timeout while waiting for attribute " + attribute + ". Expected value: " + String(compareValue),
        interval: 100,
      });
    } else {
      value = await getUI5PropertyForElement(elem, attribute);
    }
    return expect(String(value)).toEqual(String(compareValue));
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
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectAttributeToContain(selector, "text", "abc");
   */
  this.expectAttributeToContain = async function (selector, attribute, compareValue, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 10000) {
    let elem;
    let value;
    try {
      elem = await ui5.element.getDisplayed(selector, index, timeout);
    } catch (error) {
      throw new Error(`Function 'expectAttributeToContain' failed:${error}`);
    }

    if (loadPropertyTimeout > 0) {
      await browser.waitUntil(async function () {
        value = await getUI5PropertyForElement(elem, attribute);
        return value.includes(compareValue);
      }, {
        timeout: loadPropertyTimeout,
        timeoutMsg: `Timeout while waiting for attribute '${attribute}'. Actual value doesn't include the expected value: '${String(compareValue)}'.`,
        interval: 100
      });
    } else {
      value = await getUI5PropertyForElement(elem, attribute);
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
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectTextToBe(selector, "Hello");
   */
  this.expectTextToBe = async function (selector, compareValue, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 10000) {
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
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectValueToBe(selector, "123");
   */
  this.expectValueToBe = async function (selector, compareValue, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 10000) {
    return this.expectAttributeToBe(selector, "value", compareValue, index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectValueToBeDefined
   * @memberOf ui5.assertion
   * @description Expects the passed elements value to be defined.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.assertion.expectValueToBeDefined(selector);
   */
  this.expectValueToBeDefined = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    const value = await ui5.element.getValue(selector, index, timeout);
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
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectToBeNotEnabled(selector);
   */
  this.expectToBeNotEnabled = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 10000) {
    await this.expectAttributeToBe(selector, "enabled", false, index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectToBeEnabled
   * @memberOf ui5.assertion
   * @description Expects that the element is enabled to the user. 
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectToBeEnabled(selector);
   */
  this.expectToBeEnabled = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 10000) {
    await this.expectAttributeToBe(selector, "enabled", true, index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectValidationError
   * @memberOf ui5.assertion
   * @description Expects the "valueState" of the element to be "Error".
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectValidationError(selector);
   */
  this.expectValidationError = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 10000) {
    return this.expectAttributeToBe(selector, "valueState", "Error", index, timeout, loadPropertyTimeout);
  };

  /**
   * @function expectValidationSuccess
   * @memberOf ui5.assertion
   * @description Expects the valueState of the element to be "None".
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectValidationSuccess(selector);
   */
  this.expectValidationSuccess = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 10000) {
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
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectBindingPathToBe(selector, "text", "Hello");
   */
  this.expectBindingPathToBe = async function (selector, attribute, compareValue, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 10000) {
    let elem;
    try {
      elem = await ui5.element.getDisplayed(selector, index, timeout);
    } catch (error) {
      throw new Error(`Function 'expectBindingPathToBe' failed:${error}`);
    }

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
    // Note: looks like we should construct values[x|0].model + '>' +  values[x|0].path
    if (Array.isArray(compareValue)) {
      const mergedArrayOfValues = values.map(value => mergeModelAndPath(value));
      for (let x = 0; x < compareValue.length; x++) {
        expect(mergedArrayOfValues).toContain(compareValue[x]);
      }
    } else {
      expect(mergeModelAndPath(values[0])).toContain(compareValue);
    }

    function mergeModelAndPath(value) {
      if (value.model && value.model.length) {
        return `${value.model}>${value.path}`;
      } else {
        return value.path;
      }
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
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectBindingContextPathToBe(selector, "text", "Hello");
   */
  this.expectBindingContextPathToBe = async function (selector, compareValue, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 10000) {
    let elem;
    try {
      elem = await ui5.element.getDisplayed(selector, index, timeout);
    } catch (error) {
      throw new Error(`Function 'expectBindingContextPathToBe' failed:${error}`);
    }

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
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectToBeVisible(selector);
   */
  this.expectToBeVisible = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000, loadPropertyTimeout = 10000) {
    let elem;

    try {
      elem = await ui5.element.getDisplayed(selector, index, timeout);
    } catch (error) {
      throw new Error(`Function 'expectToBeVisible' failed:${error}`);
    }

    let value = null;
    if (loadPropertyTimeout > 0) {
      await expect(elem).toBeDisplayed({
        wait: loadPropertyTimeout,
        interval: 100,
        message: "Timeout by waiting for element to be visible."
      });
      return browser.waitUntil(async function () {
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
      common.assertion.expectTrue(value);
    }
  };

  /**
   * @function expectToBeVisibleInViewport 
   * @memberOf ui5.assertion
   * @description Expects that the element is visible in the viewport. 
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Number} [loadPropertyTimeout = 10000] - The timeout to wait for a specific property to have the given compare value.
   * @example await ui5.assertion.expectToBeVisibleInViewport(selector);
   */
  this.expectToBeVisibleInViewport = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    let elem;
    try {
      elem = await ui5.element.getDisplayed(selector, index, timeout);
    } catch (error) {
      throw new Error(`Function 'expectToBeVisibleInViewport' failed:${error}`);
    }

    let value = null;
    await browser.waitUntil(async function () {
      value = await elem.isDisplayedInViewport();
      return value;
    }, {
      timeout: timeout,
      timeoutMsg: `Function 'expectToBeVisibleInViewport' failed: Given Selector was not in the Viewport.`
    });
    common.assertion.expectTrue(value);
  };

  /**
   * @function expectToBeNotVisible
   * @memberOf ui5.assertion
   * @description Expects that the element is not visible to the user.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms). Recommendation is to lower the timeout since the element is not expected to show up.
   * @example await ui5.assertion.expectToBeNotVisible(selector, 0, 5000);
   */
  this.expectToBeNotVisible = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    try {
      const isVisible = await ui5.element.isVisible(selector, index, timeout);
      return common.assertion.expectFalse(isVisible);
    } catch (error) {
      throw new Error(`Function 'expectToBeNotVisible' failed. Element with selector ${selector} is visible.`);
    }
  };


  // =================================== APPLICATION ===================================
  /**
   * @function expectMessageToastTextToBe
   * @memberOf ui5.assertion
   * @description Expects the message toast with the passed text.
   * @param {String} text - The expected text.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.assertion.expectMessageToastTextToBe(text);
   */
  this.expectMessageToastTextToBe = async function (text, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    if (!text) {
      throw new Error("Function 'expectMessageToast' failed. Please provide the expected text as argument.");
    }
    const xpath = "//div[contains(@class, 'sapMMessageToast') and contains(string(), '" + text + "')]";
    const elem = await nonUi5.element.getByXPath(xpath, 0, timeout);
    return nonUi5.assertion.expectToBeVisible(elem);
  };


  async function getUI5PropertyForElement(elem, attribute) {
    let value = await elem.getUI5Property(attribute);

    if (value === null || value === undefined || value === "") {
      value = await ui5.element.getInnerAttribute(elem, "data-" + attribute);
    }

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
module.exports = new Assertion();