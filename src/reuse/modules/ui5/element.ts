"use strict";

import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
import { GLOBAL_DEFAULT_WAIT_TIMEOUT } from "../constants";

/**
 * @class element
 * @memberof ui5
 */
export class ElementModule {
  private vlf = new VerboseLoggerFactory("ui5", "element");
  private ErrorHandler = new ErrorHandler();
  // =================================== WAIT ===================================
  /**
   * @function waitForAll
   * @memberOf ui5.element
   * @description Waits for all elements matching the given selector.
   * @param {Object} selector - The selector describing the elements.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await ui5.element.waitForAll(selector);
   */
  async waitForAll(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT) {
    const vl = this.vlf.initLog(this.waitForAll);
    if (!selector) {
      this.ErrorHandler.logException(new Error(), `Please provide a valid selector as argument.`);
    }
    try {
      await browser.uiControls(selector, timeout);
    } catch (e) {
      this.ErrorHandler.logException(new Error(), (e as Error).message);
    }
  }

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
  async getAllDisplayed(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<Element[]> {
    const vl = this.vlf.initLog(this.getAllDisplayed);
    if (!selector) {
      this.ErrorHandler.logException(new Error(), `Please provide a valid selector as argument.`);
    }
    try {
      return await browser.uiControls(selector, timeout);
    } catch (e) {
      return this.ErrorHandler.logException(new Error(), (e as Error).message);
    }
  }

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
  async getDisplayed(selector: any, index = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<Element> {
    const vl = this.vlf.initLog(this.getDisplayed);
    if (!selector || typeof selector !== "object") {
      this.ErrorHandler.logException(new Error(), `Please provide a valid selector as argument.`);
    }
    const elems = await browser.uiControls(selector, timeout);
    if (index < 0 || elems.length <= index) {
      this.ErrorHandler.logException(new Error(), `Index out of bound. Trying to access element at index: ${index}, ` + `but there are only ${elems.length} element(s) that match locator ${JSON.stringify(selector)}`);
    }
    return elems[index];
  }

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
  async getByText(selector: any, value: string, index = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<Element> {
    const vl = this.vlf.initLog(this.getByText);
    vl.log(`Getting element by text ${value}`);
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
      this.ErrorHandler.logException(error, `No elements found for given text.`);
    }

    if (!elementsWithText.length) {
      this.ErrorHandler.logException(new Error(), `No elements found for given text.`);
    }
    if (index >= elementsWithText.length) {
      this.ErrorHandler.logException(
        new Error(),
        `Index out of bound. Cannot get element by text ${value} at index ${index}.
      There are only ${elementsWithText.length} elements with the given selector and text`
      );
    }
    return elementsWithText[index];
  }

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
  async getByChild(elementSelector: any, childSelector: any, index = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<Element> {
    const vl = this.vlf.initLog(this.getByText);
    const selector = {
      elementProperties: elementSelector.elementProperties,
      descendantProperties: childSelector.elementProperties
    };
    try {
      return await this.getDisplayed(selector, index, timeout);
    } catch (e) {
      return this.ErrorHandler.logException(e);
    }
  }

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
  async getByParent(elementSelector: any, parentSelector: any, index = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<Element> {
    const vl = this.vlf.initLog(this.getByParent);
    const selector = {
      elementProperties: elementSelector.elementProperties,
      ancestorProperties: parentSelector.elementProperties
    };
    try {
      return await this.getDisplayed(selector, index, timeout);
    } catch (e) {
      return this.ErrorHandler.logException(e);
    }
  }

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
  async getId(selector: any, index = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<string> {
    const vl = this.vlf.initLog(this.getId);
    const elem = await this.getDisplayed(selector, index, timeout);
    return elem.getAttribute("id");
  }

  /**
   * @function getPropertyValue
   * @memberOf ui5.element
   * @description Returns the UI5 property value of the passed element.
   * @param {Object} selector - The selector describing the element.
   * @param {String} property - The property of the element.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time).
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {any} The property value of the element.
   * @example const elemValue = await ui5.element.getPropertyValue(selector, "text");
   */
  async getPropertyValue(selector: any, property: string, index = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<any> {
    const vl = this.vlf.initLog(this.getPropertyValue);
    let attrValue;
    try {
      let elem = await this.getDisplayed(selector, index, timeout);
      attrValue = await elem.getUI5Property(property);

      if (attrValue === null || attrValue === undefined || attrValue === "") {
        attrValue = await this.getInnerAttribute(elem, "data-" + property);
      }
      if (attrValue === null || attrValue === undefined) {
        return this.ErrorHandler.logException(new Error(), "Not existing property");
      }
    } catch (error) {
      return this.ErrorHandler.logException(error);
    }
    return attrValue;
  }

  async getInnerAttribute(elem: Element, name: string) {
    const vl = this.vlf.initLog(this.getInnerAttribute);
    return elem.getAttribute(name).then((value) => {
      if (value !== null) {
        return value;
      }

      return browser.executeScript(
        `
        function getAttribute(webElement, attributeName) {
            return webElement.getAttribute(attributeName);        
        }`,
        [elem, name]
      );
    });
  }

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
  async getValue(selector: any, index = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<string> {
    const vl = this.vlf.initLog(this.getValue);
    try {
      return await this.getPropertyValue(selector, "value", index, timeout);
    } catch (error) {
      return this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function getCssPropertyValue
   * @memberOf ui5.element
   * @description Returns the value of the passed CSS property of the element.
   * @param {Object} selector - The selector describing the element.
   * @param {String} cssProperty - The CSS property of the element to get value.
   * @param {Number} [index=0] - The index of the selector (in case there are more than one elements visible at the same time).
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @returns {String} The value of the CSS property.
   * @example const cssPropertyValue = await ui5.element.getCssPropertyValue(selector, "visibility");
   */
  async getCssPropertyValue(selector: any, cssProperty: string, index = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<string> {
    const vl = this.vlf.initLog(this.getCssPropertyValue);
    try {
      const elem = await this.getDisplayed(selector, index, timeout);
      const property = await elem.getCSSProperty(cssProperty);
      return property.value;
    } catch (error) {
      return this.ErrorHandler.logException(error);
    }
  }

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
  async getBindingValue(selector: any, bindingContext: string, index = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<string> {
    const vl = this.vlf.initLog(this.getBindingValue);
    const elem = await this.getDisplayed(selector, index, timeout);
    return browser.controlActionInBrowser(
      function (control: any, property: string, done: Function) {
        done(control.getBinding(property).getValue());
      },
      elem,
      bindingContext
    );
  }

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
  async isVisible(selector: any, index = 0, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_DEFAULT_WAIT_TIMEOUT): Promise<boolean> {
    const vl = this.vlf.initLog(this.isVisible);
    try {
      const elem = await ui5.element.getDisplayed(selector, index, timeout);
      return await elem.isDisplayed();
    } catch (err) {
      return false;
    }
  }

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
  async highlight(selector: any, duration = 2000, color = "red"): Promise<void> {
    const vl = this.vlf.initLog(this.highlight);
    const elem = await this.getDisplayed(selector);
    if (elem) {
      await browser.executeScript(`arguments[0].style.boxShadow = 'inset 0px 0px 0px 2px ${color}'`, [elem]);
      await browser.pause(duration);
      await browser.executeScript("arguments[0].style.boxShadow = 'inherit'", [elem]);
    }
  }

  // =================================== HELPER ===================================
  private _throwSelectorError(functionName: string): never {
    throw new Error(`Function '${functionName}' failed: Please provide a valid selector as argument.`);
  }
}
export default new ElementModule();
