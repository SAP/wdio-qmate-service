/**
* @class locator
* @memberof ui5.common
*/
const Locator = function () {
  /**
  * @function waitForAllElements
  * @memberOf ui5.common.locator
  * @description Waits for all elements with the passed selector.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} timeout=3000 - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.locator.waitForAllElements(selector, 10000);
  */
  this.waitForAllElements = async function (selector, timeout = 30000) {
    return browser.uiControls(selector, timeout);
  };

  /**
   * @function getDisplayedElements
   * @memberOf ui5.common.locator
   * @description Returns the visible elements.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} timeout=3000 - The timeout to wait (default value: 30 sec).
   * @returns {Object}[] - The found elements.
   * @example let elem = await ui5.common.locator.getDisplayedElements(selector, 10000);
   */
  this.getDisplayedElements = async function (selector, timeout = 30000) {
    return browser.uiControls(selector, timeout);
  };

  /**
  * @function getDisplayedElement
  * @memberOf ui5.common.locator
  * @description Returns the visible element.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} index=0 - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout=3000 - The timeout to wait (default value: 30 sec).
  * @returns {Object} The found element.
  * @example let elem = await ui5.common.locator.getDisplayedElement(selector, 0, 10000);
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
   * @memberOf ui5.common.locator
   * @description Returns element that is a child element of a given parent
   * @param {Object} parentSelector - The selector describing the parent element
   * @param {Object} childSelector - The selector describing the child element
   * @param {Number} parentIndex=0 - The index for the parent element, in case there is more than one
   *  element visible at the same time. By default, it takes 0
   * @param {Number} childIndex=0 - The index for the child element, in case there is more than one
   *  element visible at the same time. By default, it takes 0
   * @param {Number} timeout=30000 - The timeout to wait (default value: 30 sec).
   * @returns {Object} The found child element.
   * @example let elem = await ui5.common.locator.getDisplayedChildElement(parentDelector, childSelector, 0, 0, 10000);
   */
  this.getDisplayedChildElement = async function (parentSelector, childSelector, parentIndex = 0, childIndex = 0, timeout = 30000) {
    const elems = await browser.uiControls(parentSelector, timeout);
    const parentElement = elems[parentIndex];
    const childElements = await parentElement.uiControls(childSelector);
    return childElements[childIndex];
  };

  /**
  * @function getElementByText
  * @memberOf ui5.common.locator
  * @description Returns the element containing the passed text value.
  * @param {Object} selector - The selector describing the element.
  * @param {String} value - The text value of the element.
  * @param {Number} index=0 - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout=30000 - The timeout to wait (default value: 30 sec).
  * @returns {Object} The found element.
  * @example let elem = await ui5.common.locator.getElementByText(selector, "Home");
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

    if (!elementsWithText.length) { // Array of elements is empty
      throw new Error("getElementByText(): No elements found for given text.");
    }
    if (index >= elementsWithText.length) {
      throw new Error(`getElementByText(): Index out of bound. Cannot get element by text ${value} at index ${index}.
        There are only ${elementsWithText.length} elements with the given selector and text`);
    }
    return elementsWithText[index];
  };

  /**
  * @function getElementId
  * @memberOf ui5.common.locator
  * @description Returns the id of the element.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} index=0 - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout=30000 - The timeout to wait (default value: 30 sec).
  * @returns {String} The id of the element.
  * @example let elemId = await ui5.common.locator.getElementId(selector);
  */
  this.getElementId = async function (selector, index = 0, timeout = 30000) {
    const elem = await this.getDisplayedElement(selector, index, timeout);
    return elem.getAttribute("id");
  };

  /**
  * @function getBindingValue
  * @memberOf ui5.common.locator
  * @description Returns the value of attribute of the bindingContext of the element.
  * @param {Object} selector - The selector describing the element.
  * @param {String} attribute - The attribute of the bindingCotext of the element.
  * @param {Number} index=0 - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout=30000 - The timeout to wait (default value: 30 sec).
  * @returns {String} The attribute value of the element.
  * @example let elemValue = await ui5.common.locator.getBindingValue(selector, "InvoiceGrossAmount");
  */
  this.getBindingValue = async function (selector, attribute, index = 0, timeout = 30000) {
    const elem = await this.getDisplayedElement(selector, index, timeout);
    return browser.controlActionInBrowser(function (control, attr, done) {
      done(control.getBinding(attr).getValue());
    }, elem, attribute);
  };

  /**
  * @function getValue
  * @memberOf ui5.common.locator
  * @description Returns the attribute value of the passed element.
  * @param {Object} selector - The selector describing the element.
  * @param {String} attribute - The attribute of the element.
  * @param {Number} index=0 - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout=30000 - The timeout to wait (default value: 30 sec).
  * @returns {String} The attribute value of the element.
  * @example let elemValue = await ui5.common.locator.getValue(selector, "text");
  */
  this.getValue = async function (selector, attribute, index = 0, timeout = 30000) {
    try {
      const elem = await this.getDisplayedElement(selector, index, timeout);
      return String(await elem.getUI5Property(attribute));
    } catch (error) {
      throw new Error("getValue() failed with " + error);
    }
  };

  /**
  * @function scrollToElement
  * @memberOf ui5.common.locator
  * @description Scrolls to the passed element to get it into view.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} index=0 - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {String} alignment="center" - Defines vertical/horizontal alignment. One of "start", "center", "end", or "nearest".
  * Affects the alignToTop parameter of scrollIntoView function. By default, it takes 'up'
  * @param {Number} timeout=30000 - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.locator.scrollToElement(selector, 0, "start", 5000);
  */
  this.scrollToElement = async function (selector, index = 0, alignment = "center", timeout = 30000) {
    const elem = await this.getDisplayedElement(selector, index, timeout);
    if (elem) {
      const options = { "block": alignment, "inline": alignment };
      await elem.scrollIntoView(options);
    }
  };

  /**
  * @function highlightElement
  * @memberOf ui5.common.locator
  * @description Highlights the element with the passed selector.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} duration=2000 - The duration of the highlighting (default value: 2 sec).
  * @param {String} color="red" - The color of the highlighting (default is red).
  * @example await ui5.common.locator.highlightElement(selector);
  * @example await ui5.common.locator.highlightElement(selector, 3000, "green");
  */
  this.highlightElement = async function (selector, duration = 2000, color = "red") {
    const elem = await this.getDisplayedElement(selector);
    if (elem) {
      await browser.executeScript(`arguments[0].style.boxShadow = 'inset 0px 0px 0px 2px ${color}'`, [elem]);
      await browser.pause(duration);
      await browser.executeScript("arguments[0].style.boxShadow = 'inherit'", [elem]);
    }
  };

  /**
   * @function isVisible
   * @memberOf ui5.common.locator
   * @description Returns a boolean whether the element is visible or not.
   * @param {Object} selector - The selector describing the element.
   * @param {Integer} index - The index of the selector, in case there are more than
   * @param {Integer} timeout - The timeout to wait (default value: 30 sec).
   * @returns {Boolean} Returns bool value 'true' or 'false' if the element is visible or not.
   * @example let isElementVisible = await ui5.common.locator.isVisible(selector);
   * @example let isElementVisible = await ui5.common.locator.isVisible(selector, 0, 2000);
   */
  this.isVisible = async function (selector, index = 0, timeout = 30000) {
    try {
      await ui5.common.assertion.expectToBeVisible(selector, index, timeout);
      return true;
    } catch (err) {
      return false;
    }
  };
};
module.exports = new Locator();
