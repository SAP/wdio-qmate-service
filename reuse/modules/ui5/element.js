"use strict";
/**
 * @class element
 * @memberof ui5
 */
const Element = function () {

  // =================================== WAIT ===================================
  /**
   * @function waitForAllElements
   * @memberOf ui5.element
   * @description Waits for all elements matching the given selector.
   * @param {Object} selector - The selector describing the elements.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.element.waitForAllElements(selector);
   */
  this.waitForAllElements = async function (selector, timeout = 30000) {
    return browser.uiControls(selector, timeout); //TODO: is returned required?
  };


  // =================================== GET ELEMENTS ===================================
  /**
   * @function getDisplayedElements
   * @memberOf ui5.element
   * @description Returns the visible elements with the given selector.
   * @param {Object} selector - The selector describing the elements.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object[]} - The found elements.
   * @example const elem = await ui5.element.getDisplayedElements(selector);
   */
  this.getDisplayedElements = async function (selector, timeout = 30000) {
    return browser.uiControls(selector, timeout);
  };

  /**
   * @function getDisplayedElement
   * @memberOf ui5.element
   * @description Returns the visible element.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elem = await ui5.element.getDisplayedElement(selector);
   */
  this.getDisplayedElement = async function (selector, index = 0, timeout = 30000) {
    const elems = await browser.uiControls(selector, timeout);
    if (index < 0 || elems.length <= index) {
      throw new Error(`Index out of bound. Trying to access element at index: ${index}, ` +
        `but there are only ${elems.length} element(s) that match locator ${JSON.stringify(selector)}`);
    }
    return elems[index];
  };

  /**
   * @function getDisplayedChildElement
   * @memberOf ui5.element
   * @description Returns the element with the given selector that is a child element of a given parent.
   * @param {Object} parentSelector - The selector describing the parent element.
   * @param {Object} childSelector - The selector describing the child element.
   * @param {Number} [parentIndex=0] - The index of the parent selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [childIndex=0] - The index of the child selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found child element.
   * @example const elem = await ui5.element.getDisplayedChildElement(parentSelector, childSelector);
   */
  this.getDisplayedChildElement = async function (parentSelector, childSelector, parentIndex = 0, childIndex = 0, timeout = 30000) {
    const elems = await browser.uiControls(parentSelector, timeout);
    const parentElement = elems[parentIndex];
    const childElements = await parentElement.uiControls(childSelector);
    return childElements[childIndex];
  };

  /**
   * @function getElementByText
   * @memberOf ui5.element
   * @description Returns the element with the given selector and text value.
   * @param {Object} selector - The selector describing the element.
   * @param {String} value - The text value of the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elem = await ui5.element.getElementByText(selector, "Home");
   */
  this.getElementByText = async function (selector, value, index = 0, timeout = 30000) {
    const elements = await this.getDisplayedElements(selector, timeout);
    const elementsWithText = [];
    try {
      for (const element of elements) {
        const text = await element.getText();
        if (value === text) {
          elementsWithText.push(element);
        }
      }
    } catch (error) {
      throw new Error("getElementByText(): No elements found for given text. " + error);
    }

    if (!elementsWithText.length) {
      throw new Error("getElementByText(): No elements found for given text.");
    }
    if (index >= elementsWithText.length) {
      throw new Error(`getElementByText(): Index out of bound. Cannot get element by text ${value} at index ${index}.
        There are only ${elementsWithText.length} elements with the given selector and text`);
    }
    return elementsWithText[index];
  };


  // =================================== GET VALUES ===================================
  /**
   * @function getElementId
   * @memberOf ui5.element
   * @description Returns the id of the element with the given selector.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {String} The id of the element.
   * @example const elemId = await ui5.element.getElementId(selector);
   */
  this.getElementId = async function (selector, index = 0, timeout = 30000) {
    const elem = await this.getDisplayedElement(selector, index, timeout);
    return elem.getAttribute("id");
  };

  /**
   * @function getAttributeValue
   * @memberOf ui5.element
   * @description Returns the attribute value of the passed element.
   * @param {Object} selector - The selector describing the element.
   * @param {String} attribute - The attribute of the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {String} The attribute value of the element.
   * @example const elemValue = await ui5.element.getAttributeValue(selector, "text");
   */
  this.getAttributeValue = async function (selector, attribute, index = 0, timeout = 30000) {
    try {
      const elem = await this.getDisplayedElement(selector, index, timeout);
      return String(await elem.getUI5Property(attribute));
    } catch (error) {
      throw new Error("getAttributeValue() failed with " + error);
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
      return await this.getAttributeValue(selector, "value", index, timeout);
    } catch (error) {
      throw new Error("getValue() failed with " + error);
    }
  };

  /**
   * @function getBindingValue
   * @memberOf ui5.element
   * @description Returns the value of the given attribute of the bindingContext for a specific element.
   * @param {Object} selector - The selector describing the element.
   * @param {String} attribute - The attribute of the bindingContext.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {String} The attribute value.
   * @example const elemBindingValue = await ui5.element.getBindingValue(selector, "InvoiceGrossAmount");
   */
  this.getBindingValue = async function (selector, attribute, index = 0, timeout = 30000) {
    const elem = await this.getDisplayedElement(selector, index, timeout);
    return browser.controlActionInBrowser(function (control, attr, done) {
      done(control.getBinding(attr).getValue());
    }, elem, attribute);
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


  // TODO: maybe move to userInteraction?
  // =================================== ACTIONS ===================================
  /**
   * @function scrollToElement
   * @memberOf ui5.element
   * @description Scrolls to the element with the given selector to get it into view.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time). 
   * @param {String} [alignment="center"] - Defines vertical/horizontal alignment. One of "start", "center", "end", or "nearest".
   * Affects the alignToTop parameter of scrollIntoView function. By default, it takes 'up'
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.element.scrollToElement(selector, 0, "start", 5000);
   */
  this.scrollToElement = async function (selector, index = 0, alignment = "center", timeout = 30000) {
    const elem = await this.getDisplayedElement(selector, index, timeout);
    if (elem) {
      const options = {
        "block": alignment,
        "inline": alignment
      };
      await elem.scrollIntoView(options);
    }
  };

  /**
   * @function highlightElement
   * @memberOf ui5.element
   * @description Highlights the element with the given selector.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} [duration=2000] - The duration of the highlighting (ms).
   * @param {String} [color="red"] - The color of the highlighting (CSS color).
   * @example await ui5.element.highlightElement(selector, 3000, "green");
   */
  this.highlightElement = async function (selector, duration = 2000, color = "red") {
    const elem = await this.getDisplayedElement(selector);
    if (elem) {
      await browser.executeScript(`arguments[0].style.boxShadow = 'inset 0px 0px 0px 2px ${color}'`, [elem]);
      await browser.pause(duration);
      await browser.executeScript("arguments[0].style.boxShadow = 'inherit'", [elem]);
    }
  };

};
module.exports = new Element();