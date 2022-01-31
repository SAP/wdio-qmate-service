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
  this.waitForAll = async function (selector, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    if (!selector) {
      _throwSelectorError("waitForAll");
    }
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
  this.getAllDisplayed = async function (selector, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    if (!selector) {
      _throwSelectorError("getAllDisplayed");
    }
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
  this.getDisplayed = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    if (!selector || typeof selector !== "object") {
      _throwSelectorError("getDisplayed");
    }
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
  this.getByText = async function (selector, value, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
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

  /**
   * @function getByChild
   * @memberOf ui5.element
   * @description Gets an element by its selector and child selector.
   * Can be used as unique combination between element and child properties when multiple elements have the same properties.
   * Note: For nested selectors, all properties except of the "elementProperties" are being ignored.
   * @param {String} elementSelector - The selector describing the requested element.
   * @param {String} childSelector - The selector describing a child element of the requested element.
   * @param {Number} [index=0] - The index of the element (in case the combination applies to more than one element). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elementSelector = {
   *  "elementProperties": {...}
   * };
   * const childSelector = {
   *  "elementProperties": {...}
   * };
   * const elem = await ui5.element.getByChild(elementSelector, childSelector);
   */
  this.getByChild = async function (elementSelector, childSelector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    const selector = {
      "elementProperties": elementSelector.elementProperties,
      "descendantProperties": childSelector.elementProperties
    };
    try {
      return await this.getDisplayed(selector, index, timeout);
    } catch (e) {
      throw new Error(`Function 'getByChild' failed: ${e}`);
    }
  };

  /**
   * @function getByParent
   * @memberOf ui5.element
   * @description Gets an element by its selector and parent selector. 
   * Can be used as unique combination between element and parent properties when multiple elements have the same properties.
   * Note: For nested selectors, all properties except of the "elementProperties" are being ignored.
   * @param {String} elementSelector - The selector describing the requested element.
   * @param {String} parentSelector - The selector describing the parent element of the requested element.
   * @param {Number} [index=0] - The index of the element (in case the combination applies to more than one element). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elementSelector = {
   *  "elementProperties": {...}
   * };
   * const parentSelector = {
   *  "elementProperties": {...}
   * };
   * const elem = await ui5.element.getByParent(elementSelector, parentSelector);
   */
  this.getByParent = async function (elementSelector, parentSelector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    const selector = {
      "elementProperties": elementSelector.elementProperties,
      "ancestorProperties": parentSelector.elementProperties
    };
    try {
      return await this.getDisplayed(selector, index, timeout);
    } catch (e) {
      throw new Error(`Function 'getByParent' failed: ${e}`);
    }
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
  this.getId = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
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
  this.getPropertyValue = async function (selector, property, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    try {
      let elem = await this.getDisplayed(selector, index, timeout);
      let attrValue = await elem.getUI5Property(property);

      if (attrValue === null || attrValue === undefined || attrValue === "") {
        attrValue = await this.getInnerAttribute(elem, "data-" + property);
      }
      return attrValue;
    } catch (error) {
      throw new Error("getPropertyValue() failed with " + error);
    }
  };

  // Executes getAttribute since from Chrome Version 91 is moving completely to W3C and the function is not supported anymore
  this.getInnerAttribute = async function (elem, name) {
    return elem.getAttribute(name).then(value => {
      if (value !== null) {
        return value;
      }

      return browser.executeScript(`
        function getAttribute(webElement, attributeName) {
            return webElement.getAttribute(attributeName);        
        }`, element, name);
    });
  };

  /**
   * @function getValue
   * @memberOf ui5.element
   * @description Returns the inner value of the passed element.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {String} The value of the element.
   * @example const elemValue = await ui5.element.getValue(selector);
   */
  this.getValue = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    try {
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
  this.getBindingValue = async function (selector, bindingContext, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
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
  this.isVisible = async function (selector, index = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT | 30000) {
    try {
      const elem = await ui5.element.getDisplayed(selector, index, timeout);
      return await elem.isDisplayed();
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


  // =================================== HELPER ===================================
  function _throwSelectorError(functionName) {
    throw new Error(`Function '${functionName}' failed: Please provide a valid selector as argument.`);
  }

};
module.exports = new Element();