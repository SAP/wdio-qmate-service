"use strict";
/**
 * @class element
 * @memberof nonUi5
 */
const Element = function () {

  // =================================== WAIT ===================================
  /**
   * @function waitForAllElements
   * @memberOf nonUi5.element
   * @description Waits until all elements with the given selector are rendered.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await nonUi5.element.waitForAllElements(".inputField");
   */
  this.waitForAllElements = async function (selector, timeout = 30000) {
    let elems = null;
    try {
      await browser.waitUntil(async function () {
        elems = await $$(selector);
        if (!elems) return false;
        const count = elems.length;
        return count > 0;
      }, {
        timeout: timeout,
        timeoutMsg: `No visible elements found for selector '${selector}' after ${timeout / 1000}s`
      });
    } catch (error) {
      throw new Error("Function 'waitForAllElements' failed. Browser wait exception. " + error);
    }
    return elems;
  };

  /**
   * @function waitForElementIsPresent
   * @memberOf nonUi5.element
   * @description Waits until the element with the given selector is present.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await nonUi5.element.waitForElementIsPresent(".input01");
   * @example await nonUi5.element.waitForElementIsPresent("#button12");
   * @example await nonUi5.element.waitForElementIsPresent("p:first-child");
   */
  this.waitForElementIsPresent = async function (selector, timeout = 30000) {
    let elem = null;
    await browser.waitUntil(async function () {
      elem = await $(selector);
      if (!elem) return false;
      // eslint-disable-next-line no-return-await
      return await elem.isExisting();
    }, {
      timeout,
      timeoutMsg: `Function 'waitForElementIsPresent' failed. Timeout by waiting for element for selector '${selector}' is present at the DOM.`
    });
  };

  /**
   * @function waitForElementIsVisible
   * @memberOf nonUi5.element
   * @description Waits until the element with the given selector is visible.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await nonUi5.element.waitForElementIsVisible(".input01");
   * @example await nonUi5.element.waitForElementIsVisible("#button12");
   * @example await nonUi5.element.waitForElementIsVisible("p:first-child");
   */
  this.waitForElementIsVisible = async function (selector, timeout = 30000) {
    let elem = null;
    await browser.waitUntil(async function () {
      elem = await $(selector);
      if (!elem) return false;
      return elem.isDisplayed();
    }, {
      timeout,
      timeoutMsg: `Function 'waitForElementIsVisible' failed. Expected element not visible for selector '${selector}' after ${timeout / 1000}s`
    });
  };

  /**
   * @function waitForElementIsClickable
   * @memberOf nonUi5.element
   * @description Waits until the element with the given selector is clickable.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await nonUi5.element.waitForElementIsClickable(".input01");
   * @example await nonUi5.element.waitForElementIsClickable("#button12");
   * @example await nonUi5.element.waitForElementIsClickable("p:first-child");
   */
  this.waitForElementIsClickable = async function (selector, timeout = 30000) {
    let elem = null;
    await browser.waitUntil(async function () {
      elem = await $(selector);
      if (!elem) return false;
      // eslint-disable-next-line no-return-await
      return await elem.isClickable();
    }, {
      timeout,
      timeoutMsg: `Function 'waitForElementIsClickable' failed. Timeout by waiting for element for selector '${selector}' to be clickable.`
    });
  };


  // =================================== GET ELEMENTS ===================================
  /**
   * @function getDisplayedElements
   * @memberOf nonUi5.element
   * @description Gets all visible elements with the passed selector.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object[]} The array of elements.
   * @example await nonUi5.element.getDisplayedElements(".inputField");
   */
  this.getDisplayedElements = async function (selector, timeout = 30000) {
    try {
      await this.waitForAllElements(selector, timeout);
      const elements = await $$(selector);
      const displayedElements = [];
      for (const element of elements) {
        if (element) {
          const isElementDisplayed = await element.isDisplayed();
          if (isElementDisplayed) {
            displayedElements.push(element);
          }
        }
      }
      return displayedElements;
    } catch (error) {
      throw new Error(`Function 'getDisplayedElements' failed. No visible element found for selector '${selector}' after ${timeout / 1000}s. ` + error);
    }
  };

  /**
 * @function getAll
 * @memberOf nonUi5.element
 * @description Returns all elements found by the given selector despite visible or not.
 * @param {Object} selector - The CSS selector describing the element.
 * @param {Number} [timeout=30000] - The timeout to wait (ms).
 * @example const hiddenElements = await nonUi5.element.getAll(".sapUiInvisibleText");
 * const isPresent = await nonUi5.element.isElementPresent(hiddenElements[0]);
 * await common.assertion.expectTrue(isPresent);
 */
  this.getAll = async function (selector, timeout = 30000) {
    let elems = null;
    let count = null;
    try {
      await browser.waitUntil(async function () {
        elems = await $$(selector);
        if (!elems) return false;
        count = elems.length;
        return count > 0;
      }, {
        timeout: timeout,
        timeoutMsg: `No elements found for selector '${selector}' after ${timeout / 1000}s`
      });
    } catch (error) {
      throw new Error("Function 'getAll' failed. Browser wait exception. " + error);
    }
    return elems;
  };

  /**
   * @function getElementByCss
   * @memberOf nonUi5.element
   * @description Gets the element with the given CSS selector.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getElementByCss(".button01");
   */
  this.getElementByCss = async function (selector, index = 0, timeout = 30000) {
    try {
      await this.waitForAllElements(selector, timeout);
      return await _filterElements(selector, index, timeout);
    } catch (error) {
      throw new Error(`Function 'getElementByCss' failed. Element with CSS "${selector}" not found. ${error}`);
    }
  };

  /**
   * @function getElementByCssContainingText
   * @memberOf nonUi5.element
   * @description Gets the element with the given CSS selector containing the given text value.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {String} [text=""] - The containing text value of the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getElementByCssContainingText(".input01", "Jack Jackson");
   */
  this.getElementByCssContainingText = async function (selector, text = "", index = 0, timeout = 30000) {
    try {
      const elems = await this.getDisplayedElements(selector, timeout);
      return await _filterElementsContainingText(elems, text, index);
    } catch (error) {
      throw new Error(`Function 'getElementByCssContainingText' failed. Element with CSS "${selector}" and text value "${text}" not found. ${error}`);
    }
  };

  /**
   * @function getElementById
   * @memberOf nonUi5.element
   * @description Gets the element with the given ID.
   * @param {String} id - The id of the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getElementById("button01");
   */
  this.getElementById = async function (id, timeout = 30000) {
    try {
      const selector = `[id='${id}']`;
      return await _filterElements(selector, 0, timeout);
    } catch (error) {
      throw new Error(`Function 'getElementById' failed. Element with id "${id}" not found. ${error}`);
    }
  };

  /**
   * @function getElementByClass
   * @memberOf nonUi5.element
   * @description Gets the element with the given class.
   * @param {String} elemClass - The class describing the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getElementByClass("button01");
   */
  this.getElementByClass = async function (elemClass, index = 0, timeout = 30000) {
    try {
      const selector = `[class='${elemClass}']`;
      return await _filterElements(selector, index, timeout);
    } catch (error) {
      throw new Error(`Function 'getElementByClass' failed. Element with class "${elemClass}" not found. ${error}`);
    }
  };

  /**
   * @function getElementByName
   * @memberOf nonUi5.element
   * @description Gets the element with the given name.
   * @param {String} name - The name attribute of the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getElementByName(".button01");
   */
  this.getElementByName = async function (name, index = 0, timeout = 30000) {
    try {
      const selector = `[name='${name}']`;
      return await _filterElements(selector, index, timeout);
    } catch (error) {
      throw new Error(`Function 'getElementByName' failed. Element with name "${name}" not found. ${error}`);
    }
  };

  /**
   * @function getElementByXPath
   * @memberOf nonUi5.element
   * @description Gets the element with the given XPath.
   * @param {String} xpath - The XPath describing the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getElementByXPath("//ul/li/a");
   */
  this.getElementByXPath = async function (xpath, index = 0, timeout = 30000) {
    try {
      return await _filterElements(xpath, index, timeout);
    } catch (error) {
      throw new Error(`Function 'getElementByXPath' failed. Element with XPath "${xpath}" not found. ${error}`);
    }
  };

  /**
   * @function getElementByChild
   * @memberOf nonUi5.element
   * @description Gets an element with the given CSS selector and child selector. Can be used when multiple elements have the same properties.
   * @param {String} elementSelector - The CSS selector describing the element.
   * @param {String} childSelector - The CSS selector describing the elements child.
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getElementByChild(".form01", ".input01");
   */
  this.getElementByChild = async function (elementSelector, childSelector) {
    let elem;
    let childElem = null;
    try {
      elem = await this.getElementByCss(elementSelector);
    } catch (error) {
      throw new Error("Function 'getElementByChild' failed.", error);
    }
    await browser.waitUntil(async function () {
      childElem = await elem.$(childSelector);
      if (!childElem) return false;
      // eslint-disable-next-line no-return-await
      return await childElem.isDisplayed();
    }, {
      timeout: 30000,
      timeoutMsg: `Function 'getElementByChild' failed. No visible elements found for selector '${elementSelector}' and child selector '${childSelector}'`
    });
    return childElem;
  };


  // =================================== NODES ===================================
  /**
   * @function getChildNode
   * @memberOf nonUi5.element
   * @description Gets an child element of a specific element by CSS.
   * @param {String} elementSelector - The CSS of the parent element (can be a class for example).
   * @param {String} childSelector - The CSS of the child element (can be a class for example).
   * @param {Integer} [elementIndex=0] - The index of the element (in case there are more than one elements visible at the same time). 
   * @param {Integer} [childIndex=0] - The index of the child element (in case there are more than one child elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getChildNode("ul[class='list']", "li[class='firstItem']");
   */
  this.getChildNode = async function (elementSelector, childSelector, elementIndex = 0, childIndex = 0, timeout = 30000) {
    const elem = await this.getElementByCss(elementSelector, elementIndex, timeout);
    let childElem = null;
    await browser.waitUntil(async function () {
      const elems = await elem.$$(childSelector);
      if (!elems) return false;
      const count = elems.length;
      if (count > 0 && count > childIndex) {
        const isVisible = await elems[childIndex].isDisplayed();
        if (isVisible) {
          childElem = elems[childSelector];
        }
        return isVisible;
      }
      return false;
    }, {
      timeout: timeout,
      timeoutMsg: `Function 'getChildNode' failed. No visible elements found for elementSelector '${elementSelector}' and childSelector '${childSelector}' after ${timeout / 10000}s`
    });
    return childElem;
  };

  // =================================== GET VALUES ===================================
  /**
   * @function isVisible
   * @memberOf nonUi5.element
   * @description Returns a boolean if the element is visible to the user.
   * @param {Object} element - The element.
   * @returns {Boolean} Returns true or false.
   * @example const elem = await nonUi5.element.getElementById("button01");
   * await nonUi5.element.isVisible(elem);
   */
  this.isVisible = async function (element) {
    return element.isDisplayedInViewport();
  };

  /**
   * @function isElementPresent
   * @memberOf nonUi5.element
   * @description Returns a boolean if the element is present at the DOM or not.
   * @param {Object} elem - The element.
   * @returns {Boolean} Returns true or false.
   * @example const elem = await nonUi5.element.getElementById("button01");
   * await nonUi5.element.isElementPresent(elem);
   */
  this.isElementPresent = async function (elem) {
    return elem.isExisting();
  };

  /**
   * @function isPresentByCss
   * @memberOf nonUi5.element
   * @description Returns a boolean if the element is present at the DOM or not.
   * @param {String} css - The CSS selector describing the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {boolean} Returns true or false.
   * @example await nonUi5.element.isPresentByCss(".button01");
   */
  this.isPresentByCss = async function (css, index = 0, timeout = 30000) {
    try {
      let elements;

      await browser.waitUntil(async function () {
        elements = await $$(css);
        return elements.length > index;
      }, {
        timeout: timeout
      });

      return elements[index].isExisting();
    } catch (error) {
      return false;
    }
  };

  /**
   * @function isPresentByXPath
   * @memberOf nonUi5.element
   * @description returns a boolean if the element is present at the DOM or not.
   * @param {String} xpath - The XPath describing the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time). 
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {boolean}
   * @example await nonUi5.element.isPresentByXPath(".//*[text()='Create']");
   */
  this.isPresentByXPath = async function (xpath, index = 0, timeout = 30000) {
    return this.isPresentByCss(xpath, index, timeout);
  };

  /**
   * @function getAttributeValue
   * @memberOf nonUi5.element
   * @description Returns the attributes value of the passed element.
   * @param {Object} elem - The element.
   * @param {String} [attribute] - The attribute of the element. Leave empty to return the inner HTML value of the element.
   * @returns {String} The attributes value of the element.
   * @example const elem = await nonUi5.element.getElementById("elem01");
   * const text = await nonUi5.element.getAttributeValue(elem, "text");
   * @example const elem = await nonUi5.element.getElementById("elem02");
   * const innerHTML = await nonUi5.element.getAttributeValue(elem);
   */
  this.getAttributeValue = async function (elem, attribute) {
    if (typeof elem === "object" && elem !== null) {
      const tagName = await elem.getTagName();
      if (attribute === "value" && (tagName === "input" || tagName === "textarea")) {
        // return the element value (and not element attribute value) for input and textarea "value" attribute 
        return elem.getValue();
      } else if (attribute && attribute !== "textContent") {
        return elem.getAttribute(attribute);
      } else {
        if (attribute === "textContent") {
          // return attribute value if present
          const attributeValue = await elem.getAttribute(attribute);
          if (attributeValue !== null) return attributeValue;
        }
        const [value, text] = await Promise.all([
          elem.getValue(),
          elem.getText()
        ]);
        return value || text;
      }
    } else {
      throw new Error(`Function 'getAttributeValue' failed. Please provide an element as first argument (must be of type 'object').`);
    }
  };

  /**
   * @function getValue
   * @memberOf nonUi5.element
   * @description Returns the value of the passed element.
   * @param {Object} elem - The element.
   * @returns {String} The  value of the element.
   * @example const elem = await nonUi5.element.getElementById("elem02");
   * const innerHTML = await nonUi5.element.getValue(elem);
   */
  this.getValue = async function (elem) {
    try {
      // eslint-disable-next-line no-return-await
      return await this.getAttributeValue(elem);
    } catch (error) {
      throw new Error(`Function 'getValue' failed: ${error}`);
    }
  };


  // =================================== ACTIONS ===================================
  /**
   * @function highlightElement
   * @memberOf nonUi5.element
   * @description Highlights the passed element.
   * @param {Object} elem - The element.
   * @param {Integer} [duration=2000] - The duration of the highlighting (ms).
   * @param {String} [color="red"] - The color of the highlighting (CSS value).
   * @example const elem = await nonUi5.element.getElementById("text01");
   * await nonUi5.element.highlightElement(elem);
   * @example const elem = await nonUi5.element.getElementById("text01");
   * await nonUi5.element.highlightElement(elem, 3000, "green");
   */
  this.highlightElement = async function (elem, duration = 2000, color = "red") {
    await browser.executeScript(`arguments[0].style.boxShadow = 'inset 0px 0px 0px 2px ${color}'`, [elem]);
    await browser.pause(duration);
    return browser.executeScript("arguments[0].style.boxShadow = 'inherit'", [elem]);
  };


  // =================================== FRAMES ===================================
  /**
   * @function switchToIframe
   * @memberOf nonUi5.element
   * @description Switches to the passed iframe.
   * @param {String} selector - The CSS selector describing the iframe element.
   * @example await nonUi5.element.switchToIframe("iframe[id='frame01']");
   */
  this.switchToIframe = async function (selector) {
    await this.waitForElementIsVisible(selector);
    const frame = await $(selector);
    await browser.switchToFrame(frame);
  };

  /**
   * @function switchToDefaultContent
   * @memberOf nonUi5.element
   * @description Switches to the default content of the HTML page.
   * @example await nonUi5.element.switchToDefaultContent();
   */
  this.switchToDefaultContent = async function () {
    await browser.switchToFrame(null);
  };



  // =================================== HELPER ===================================
  async function _filterElementsContainingText(elems, text, index) {
    const elemsWithTxt = [];
    for (const elem of elems) {
      const elementText = await elem.getText();
      if (elementText.indexOf(text) !== -1) {
        elemsWithTxt.push(elem);
      }
    }
    if (elemsWithTxt.length > 0 && index < elemsWithTxt.length) {
      return elemsWithTxt[index];
    } else {
      throw new Error(`No elements containing text ${text} and index ${index}`);
    }
  }

  async function _filterElements(selector, index = 0, timeout = 30000) {
    let elems = null;
    let selectedElement = null;
    try {
      await browser.waitUntil(async function () {
        elems = await $$(selector);
        if (!elems) return false;
        const displayedElements = [];
        for (const element of elems) {
          if (element) {
            const isElementDisplayed = await element.isDisplayed();
            if (isElementDisplayed) {
              displayedElements.push(element);
            }
          }
        }
        const count = displayedElements.length;
        if (count > 0 && count > index) {
          selectedElement = displayedElements[index];
          return true;
        } else {
          return false;
        }
      }, {
        timeout: timeout,
        timeoutMsg: `No visible elements found for selector '${selector}' after ${timeout / 1000}s`
      });
      return selectedElement;
    } catch (error) {
      throw new Error("Function '_filterElements' failed. Browser wait exception. " + error);
    }
  }

};
module.exports = new Element();