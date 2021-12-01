"use strict";
/**
 * @class element
 * @memberof ui5
 */
const Element = function () {

  // =================================== WAIT ===================================
  /**
   * @function waitForAll
   * @memberOf ui5.element
   * @description Waits for all elements matching the given selector.
   * @param {Object} selector - The selector describing the elements.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.element.waitForAll(selector);
   */
  this.waitForAll = async function (selector, timeout = 30000) {
    try {
      await browser.uiControls(selector, timeout);
    } catch (e) {
      throw new Error(`Function 'waitForAll' failed: ${e}`);
    }
  };

  
  // =================================== GET ELEMENTS ===================================
  /**
   * @function getAllDisplayed
   * @memberOf ui5.element
   * @description Returns the visible elements with the given selector.
   * @param {Object} selector - The selector describing the elements.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object[]} - The found elements.
   * @example const elem = await ui5.element.getAllDisplayed(selector);
   */
  this.getAllDisplayed = async function (selector, timeout = 30000) {
    try {
      return await browser.uiControls(selector, timeout);
    } catch (e) {
      throw new Error(`Function 'getAllDisplayed' failed: ${e}`);
    }
  };

  /**
   * @function getDisplayed
   * @memberOf ui5.element
   * @description Returns the visible element.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elem = await ui5.element.getDisplayed(selector);
   */
  this.getDisplayed = async function (selector, index = 0, timeout = 30000) {
    const elems = await browser.uiControls(selector, timeout);
    if (index < 0 || elems.length <= index) {
      throw new Error(`Index out of bound. Trying to access element at index: ${index}, ` +
        `but there are only ${elems.length} element(s) that match locator ${JSON.stringify(selector)}`);
    }
    return elems[index];
  };

  /**
   * @function getByText
   * @memberOf ui5.element
   * @description Returns the element with the given selector and text value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} value - The text value of the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elem = await ui5.element.getByText(selector, "Home");
   */
  this.getByText = async function (selector, value, index = 0, timeout = 30000) {
    const elements = await this.getAllDisplayed(selector, timeout);
    const elementsWithText = [];
    try {
      for (const element of elements) {
        const text = await element.getText();
        if (value === text) {
          elementsWithText.push(element);
        }
      }
    } catch (error) {
      throw new Error("getByText(): No elements found for given text. " + error);
    }

    if (!elementsWithText.length) {
      throw new Error("getByText(): No elements found for given text.");
    }
    if (index >= elementsWithText.length) {
      throw new Error(`getByText(): Index out of bound. Cannot get element by text ${value} at index ${index}.
        There are only ${elementsWithText.length} elements with the given selector and text`);
    }
    return elementsWithText[index];
  };


  // =================================== GET VALUES ===================================
  /**
   * @function getId
   * @memberOf ui5.element
   * @description Returns the id of the element with the given selector.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {String} The id of the element.
   * @example const elemId = await ui5.element.getId(selector);
   */
  this.getId = async function (selector, index = 0, timeout = 30000) {
    const elem = await this.getDisplayed(selector, index, timeout);
    return elem.getAttribute("id");
  };

  /**
   * @function getPropertyValue
   * @memberOf ui5.element
   * @description Returns the UI5 property value of the passed element.
   * @param {Object} selector - The selector describing the element.
   * @param {String} property - The property of the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {String} The property value of the element.
   * @example const elemValue = await ui5.element.getPropertyValue(selector, "text");
   */
  this.getPropertyValue = async function (selector, property, index = 0, timeout = 30000) {
    try {
      const elem = await this.getDisplayed(selector, index, timeout);
      return String(await elem.getUI5Property(property));
    } catch (error) {
      throw new Error("getPropertyValue() failed with " + error);
    }
  };

  /**
   * @function getValue
   * @memberOf ui5.element
   * @description Returns the value of the passed element.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {String} The value of the element.
   * @example const elemValue = await ui5.element.getValue(selector);
   */
  this.getValue = async function (selector, index = 0, timeout = 30000) {
    try {
      // eslint-disable-next-line no-return-await
      return await this.getPropertyValue(selector, "value", index, timeout);
    } catch (error) {
      throw new Error("getValue() failed with " + error);
    }
  };

  /**
   * @function getBindingValue
   * @memberOf ui5.element
   * @description Returns the value of the given binding property for a specific element.
   * @param {Object} selector - The selector describing the element.
   * @param {String} bindingContext - The binding property to retrieve.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {String} The binding property value.
   * @example const elemBindingValue = await ui5.element.getBindingValue(selector, "InvoiceGrossAmount");
   */
  this.getBindingValue = async function (selector, bindingContext, index = 0, timeout = 30000) {
    const elem = await this.getDisplayed(selector, index, timeout);
    return browser.controlActionInBrowser(function (control, property, done) {
      done(control.getBinding(property).getValue());
    }, elem, bindingContext);
  };

  /**
   * @function isVisible
   * @memberOf ui5.element
   * @description Determines if the element is visible.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Boolean} The bool value 'true' or 'false' if the element is visible or not.
   * @example const isVisible = await ui5.element.isVisible(selector);
   */
  this.isVisible = async function (selector, index = 0, timeout = 30000) {
    try {
      await ui5.assertion.expectToBeVisible(selector, index, timeout);
      return true;
    } catch (err) {
      return false;
    }
  };


  // =================================== ACTIONS ===================================
  /**
   * @function highlight
   * @memberOf ui5.element
   * @description Highlights the element with the given selector.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [duration=2000] - The duration of the highlighting (ms).
   * @param {String} [color="red"] - The color of the highlighting (CSS color).
   * @example await ui5.element.highlight(selector, 3000, "green");
   */
  this.highlight = async function (selector, duration = 2000, color = "red") {
    const elem = await this.getDisplayed(selector);
    if (elem) {
      await browser.executeScript(`arguments[0].style.boxShadow = 'inset 0px 0px 0px 2px ${color}'`, [elem]);
      await browser.pause(duration);
      await browser.executeScript("arguments[0].style.boxShadow = 'inherit'", [elem]);
    }
  };

};
module.exports = new Element();