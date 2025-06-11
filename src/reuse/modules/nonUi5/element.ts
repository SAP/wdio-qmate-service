import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
import { resolveCssSelectorOrElement } from "../../helper/elementResolving";
import { GLOBAL_WAIT_INTERVAL, GLOBAL_WAIT_TIMEOUT } from "../constants";
/**
 * @class element
 * @memberof nonUi5
 */
export class ElementModule {
  private vlf = new VerboseLoggerFactory("nonUi5", "element");
  private ErrorHandler = new ErrorHandler();

  // =================================== WAIT ===================================
  /**
   * @function waitForAll
   * @memberOf nonUi5.element
   * @description Waits until all elements with the given selector are rendered. Will fail if no element is found.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await nonUi5.element.waitForAll(".inputField");
   */
  async waitForAll(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT, includeHidden: boolean = false): Promise<void> {
    const vl = this.vlf.initLog(this.waitForAll);
    try {
      await this._waitForStabilization(selector, timeout, includeHidden);
    } catch (error) {
      this.ErrorHandler.logException(error);
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
  async waitToBePresent(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT): Promise<void> {
    const vl = this.vlf.initLog(this.waitToBePresent);
    try {
      vl.log(`wdio.waitForExist invocation for selector ${selector}`);
      await $(selector).waitForExist({ timeout: timeout });
    } catch (error) {
      this.ErrorHandler.logException(error);
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
  async waitToBeVisible(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT) {
    const vl = this.vlf.initLog(this.waitToBeVisible);
    try {
      vl.log(`wdio.waitForDisplayed invocation for selector ${selector}`);
      await $(selector).waitForDisplayed({ timeout: timeout });
    } catch (error) {
      this.ErrorHandler.logException(error);
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
  async waitToBeClickable(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT) {
    const vl = this.vlf.initLog(this.waitToBeClickable);
    try {
      vl.log(`wdio.waitForClickable invocation for selector ${selector}`);
      await $(selector).waitForClickable({ timeout: timeout });
    } catch (error) {
      this.ErrorHandler.logException(error);
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
  async getAllDisplayed(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT): Promise<Element[]> {
    const vl = this.vlf.initLog(this.getAllDisplayed);
    try {
      await this.waitForAll(selector, timeout);
      vl.log(`Getting elements by selector ${selector}`);
      const elems: Element[] = await $$(selector);
      return await this._filterDisplayed(elems);
    } catch (error) {
      return this.ErrorHandler.logException(error, `No visible element(s) found for selector '${selector}' after ${+timeout / 1000}s.`);
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
  async getAll(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT): Promise<Element[]> {
    const vl = this.vlf.initLog(this.getAll);
    try {
      await this.waitForAll(selector, timeout, true);
      vl.log(`Getting elements by selector ${selector}`);
      return await $$(selector);
    } catch (error) {
      return this.ErrorHandler.logException(error, `No element(s) found for selector '${selector}' after ${+timeout / 1000}s.`);
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
  async getByCss(selector: any, index: number = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT, includeHidden: boolean = false): Promise<Element> {
    const vl = this.vlf.initLog(this.getByCss);
    try {
      return await this._getAndFilterElementBySelector(selector, index, timeout, includeHidden);
    } catch (error) {
      return this.ErrorHandler.logException(error, `Element with CSS '${selector}' not found.`);
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
   * @param {Boolean} [strict=false] - Specifies if the values match should be exact
   * @returns {Object} The found element.
   * @example const elem = await nonUi5.element.getByCssContainingText(".input01", "Jack Jackson");
   */
  async getByCssContainingText(selector: any, text: string = "", index: number = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT, includeHidden: boolean = false, strict: boolean = false): Promise<Element> {
    const vl = this.vlf.initLog(this.getByCssContainingText);
    try {
      await this.waitForAll(selector, timeout);
      const elems: Element[] = await $$(selector);
      vl.log(`Filtering ${elems.length} elements by ${text} text`);
      const filteredElems = await this._filterByText(elems, text, strict);
      vl.log(`${filteredElems.length} elements satisfied filtering by text`);
      if (includeHidden) {
        return filteredElems[index];
      } else {
        vl.log(`Filtering ${filteredElems.length} by being displayed`);
        const visibleElems = await this._filterDisplayed(filteredElems);
        vl.log(`${filteredElems.length} elements are displayed`);
        return visibleElems[index];
      }
    } catch (error) {
      return this.ErrorHandler.logException(error, `Element with CSS '${selector}' and text '${text}' not found.`);
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
  async getById(id: string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT, includeHidden: boolean = false): Promise<Element> {
    const vl = this.vlf.initLog(this.getById);
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
      return this.ErrorHandler.logException(error, `Element with id '${id}' not found.`);
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
  async getByClass(elemClass: string, index: number = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT, includeHidden: boolean = false): Promise<Element> {
    const vl = this.vlf.initLog(this.getByClass);
    try {
      const selector = `[class*='${elemClass}']`;
      return await this._getAndFilterElementBySelector(selector, index, timeout, includeHidden);
    } catch (error) {
      return this.ErrorHandler.logException(error, `Element with class '${elemClass}' not found.`);
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
  async getByName(name: string, index: number = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT, includeHidden: boolean = false): Promise<Element> {
    const vl = this.vlf.initLog(this.getByName);
    try {
      const selector = `[name='${name}']`;
      return await this._getAndFilterElementBySelector(selector, index, timeout, includeHidden);
    } catch (error) {
      return this.ErrorHandler.logException(error, `Element with name '${name}' not found.`);
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
  async getByXPath(xpath: string, index: number = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT, includeHidden: boolean = false) {
    const vl = this.vlf.initLog(this.getByXPath);
    vl.log(`XPath: ${xpath}`);
    try {
      return await this.getByCss(xpath, index, timeout, includeHidden);
    } catch (error) {
      return this.ErrorHandler.logException(error, `Element with XPath '${xpath}' not found.`);
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
  async getByChild(elementSelector: any, childSelector: any, index: number = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT, includeHidden: boolean = false): Promise<Element> {
    const vl = this.vlf.initLog(this.getByChild);
    let elems;
    try {
      elems = includeHidden ? await this.getAll(elementSelector, timeout) : await this.getAllDisplayed(elementSelector, timeout);
      vl.log(`Found ${elems.length} elements by parent selector`);
    } catch (error) {
      return this.ErrorHandler.logException(error, `No element found for selector: "${elementSelector}".`);
    }

    const elementsWithChild: Element[] = [];
    for (const element of elems) {
      const elem = await element.$(childSelector);
      const toBeIncluded = includeHidden ? await elem.isExisting() : await elem.isDisplayed();
      if (toBeIncluded) {
        elementsWithChild.push(element);
      }
    }
    vl.log(`Found ${elementsWithChild.length} by child selector`);
    if (elementsWithChild.length === 0) {
      return this.ErrorHandler.logException(new Error(), `The found element(s) with the given selector do(es) not have any child with selector ${childSelector}.`);
    } else {
      return elementsWithChild[index];
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
  async getByParent(elementSelector: any, parentSelector: any, index: number = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT, includeHidden: boolean = false): Promise<Element> {
    const vl = this.vlf.initLog(this.getByParent);
    let parentElems: Element[] = [];
    try {
      parentElems = includeHidden ? await this.getAll(parentSelector, timeout) : await this.getAllDisplayed(parentSelector, timeout);
      vl.log(`Found ${parentElems.length} elements by parent selector`);
    } catch (error) {
      return this.ErrorHandler.logException(error, `No parent element found for selector: ${parentSelector}`);
    }

    const elementsWithParent = [];
    for (const parentElement of parentElems) {
      const elem = await parentElement.$(elementSelector);
      const toBeIncluded = includeHidden ? await elem.isExisting() : await elem.isDisplayed();
      if (toBeIncluded) {
        elementsWithParent.push(elem);
      }
    }
    vl.log(`Found ${elementsWithParent.length} elements with parent`);

    if (elementsWithParent.length === 0) {
      return this.ErrorHandler.logException(new Error(), `No visible elements found for selector '${elementSelector}' and parent selector '${parentSelector}'`);
    } else {
      return elementsWithParent[index];
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
    const vl = this.vlf.initLog(this.isVisible);
    try {
      if (strict) {
        return element.isDisplayedInViewport();
      } else {
        return element.isDisplayed();
      }
    } catch (error) {
      return this.ErrorHandler.logException(error);
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
    const vl = this.vlf.initLog(this.isPresent);
    return elem.isExisting();
  }

  /**
   * @function isEnabled
   * @memberOf nonUi5.element
   * @description Returns a boolean if the element is enabled or not.
   * @param {Element} elem - The element.
   * @returns {Boolean} Returns true or false.
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.element.isEnabled(elem);
   */
  async isEnabled(elem: Element): Promise<boolean> {
    const vl = this.vlf.initLog(this.isEnabled);
    return elem.isEnabled();
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
  async isPresentByCss(css: string, index: number = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT) {
    const vl = this.vlf.initLog(this.isPresentByCss);
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
   * @description Returns a boolean if the element is present at the DOM or not.
   * @param {String} xpath - The XPath describing the element.
   * @param {Number} [index=0] - The index of the element (in case there are more than one elements visible at the same time).
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {boolean}
   * @example await nonUi5.element.isPresentByXPath(".//*[text()='Create']");
   */
  async isPresentByXPath(xpath: string, index: number = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT): Promise<boolean> {
    const vl = this.vlf.initLog(this.isPresentByXPath);
    return this.isPresentByCss(xpath, index, timeout);
  }

  /**
   * @function isSelected
   * @memberOf nonUi5.element
   * @description Returns a boolean if the element (e.g. checkbox) is selected.
   * @param {Object} elem - The element.
   * @returns {boolean}
   * @example const elem = await nonUi5.element.getById("elem01");
   * const isSelected = await nonUi5.element.isSelected(elem);
   */
  async isSelected(elem: Element): Promise<boolean> {
    const vl = this.vlf.initLog(this.isSelected);
    return elem.isSelected();
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
    const vl = this.vlf.initLog(this.getAttributeValue);
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
      return this.ErrorHandler.logException(new Error(), `Please provide an element as first argument (must be of type 'object').`);
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
    const vl = this.vlf.initLog(this.getValue);
    try {
      const [value, text] = await Promise.all([elem.getValue(), elem.getText()]);
      return value || text;
    } catch (error) {
      return this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function getCssPropertyValue
   * @memberOf nonUi5.element
   * @description Returns the value of the passed CSS property of the element.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {String} cssProperty - The CSS property of the element to get value.
   * @returns {String} The value of the CSS property.
   * @example const elem = await nonUi5.element.getById("elem01");
   * const color = await nonUi5.element.getCssPropertyValue(elem, "color");
   */
  async getCssPropertyValue(elementOrSelector: Element | string, cssProperty: string): Promise<string> {
    const vl = this.vlf.initLog(this.getCssPropertyValue);
    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);
      const property = await element.getCSSProperty(cssProperty);
      return property.value;
    } catch (error) {
      return this.ErrorHandler.logException(error);
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
    const vl = this.vlf.initLog(this.setInnerHTML);
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
  async highlight(elem: Element, duration: number = 2000, color: string = "red") {
    const vl = this.vlf.initLog(this.highlight);
    await browser.executeScript(`arguments[0].style.boxShadow = 'inset 0px 0px 0px 2px ${color}'`, [elem]);
    await browser.pause(duration);
    return browser.executeScript("arguments[0].style.boxShadow = 'inherit'", [elem]);
  }

  // =================================== HELPER ===================================
  private async _waitForStabilization(selector: object, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT, includeHidden: boolean = false, stableIterationsRequired: number = 3): Promise<void> {
    const vl = this.vlf.initLog(this._waitForStabilization);
    let elemsCount: number = 0;
    let stableIterations: number = 0;

    await browser.waitUntil(
      async () => {
        let currentElems = await $$(selector);
        if (!includeHidden) {
          currentElems = await this._filterDisplayed(currentElems);
        }
        const currentElemsCount = currentElems.length;
        vl.log(`Found ${currentElemsCount} elements`);

        if (currentElemsCount === elemsCount) {
          vl.log(`Iteration was stable`);
          stableIterations++;
        } else {
          vl.log(`Iteration was unstable. Found ${currentElemsCount} elements displayed, when ${elemsCount} was expected`);
          stableIterations = 0;
        }

        elemsCount = currentElemsCount;

        if (elemsCount !== 0 && stableIterations === stableIterationsRequired) {
          return true;
        }
      },
      {
        timeout: timeout,
        interval: GLOBAL_WAIT_INTERVAL,
        timeoutMsg: elemsCount === 0 ? `Timeout reached. No element with passed selector found after ${+timeout / 1000}s.` : `Timeout reached. Page is still loading after ${+timeout / 1000}s.`
      }
    );
  }

  private async _getAndFilterElementBySelector(selector: string, index: number = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT, includeHidden: boolean = false): Promise<Element> {
    const vl = this.vlf.initLog(this._getAndFilterElementBySelector);
    await this.waitForAll(selector, timeout, includeHidden);
    const elems: Element[] = await $$(selector);
    if (includeHidden) {
      return elems[index];
    } else {
      vl.log(`Filtering ${elems.length} elements by being displayed`);
      const visibleElems = await this._filterDisplayed(elems);
      return visibleElems[index];
    }
  }

  private async _filterByText(elems: Element[], text: string, strict: boolean = false) {
    const vl = this.vlf.initLog(this._filterByText);
    const filteredElems = [];
    for (const elem of elems) {
      const elementText = await elem.getText();
      const strictEquasion = strict && elementText === text;
      const nonStrictEquasion = !strict && elementText.includes(text.trim());
      if (strictEquasion || nonStrictEquasion) {
        vl.log(`Element with ${elementText} text satisfies the equasion`);
        filteredElems.push(elem);
      }
    }
    if (filteredElems.length > 0) {
      return filteredElems;
    } else {
      throw new Error(`No element with text ${text} found.`);
    }
  }

  private async _filterDisplayed(elems: Element[]) {
    const vl = this.vlf.initLog(this._filterDisplayed);
    vl.log(`Filtering ${elems.length} elements by being displayed`);
    const filteredElems = [];
    for (const elem of elems) {
      if (await elem.isDisplayed()) {
        filteredElems.push(elem);
      }
    }
    if (filteredElems.length > 0) {
      vl.log(`${elems.length} elements are displayed`);
      return filteredElems;
    } else {
      throw new Error(`No displayed element found.`);
    }
  }
}
export default new ElementModule();
