/* eslint-disable no-console */
/**
* @class locator
* @memberof non_ui5.common
*/
const Locator = function () {

  async function filterElementsContainingText(elemts, text, index) {
    const elemsWithTxt = elemts.filter(async function (elem) {
      if (await elem.isDisplayed()) {
        const sText = await elem.getText();
        return sText.indexOf(text) !== -1;
      }
      return false;
    });
    return elemsWithTxt[index];
  }

  // returns an array of all visible elements of the passed elements
  async function filterElements(selector, index = 0, timeout = 60000) {
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
      throw new Error("filterElements(): Browser wait exception. " + error);
    }
  }

  /**
   * @function getDisplayedElements
   * @memberOf non_ui5.common.locator
   * @description Get all visible elements with the passed selector.
   * @param {String} selector - The selector describing the elements.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @example await non_ui5.common.locator.getDisplayedElements(".inputField");
   * @example await non_ui5.common.locator.getDisplayedElements(".button", 10000);
   */
  this.getDisplayedElements = async function (selector, timeout = 60000) {
    const elements = await this.waitForAllElements(selector, timeout);
    if (!elements) {
      throw new Error(`getDisplayedElements(): No visible element found for selector '${selector}' after ${timeout / 1000}s.`);
    }

    try {
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
      throw new Error(`getDisplayedElements(): No visible element found for selector '${selector}' after ${timeout/1000}s. ` + error);
    }
  };

  /**
   * @function waitForAllElements
   * @memberOf non_ui5.common.locator
   * @description Waits for all elements with the passed selector.
   * @param {String} selector - The selector describing the elements.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @returns {Object[]} array of all elements
   * @example await non_ui5.common.locator.waitForAllElements(".inputField");
   * @example await non_ui5.common.locator.waitForAllElements(".button", 10000);
   */
  this.waitForAllElements = async function (selector, timeout = 60000) {
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
      throw new Error("waitForAllElements(): Browser wait exception. " + error);
    }
    return elems;
  };

  /**
   * @function waitForElementIsVisible
   * @memberOf non_ui5.common.locator
   * @description Waits for an element is visible by its selector.
   * @param {String} selector - The query selector (e.g. id or class) of the element.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @example await non_ui5.common.locator.waitForElementIsVisible(".input01", 10000);
   * @example await non_ui5.common.locator.waitForElementIsVisible("#button12");
   * @example await non_ui5.common.locator.waitForElementIsVisible("p:first-child", 20000);
   */
  this.waitForElementIsVisible = async function (selector, timeout = 60000) {
    let elem = null;
    await browser.waitUntil(async function () {
      elem = await $(selector);
      if (!elem) return false;
      return elem.isDisplayed();
    }, { timeout, timeoutMsg: `waitForElementIsVisible(): Expected element not visible for selector '${selector}' after ${timeout / 1000}s` });
  };

  /**
   * @function waitForElementIsClickable
   * @memberOf non_ui5.common.locator
   * @description Waits for an element is clickable by its selector.
   * @param {String} selector - The query selector (e.g. id or class) of the element.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @example await non_ui5.common.locator.waitForElementIsClickable(".input01", 10000);
   * @example await non_ui5.common.locator.waitForElementIsClickable("#button12");
   * @example await non_ui5.common.locator.waitForElementIsClickable("p:first-child", 20000);
   */
  this.waitForElementIsClickable = async function (selector, timeout = 60000) {
    let elem = null;
    await browser.waitUntil(async function () {
      elem = await $(selector);
      if (!elem) return false;
      return await elem.isClickable();
    }, {
      timeout,
      timeoutMsg: `waitForElementIsClickable(): Timeout by waiting for element for selector '${selector}' to be clickable.`
    });
  };

  /**
   * @function waitForElementIsPresent
   * @memberOf non_ui5.common.locator
   * @description Waits for an element is present at the DOM by its selector.
   * @param {String} selector - The query selector (e.g. id or class) of the element.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @example await non_ui5.common.locator.waitForElementIsPresent(".input01", 10000);
   * @example await non_ui5.common.locator.waitForElementIsPresent("#button12");
   * @example await non_ui5.common.locator.waitForElementIsPresent("p:first-child", 20000);
   */
  this.waitForElementIsPresent = async function (selector, timeout = 60000) {
    let elem = null;
    await browser.waitUntil(async function () {
      elem = await $(selector);
      if (!elem) return false;
      return await elem.isExisting();
    }, {
      timeout,
      timeoutMsg: `waitForElementIsPresent(): Timeout by waiting for element for selector '${selector}' is present at the DOM.`
    });
  };

  /**
   * @function getElementByCss
   * @memberOf non_ui5.common.locator
   * @description Gets an element by its CSS.
   * @param {String} css - The CSS of the element (can be a class for example).
   * @param {Integer} index=0 - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @returns {Object} The found element.
   * @example let elem = await non_ui5.common.locator.getElementByCss(".button01");
   * @example let elem = await non_ui5.common.locator.getElementByCss(".input01", 1, 10000);
   */
  this.getElementByCss = async function (css, index = 0, timeout = 60000) {
    try {
      await this.waitForAllElements(css, timeout);
      return await filterElements(css, index, timeout);
    } catch (error) {
      throw new Error(`getElementByCss(): Element with CSS "${css}" not found. ${error}`);
    }
  };

  /**
   * @function getElementByCssContainingText
   * @memberOf non_ui5.common.locator
   * @description Gets an element by its CSS and text value.
   * @param {String} css - The CSS of the element (can be a class for example).
   * @param {Integer} index=0 - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {String} text="" - [OPTIONAL] The text value of the element.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @returns {Object} The found element.
   * @example let elem = await non_ui5.common.locator.getElementByCssContainingText(".input01", "Jack Jackson");
   * @example let elem = await non_ui5.common.locator.getElementByCssContainingText(".input02", "John Doe", 2, 10000);
   */
  this.getElementByCssContainingText = async function (css, text = "", index = 0, timeout = 60000) {
    try {
      const elems = await this.waitForAllElements(css, timeout);
      return await filterElementsContainingText(elems, text, index);
    } catch (error) {
      throw new Error(`getElementByCssContainingText(): Element with CSS "${css}" and text value "${text}" not found. ${error}`);
    }
  };

  /**
   * @function getElementById
   * @memberOf non_ui5.common.locator
   * @description Gets an element by its ID.
   * @param {String} id - The id of the element.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @returns {Object} The found element.
   * @example let elem = await non_ui5.common.locator.getElementById("button01");
   * @example let elem = await non_ui5.common.locator.getElementById("input01", 10000);
   */
  this.getElementById = async function (id, timeout = 60000) {
    try {
      const selector = `[id='${id}']`;
      return await filterElements(selector, 0, timeout);
    } catch (error) {
      throw new Error(`getElementById(): Element with id "${id}" not found. ${error}`);
    }
  };

  /**
   * @function getElementByClass
   * @memberOf non_ui5.common.locator
   * @description Gets an element by its ID.
   * @param {String} elemClass - The elemClass of the element.
   * @param {Integer} index=0 - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @returns {Object} The found element.
   * @example let elem = await non_ui5.common.locator.getElementByClass("button01");
   * @example let elem = await non_ui5.common.locator.getElementByClass("input01", 0, 10000);
   */
  this.getElementByClass = async function (elemClass, index = 0, timeout = 60000) {
    try {
      const selector = `[class='${elemClass}']`;
      return await filterElements(selector, index, timeout);
    } catch (error) {
      throw new Error(`getElementByClass(): Element with class "${elemClass}" not found. ${error}`);
    }
  };

  /**
   * @function getElementByName
   * @memberOf non_ui5.common.locator
   * @description Gets an element by its name.
   * @param {String} name - The name of the element (can be a class for example).
   * @param {Integer} index=0 - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @returns {Object} The found element.
   * @example let elem = await non_ui5.common.locator.getElementByName(".button01");
   * @example let elem = await non_ui5.common.locator.getElementByName(".input01", 0, 10000);
   */
  this.getElementByName = async function (name, index = 0, timeout = 60000) {
    try {
      const selector = `[name='${name}']`;
      return await filterElements(selector, index, timeout);
    } catch (error) {
      throw new Error(`getElementByName(): Element with name "${name}" not found. ${error}`);
    }
  };

  /**
   * @function getElementByXPath
   * @memberOf non_ui5.common.locator
   * @description Gets an element by its XPath.
   * @param {String} xpath - The XPath of the element.
   * @param {Integer} index=0 - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @returns {Object} The found element.
   * @example let elem = await non_ui5.common.locator.getElementByXPath("//ul/li/a");
   */
  this.getElementByXPath = async function (xpath, index = 0, timeout = 60000) {
    try {
      return await filterElements(xpath, index, timeout);
    } catch (error) {
      throw new Error(`getElementByXPath(): Element with XPath "${xpath}" not found. ${error}`);
    }
  };

  /**
   * @function getElementByChild
   * @memberOf non_ui5.common.locator
   * @description Gets a specific element by passing the child property when multiple elements have the same properties.
   * @param {String} elementSelector - The CSS identifier of the element.
   * @param {String} childSelector - The CSS identifier of the elements child.
   * @returns {Object} The found element.
   * @example let elem = await non_ui5.common.locator.getElementByChild(".form01", ".input01");
   */
  this.getElementByChild = async function (elementSelector, childSelector) {
    const elem = await this.getElementByCss(elementSelector);
    let childElem = null;
    await browser.waitUntil(async function () {
      childElem = await elem.$(childSelector);
      if (!childElem) return false;
      return await childElem.isDisplayed();
    }, {
      timeout: 60000,
      timeoutMsg: `getElementByChild(): No visible elements found for selector '${elementSelector}' and child selector '${childSelector}'`
    });
    return childElem;
  };

  /**
   * [TODO] NOT YET AVAILABLE
   * @function getChildNode
   * @memberOf non_ui5.common.locator
   * @description Gets an child element of a specific element by CSS.
   * @param {String} elementSelector - The CSS of the parent element (can be a class for example).
   * @param {String} childSelector - The CSS of the child element (can be a class for example).
   * @param {Integer} elementIndex=0 - The index of the parent element, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Integer} childIndex=0 - The index of the child element, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Integer} timeout=60000 - The timeout to wait (default value: 60 sec).
   * @returns {Object} The found element.
   * @example let elem = await non_ui5.common.locator.getChildNode("ul[class='list']", "li[class='firstItem']");
   */
  this.getChildNode = async function (elementSelector, childSelector, elementIndex = 0, childIndex = 0, timeout = 60000) {
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
      timeoutMsg: `getChildNode(): No visible elements found for elementSelector '${elementSelector}' and childSelector '${childSelector}' after ${timeout / 10000}s`
    });
    return childElem;
  };

  /**
   * @function getValue
   * @memberOf non_ui5.common.locator
   * @description Returns the attributes value of the passed element.
   * @param {Object} elem - The element.
   * @param {String} attribute - [OPTIONAL] The attribute of the element. If not passed, it will return the inner content of the element.
   * @returns {String} The attributes value of the element.
   * @example let elem = await non_ui5.common.locator.getElementById("elem01");
   * let text = await non_ui5.common.locator.getValue(elem, "text");
   * @example let elem = await non_ui5.common.locator.getElementById("elem02");
   * let innerHTML = await non_ui5.common.locator.getValue(elem, "value");
   */
  this.getValue = async function (elem, attribute) {
    if (typeof elem === "object" && elem !== null) {
      const tagName = await elem.getTagName();
      if (attribute === "value" && (tagName === "input" || tagName === "textarea")) {
        // return the element value (and not element attribute value) for
        // input and textarea "value" attribute 
        return elem.getValue();
      }
      else if (attribute && attribute !== "textContent") {
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
      throw new Error(`getValue(): Please provide an element as first argument (must be of type 'object').`);
    }
  };

  /**
   * @function scrollToElement
   * @memberOf non_ui5.common.locator
   * @description Scrolls to the passed element to get it into view.
   * @param {Object} elem - The element.
   * @param {String} alignment="center" - Defines vertical/horizontal alignment. One of "start", "center", "end", or "nearest".
   * Affects the alignToTop parameter of scrollIntoView function. By default, it takes 'up'
   * @example let elem = await non_ui5.common.locator.getElementById("footer01");
   * await non_ui5.common.locator.scrollToElement(elem);
   */
  this.scrollToElement = async function (elem, alignment = "center") {
    const options = { "block": alignment, "inline": alignment };
    await elem.scrollIntoView(options);
  };

  /**
   * @function highlightElement
   * @memberOf non_ui5.common.locator
   * @description Highlights the element with the passed selector.
   * @param {Object} elem - The element.
   * @param {Integer} duration=2000 - The duration of the highlighting (default value: 2 sec).
   * @param {String} color="red" - The color of the highlighting (default is red).
   * @example let elem = await non_ui5.common.locator.getElementById("text01");
   * await non_ui5.common.locator.highlightElement(elem);
   * @example let elem = await non_ui5.common.locator.getElementById("text01");
   * await non_ui5.common.locator.highlightElement(elem, 3000, "green");
   */
  this.highlightElement = async function (elem, duration = 2000, color = "red") {
    await browser.executeScript(`arguments[0].style.boxShadow = 'inset 0px 0px 0px 2px ${color}'`, [elem]);
    await browser.pause(duration);
    return browser.executeScript("arguments[0].style.boxShadow = 'inherit'", [elem]);
  };

  /**
   * @function switchToIframe
   * @memberOf non_ui5.common.locator
   * @description Switches to the passed iframe.
   * @param {String} selector - The element.
   * @example await non_ui5.common.locator.switchToIframe("iframe[id='frame01']");
   */
  this.switchToIframe = async function (selector) {
    await this.waitForElementIsVisible(selector);
    const frame = await $(selector);
    await browser.switchToFrame(frame);
  };

  /**
   * @function switchToDefaultContent
   * @memberOf non_ui5.common.locator
   * @description Switchs to the default content.
   * @example await non_ui5.common.locator.switchToDefaultContent();
   */
  this.switchToDefaultContent = async function () {
    await browser.switchToFrame(null);
  };


  // need to be updated - would be good to return all handles getWindowHandles() in array
  /**
   * @function waitForWindows
   * @memberOf non_ui5.common.locator
   * @example await non_ui5.common.locator.waitForWindows();
   */
  this.waitForWindows = async function (expectedWindowsNumber, retries = 50, waitInternal = 1000) {
    try {
      const windowHandles = await browser.getWindowHandles();
      //if(!windowHandles) return await this.waitForWindow(expectedWindowsNumber, retries, waitInternal);
      console.log("Windows length -->" + windowHandles.length);
      if (windowHandles.length === expectedWindowsNumber) {
        return expect(true).toEqual(true);
      }
      retries--;
      await browser.pause(waitInternal);
      if (retries < 1) {
        console.log("waitForWindows(): Timeout reached, increase the retries, window was not loaded fully");
        return expect(true).toEqual(false);
      }
      return await this.waitForWindows(expectedWindowsNumber, retries, waitInternal);
    } catch (error) {
      console.log("Get window handles error--->" + error);
    }
  };

  // better to use this.switchToWindow
  /**
   * @function switchToNewWindow
   * @memberOf non_ui5.common.locator
   * @description Switches the window.
   * @param {String} originalHandle - The main window handle.
   * @param {String} windowTitle - Window Title to be expected
   * @example await non_ui5.common.locator.switchToNewWindow(originalHandle,);
   */
  this.switchToNewWindow = async function (originalHandle, windowTitle) {
    const windowHandles = await browser.getWindowHandles();

    for (let i = 0; i < windowHandles.length; i++) {
      await (async (idx) => {
        try {
          if (windowHandles[idx] !== originalHandle) {
            try {
              console.log("Switching window" + windowHandles[idx]);
              await browser.switchToWindow(windowHandles[idx]);
              await browser.executeScript("window.focus();",[]);
              if (windowTitle) {
                const sTitle = await browser.getTitle();
                console.log("Window title-->" + sTitle + "  expected--->" + windowTitle);
                if (sTitle === windowTitle) {
                  return expect(true).toEqual(true);
                }
                throw new Error("have to retry");
              } else {
                return expect(true).toEqual(true);
              }
            } catch (error) {
              console.log("retrying to switch window");
              return await this.switchToNewWindow(originalHandle, windowTitle);
            }
          }
        } catch (e) {
          console.log("Could not get Title. Window already closed.");
        }
      })(i);
    }
  };

  /**
   * @function switchToWindow
   * @memberOf non_ui5.common.locator
   * @description Switches to the passed window.
   * @param {String} handle - The window handle.
   * @example await non_ui5.common.locator.switchToWindow(originalWindowHandle);
   */
  this.switchToWindow = async function (handle) {
    await browser.switchToWindow(handle);
  };

  /**
   * @function getCurrentWindow
   * @memberOf non_ui5.common.locator
   * @description Returns the current window handle.
   * @example await non_ui5.common.locator.getCurrentWindow();
   */
  this.getCurrentWindow = async function () {
    return browser.getWindowHandle();
  };

};
module.exports = new Locator();
