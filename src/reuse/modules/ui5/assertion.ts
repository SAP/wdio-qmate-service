"use strict";

import { Element } from "../../../../@types/wdio";

/**
 * @class assertion
 * @memberof ui5
 */
export class Assertion {

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
  async expectAttributeToBe (selector: any, attribute: string, compareValue: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
    let elem: Element, value;
    compareValue = String(compareValue)

    this._throwAttributeError(attribute, "expectAttributeToBe");


    try {
      elem = await ui5.element.getDisplayed(selector, index, timeout);
    } catch (error) {
      throw new Error(`Function 'expectAttributeToBe' failed:${error}`);
    }

    let ui5PropertyValue, innerUI5PropertyValue;
    try {
      await browser.waitUntil(async () => {
        ui5PropertyValue = String(await this._getUI5Property(elem, attribute));
        innerUI5PropertyValue = String(await this._getInnerUI5Property(elem, attribute));
        if (ui5PropertyValue === compareValue) {
          value = ui5PropertyValue;
          return true;
        } else if (innerUI5PropertyValue === compareValue) {
          value = innerUI5PropertyValue;
          return true;
        } else {
          return false;
        }
      }, {
        timeout: 2000 + +loadPropertyTimeout,
        interval: 100,
      });
    } catch (error) {
      value = ui5PropertyValue ? ui5PropertyValue : innerUI5PropertyValue;
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
  async expectAttributeToContain (selector: any, attribute: string, compareValue: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
    let elem: Element, value;
    compareValue = String(compareValue);

    this._throwAttributeError(attribute, "expectAttributeToContain");

    try {
      elem = await ui5.element.getDisplayed(selector, index, timeout);
    } catch (error) {
      throw new Error(`Function 'expectAttributeToContain' failed:${error}`);
    }

    let ui5PropertyValue, innerUI5PropertyValue;
    try {
      await browser.waitUntil(async () => {
        ui5PropertyValue = String(await this._getUI5Property(elem, attribute));
        innerUI5PropertyValue = String(await this._getInnerUI5Property(elem, attribute));
        if (ui5PropertyValue.includes(compareValue)) {
          value = ui5PropertyValue;
          return true;
        } else if (innerUI5PropertyValue.includes(compareValue)) {
          value = innerUI5PropertyValue;
          return true;
        } else {
          return false;
        }
      }, {
        timeout: 2000 + +loadPropertyTimeout,
        interval: 100
      });

    } catch (error) {
      value = ui5PropertyValue ? ui5PropertyValue : innerUI5PropertyValue;
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
  async expectTextToBe (selector: any, compareValue: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
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
  async expectValueToBe (selector: any, compareValue: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
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
  async expectValueToBeDefined (selector: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    const value = await ui5.element.getValue(selector, index, timeout);
    common.assertion.expectDefined(value);
    common.assertion.expectUnequal(value, "");
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
  async expectToBeNotEnabled (selector: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
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
  async expectToBeEnabled (selector: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
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
  async expectValidationError (selector: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
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
  async expectValidationSuccess (selector: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
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
  async expectBindingPathToBe (selector: any, attribute: string, compareValue: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
    let elem: Element;
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
        timeout: 2000 + +loadPropertyTimeout,
        timeoutMsg: "Property could not be loaded, timeout was reached."
      });
    } else {
      values = await elem.getBindingProperty(attribute);
    }
    // Note: looks like we should construct values[x|0].model + '>' +  values[x|0].path
    if (Array.isArray(compareValue)) {
      const mergedArrayOfValues = values.map((value: any) => mergeModelAndPath(value));
      for (let x = 0; x < compareValue.length; x++) {
        expect(mergedArrayOfValues).toContain(compareValue[x]);
      }
    } else {
      expect(mergeModelAndPath(values[0])).toContain(compareValue);
    }

    function mergeModelAndPath(value: any) {
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
  async expectBindingContextPathToBe (selector: any, compareValue: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
    let elem: Element;
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
        timeout: 2000 + +loadPropertyTimeout,
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
  async expectToBeVisible (selector: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, loadPropertyTimeout = process.env.LOAD_PROPERTY_TIMEOUT || 10000) {
    let elem: Element;

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
        timeout: 2000 + +loadPropertyTimeout,
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
  async expectToBeVisibleInViewport (selector: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    let elem: Element;
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
  async expectToBeNotVisible (selector: any, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
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
  async expectMessageToastTextToBe (text: string, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    if (!text) {
      throw new Error("Function 'expectMessageToast' failed. Please provide the expected text as argument.");
    }
    const xpath = "//div[contains(@class, 'sapMMessageToast') and contains(string(), '" + text + "')]";
    const elem = await nonUi5.element.getByXPath(xpath, 0, timeout);
    return nonUi5.assertion.expectToBeVisible(elem);
  };


  // =================================== HELPER ===================================
  private async _getUI5Property(elem: Element, attribute: string) {
    let value = await elem.getUI5Property(attribute);
    if (typeof value === "string") {
      value = this._trimText(value);
    }
    return value;
  }

  private async _getInnerUI5Property(elem: Element, attribute: string) {
    let innerValue = await ui5.element.getInnerAttribute(elem, "data-" + attribute);
    if (typeof innerValue === "string") {
      innerValue = this._trimText(innerValue);
    }
    return innerValue;
  }

  private _trimText(text: string) {
    try {
      text = text.trim();
    } catch (e) {
      util.console.info("Removing trailing spaces didn 't work for 'text' property.");
    }
    return text;
  }

  private _throwAttributeError(attribute: string, functionName: string) {
    if (!attribute || typeof attribute !== "string") {
      throw new Error(`Function ${functionName} failed: Please check your attribute argument.`);
    }
  }

};
export default new Assertion();