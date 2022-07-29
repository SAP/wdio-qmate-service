import { Element } from "../../../../@types/wdio";

/**
 * @class element
 * @memberof nonUi5
 */
export class ElementModule {
  // =================================== WAIT ===================================
  /**
   * @function waitForAll
   * @memberOf nonUi5.element
   * @description Waits until all elements with the given selector are rendered. Will fail if no element is found.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await nonUi5.element.waitForAll(".inputField");
   */
  async waitForAll(selector: any, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000): Promise<void> {
    try {
      await this._waitForStabilization(selector, timeout);
      await $(selector).waitForExist();
    } catch (error) {
      throw new Error(`Function 'waitForAll' failed: ${error}`);
    }
  }

  /**
   * @function waitToBePresent
   * @memberOf nonUi5.element
   * @description Waits until the element with the given selector is present.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await nonUi5.element.waitToBePresent(".input01");
   * @example await nonUi5.element.waitToBePresent("#button12");
   * @example await nonUi5.element.waitToBePresent("p:first-child");
   */
  async waitToBePresent(selector: any, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000): Promise<void> {
    try {
      await $(selector).waitForExist({ timeout: timeout });
    } catch (error) {
      throw new Error(`Function 'waitToBePresent' failed: ${error}`);
    }
  }

  /**
   * @function waitToBeVisible
   * @memberOf nonUi5.element
   * @description Waits until the element with the given selector is visible.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await nonUi5.element.waitToBeVisible(".input01");
   * @example await nonUi5.element.waitToBeVisible("#button12");
   * @example await nonUi5.element.waitToBeVisible("p:first-child");
   */
  async waitToBeVisible(selector: any, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    try {
      await $(selector).waitForDisplayed({ timeout: timeout });
    } catch (error) {
      throw new Error(`Function 'waitToBeVisible' failed: ${error}`);
    }
  }

  /**
   * @function waitToBeClickable
   * @memberOf nonUi5.element
   * @description Waits until the element with the given selector is clickable.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await nonUi5.element.waitToBeClickable(".input01");
   * @example await nonUi5.element.waitToBeClickable("#button12");
   * @example await nonUi5.element.waitToBeClickable("p:first-child");
   */
  async waitToBeClickable(selector: any, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    try {
      await $(selector).waitForClickable({ timeout: timeout });
    } catch (error) {
      throw new Error(`Function 'waitToBeClickable' failed: ${error}`);
    }
  }

  // =================================== GET ELEMENTS ===================================
  /**
   * @function getAllDisplayed
   * @memberOf nonUi5.element
   * @description Gets all visible elements with the passed selector.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {Object[]} The array of elements.
   * @example await nonUi5.element.getAllDisplayed(".inputField");
   */
  async getAllDisplayed(selector: any, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000): Promise<Element[]> {
    try {
      await this.waitForAll(selector, timeout);
      const elems: Element[] = await $$(selector);
      return elems.filter(async (elem) => await elem.isDisplayed());
    } catch (error) {
      throw new Error(`Function 'getAllDisplayed' failed. No visible element(s) found for selector '${selector}' after ${+timeout / 1000}s. ` + error);
    }
  }

  /**
   * @function getAll
   * @memberOf nonUi5.element
   * @description Returns all elements found by the given selector despite visible or not.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example const hiddenElements = await nonUi5.element.getAll(".sapUiInvisibleText");
   * const isPresent = await nonUi5.element.isPresent(hiddenElements[0]);
   * await common.assertion.expectTrue(isPresent);
   */
  async getAll(selector: any, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000): Promise<Element[]> {
    try {
      await this.waitForAll(selector, timeout);
      return await $$(selector);
    } catch (error) {
      throw new Error(`Function 'getAll' failed. No element(s) found for selector '${selector}' after ${+timeout / 1000}s. ` + error);
    }
  }

  /**
   * @function getByCss
   * @memberOf nonUi5.element
   * @description Gets the element with the given CSS selector.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time).
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Boolean} [includeHidden=false] - Specifies if hidden elements are also considered. By default it checks only for visible ones.
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getByCss(".button01");
   */
  async getByCss(selector: any, index: number = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, includeHidden: boolean = false): Promise<Element> {
    try {
      return await this._getAndFilterElementBySelector(selector, index, timeout, includeHidden);
    } catch (error) {
      throw new Error(`Function 'getByCss' failed. Element with CSS '${selector}' not found. ${error}`);
    }
  }

  /**
   * @function getByCssContainingText
   * @memberOf nonUi5.element
   * @description Gets the element with the given CSS selector containing the given text value.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {String} [text=""] - The containing text value of the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time).
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Boolean} [includeHidden=false] - Specifies if hidden elements are also considered. By default it checks only for visible ones.
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getByCssContainingText(".input01", "Jack Jackson");
   */
  async getByCssContainingText(selector: any, text: string = "", index: number = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, includeHidden: boolean = false): Promise<Element> {
    try {
      await this.waitForAll(selector, timeout);
      const elems: Element[] = await $$(selector);
      const filteredElems = await this._filterByText(elems, text);
      if (includeHidden) {
        return filteredElems[index];
      } else {
        const visibleElems = filteredElems.filter(async (elem) => await elem.isDisplayed());
        return visibleElems[index];
      }
    } catch (error) {
      throw new Error(`Function 'getByCssContainingText' failed. Element with CSS '${selector}' and text '${text}' not found. ${error}`);
    }
  }

  /**
   * @function getById
   * @memberOf nonUi5.element
   * @description Gets the element with the given ID.
   * @param {String} id - The id of the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Boolean} [includeHidden=false] - Specifies if the function will check for the elements visibility.
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getById("button01");
   */
  async getById(id: string, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, includeHidden: boolean = false): Promise<Element> {
    try {
      const selector = `[id='${id}']`;
      if (includeHidden) {
        await this.waitToBePresent(selector, timeout);
        return await $(selector);
      } else {
        await this.waitToBeVisible(selector, timeout);
        return await $(selector);
      }
    } catch (error) {
      throw new Error(`Function 'getById' failed. Element with id '${id}' not found. ${error}`);
    }
  }

  /**
   * @function getByClass
   * @memberOf nonUi5.element
   * @description Gets the element with the given class.
   * @param {String} elemClass - The class describing the element
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time).
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Boolean} [includeHidden=false] - Specifies if hidden elements are also considered. By default it checks only for visible ones.
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getByClass("button01");
   * const elem = await nonUi5.element.getByClass("sapMIBar sapMTB sapMTBNewFlex sapContrastPlus");
   */
  async getByClass(elemClass: string, index: number = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, includeHidden: boolean = false): Promise<Element> {
    try {
      const selector = `[class*='${elemClass}']`;
      return await this._getAndFilterElementBySelector(selector, index, timeout, includeHidden);
    } catch (error) {
      throw new Error(`Function 'getByClass' failed. Element with id '${elemClass}' not found. ${error}`);
    }
  }

  /**
   * @function getByName
   * @memberOf nonUi5.element
   * @description Gets the element with the given name.
   * @param {String} name - The name attribute of the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time).
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Boolean} [includeHidden=false] - Specifies if hidden elements are also considered. By default it checks only for visible ones.
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getByName(".button01");
   */
  async getByName(name: string, index: number = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, includeHidden: boolean = false): Promise<Element> {
    try {
      const selector = `[name='${name}']`;
      return await this._getAndFilterElementBySelector(selector, index, timeout, includeHidden);
    } catch (error) {
      throw new Error(`Function 'getByName' failed. Element with name '${name}' not found. ${error}`);
    }
  }

  /**
   * @function getByXPath
   * @memberOf nonUi5.element
   * @description Gets the element with the given XPath.
   * @param {String} xpath - The XPath describing the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time).
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Boolean} [includeHidden=false] - Specifies if hidden elements are also considered. By default it checks only for visible ones.
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getByXPath("//ul/li/a");
   */
  async getByXPath(xpath: string, index: number = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, includeHidden: boolean = false) {
    try {
      return await this.getByCss(xpath, index, timeout, includeHidden);
    } catch (error) {
      throw new Error(`Function 'getByXPath' failed. Element with XPath '${xpath}' not found. ${error}`);
    }
  }

  /**
   * @function getByChild
   * @memberOf nonUi5.element
   * @description Gets an element by its selector and child selector. Can be used when multiple elements have the same properties.
   * @param {String} elementSelector - The CSS selector describing the element.
   * @param {String} childSelector - The CSS selector describing the child element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time).
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Boolean} [includeHidden=false] - Specifies if hidden elements are also considered. By default it checks only for visible ones.
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getByChild(".form01", ".input01");
   */
  async getByChild(elementSelector: any, childSelector: any, index: number = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, includeHidden: boolean = false): Promise<Element> {
    let elemsWithChild: Element[];

    try {
      if (includeHidden) {
        const elems = await this.getAll(elementSelector, timeout);
        elemsWithChild = elems.filter(async (elem) => await (await elem.$(childSelector)).isExisting());
      } else {
        const elems = await this.getAllDisplayed(elementSelector, timeout);
        elemsWithChild = elems.filter(async (elem) => await (await elem.$(childSelector)).isDisplayed());
      }
    } catch (error) {
      throw new Error(`Function 'getByChild' failed. No element found for selector: '${elementSelector}'.`);
    }

    if (elemsWithChild.length === 0) {
      throw new Error(`Function 'getByChild' failed. The found element(s) with the given selector do(es) not have any child with selector '${childSelector}'.`);
    } else {
      return elemsWithChild[index];
    }
  }

  /**
   * @function getByParent
   * @memberOf nonUi5.element
   * @description Gets an element by its selector and parent selector. Can be used when multiple elements have the same properties.
   * @param {String} elementSelector - The CSS selector describing the element.
   * @param {String} parentSelector - The CSS selector describing the parent element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time).
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @param {Boolean} [includeHidden=false] - Specifies if hidden elements are also considered. By default it checks only for visible ones.
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getByParent(".form01", ".input01");
   */
  async getByParent(elementSelector: any, parentSelector: any, index: number = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, includeHidden: boolean = false): Promise<Element> {
    let elemsWithParent: Element[];

    try {
      if (includeHidden) {
        const parentElems = await this.getAll(elementSelector, timeout);
        elemsWithParent = parentElems.filter(async (elem) => await (await elem.$(elementSelector)).isExisting());
      } else {
        const parentElems = await this.getAllDisplayed(elementSelector, timeout);
        elemsWithParent = parentElems.filter(async (elem) => await (await elem.$(elementSelector)).isDisplayed());
      }
    } catch (error) {
      throw new Error(`Function 'getByParent' failed. No parent element found for selector: '${parentSelector}'. ${error}`);
    }

    if (elemsWithParent.length === 0) {
      throw new Error(`Function 'getByParent' failed. No visible elements found for selector '${elementSelector}' and parent selector '${parentSelector}'.`);
    } else {
      return elemsWithParent[index];
    }
  }

  // =================================== GET VALUES ===================================
  /**
   * @function isVisible
   * @memberOf nonUi5.element
   * @description Returns a boolean if the element is visible to the user.
   * @param {Object} element - The element.
   * @param {Boolean} [strict=true] - If strict mode is enabled it will only return "true" if the element is visible on the page and within the viewport.
   * If disabled, it will be sufficient if the element is visible on the page but not inside the current viewport.
   * @returns {Boolean} Returns true or false.
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.element.isVisible(elem);
   */
  async isVisible(element: Element, strict: boolean = true): Promise<boolean> {
    try {
      if (strict) {
        return element.isDisplayedInViewport();
      } else {
        return element.isDisplayed();
      }
    } catch (error) {
      throw new Error(`Function 'isVisible' failed: ${error}`);
    }
  }

  /**
   * @function isPresent
   * @memberOf nonUi5.element
   * @description Returns a boolean if the element is present at the DOM or not. It might be hidden.
   * @param {Object} elem - The element.
   * @returns {Boolean} Returns true or false.
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.element.isPresent(elem);
   */
  async isPresent(elem: Element): Promise<boolean> {
    return elem.isExisting();
  }

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
  async isPresentByCss(css: string, index: number = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000) {
    try {
      const elems = await this.getAll(css, timeout);
      return elems[index].isExisting();
    } catch (error) {
      return false;
    }
  }

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
  async isPresentByXPath(xpath: string, index: number = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000): Promise<boolean> {
    return this.isPresentByCss(xpath, index, timeout);
  }

  /**
   * @function getAttributeValue
   * @memberOf nonUi5.element
   * @description Returns the attributes value of the passed element.
   * @param {Object} elem - The element.
   * @param {String} [attribute] - The attribute of the element. Leave empty to return the inner HTML value of the element.
   * @returns {String} The attributes value of the element.
   * @example const elem = await nonUi5.element.getById("elem01");
   * const text = await nonUi5.element.getAttributeValue(elem, "text");
   * @example const elem = await nonUi5.element.getById("elem02");
   * const innerHTML = await nonUi5.element.getAttributeValue(elem);
   */
  async getAttributeValue(elem: Element, attribute?: string): Promise<string> {
    if (typeof elem === "object" && elem !== null) {
      const tagName = await elem.getTagName();
      if (attribute === "value" && (tagName === "input" || tagName === "textarea")) {
        return elem.getValue();
      } else if (attribute && attribute !== "textContent") {
        return elem.getAttribute(attribute);
      } else {
        if (attribute === "textContent") {
          const attributeValue = await elem.getAttribute(attribute);
          if (attributeValue !== null) return attributeValue;
        }
        const [value, text] = await Promise.all([elem.getValue(), elem.getText()]);
        return value || text;
      }
    } else {
      throw new Error(`Function 'getAttributeValue' failed. Please provide an element as first argument (must be of type 'object').`);
    }
  }

  /**
   * @function getValue
   * @memberOf nonUi5.element
   * @description Returns the value of the passed element.
   * @param {Object} elem - The element.
   * @returns {String} The value of the element.
   * @example const elem = await nonUi5.element.getById("elem02");
   * const innerHTML = await nonUi5.element.getValue(elem);
   */
  async getValue(elem: Element): Promise<string> {
    try {
      const [value, text] = await Promise.all([elem.getValue(), elem.getText()]);
      return value || text;
    } catch (error) {
      throw new Error(`Function 'getValue' failed: ${error}`);
    }
  }

  // =================================== SET VALUES ===================================
  /**
   * @function setInnerHTML
   * @memberOf nonUi5.element
   * @description Sets the innerHTML value of the given element.
   * CAUTION: Only use this if filling the value in the normal way is not working and if it is unavoidable. Keep in mind, that a user is not able to perform such actions.
   * @param {Object} elem - The element.
   * @returns {String} The value to set.
   * @example const elem = await nonUi5.element.getById("text-editor");
   * await nonUi5.element.setInnerHTML(elem, "Hello World!");
   */
  async setInnerHTML(elem: Element, value: string): Promise<void> {
    await browser.executeScript(`arguments[0].innerHTML = '${value}'`, [elem]);
  }

  // =================================== ACTIONS ===================================
  /**
   * @function highlight
   * @memberOf nonUi5.element
   * @description Highlights the passed element.
   * @param {Object} elem - The element.
   * @param {Integer} [duration=2000] - The duration of the highlighting (ms).
   * @param {String} [color="red"] - The color of the highlighting (CSS value).
   * @example const elem = await nonUi5.element.getById("text01");
   * await nonUi5.element.highlight(elem);
   * @example const elem = await nonUi5.element.getById("text01");
   * await nonUi5.element.highlight(elem, 3000, "green");
   */
  async highlight(elem: string, duration: number = 2000, color: string = "red") {
    await browser.executeScript(`arguments[0].style.boxShadow = 'inset 0px 0px 0px 2px ${color}'`, [elem]);
    await browser.pause(duration);
    return browser.executeScript("arguments[0].style.boxShadow = 'inherit'", [elem]);
  }

  // =================================== FRAMES (Deprecated) ===================================
  /**
   * @function switchToIframe
   * @memberOf nonUi5.element
   * @description Switches to the passed iframe.
   * @param {String} selector - The CSS selector describing the iframe element.
   * @example await nonUi5.element.switchToIframe("iframe[id='frame01']");
   * @deprecated please use util.browser.switchToIframe
   * @see [util.browser.switchToIframe]{@link util.browser.switchToIframe}
   */
  async switchToIframe(selector: any) {
    util.console.warn(`⚠  "nonUi5.element.switchToIframe" is deprecated. Please use "util.browser.switchToIframe" instead.`);
    await util.browser.switchToIframe(selector);
  }

  /**
   * @function switchToDefaultContent
   * @memberOf nonUi5.element
   * @description Switches to the default content of the HTML page.
   * @example await nonUi5.element.switchToDefaultContent();
   * @deprecated please use util.browser.switchToDefaultContent
   * @see [util.browser.switchToDefaultContent]{@link util.browser.switchToDefaultContent}
   */
  async switchToDefaultContent() {
    util.console.warn(`⚠  "nonUi5.element.switchToDefaultContent" is deprecated. Please use "util.browser.switchToDefaultContent" instead.`);
    await util.browser.switchToDefaultContent();
  }

  // =================================== HELPER ===================================
  private async _waitForStabilization(selector: object, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, stableIterationsRequired: number = 3): Promise<void> {
    let elemsCount: number = 0;
    let stableIterations: number = 0;

    await browser.waitUntil(
      async function () {
        const currentElemsCount = await $$(selector).length;

        if (currentElemsCount === elemsCount) {
          stableIterations++;
        } else {
          stableIterations = 0;
        }

        elemsCount = currentElemsCount;

        if (stableIterations === stableIterationsRequired) {
          return true;
        }
      },
      {
        timeout: timeout,
        timeoutMsg: `No elements found for selector '${selector}' after ${+timeout / 1000}s.`,
      }
    );
  }

  private async _getAndFilterElementBySelector(selector: string, index: number = 0, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000, includeHidden: boolean = false): Promise<Element> {
    await this.waitForAll(selector, timeout);
    const elems: Element[] = await $$(selector);
    if (includeHidden) {
      return elems[index];
    } else {
      const visibleElems = elems.filter(async (elem) => await elem.isDisplayed());
      return visibleElems[index];
    }
  }

  private async _filterByText(elems: Element[], text: string) {
    const filteredElems = [];
    for (const elem of elems) {
      const elementText = await elem.getText();
      if (elementText.indexOf(text) !== -1) {
        filteredElems.push(elem);
      }
    }
    return filteredElems;
  }
}
export default new ElementModule();


