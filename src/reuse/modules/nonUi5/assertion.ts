"use strict";

import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import { resolveCssSelectorOrElement } from "../../helper/elementResolving";
import ErrorHandler from "../../helper/errorHandler";
import { GLOBAL_WAIT_INTERVAL, GLOBAL_WAIT_TIMEOUT } from "../constants";

/**
 * @class assertion
 * @memberof nonUi5
 */
export class Assertion {
  private vlf = new VerboseLoggerFactory("nonUi5", "assertion");
  private ErrorHandler = new ErrorHandler();
  // =================================== PROPERTIES ===================================
  /**
   * @function expectAttributeToBe
   * @memberOf nonUi5.assertion
   * @description Expects the attributes value of the passed element to be the compare value.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {String} compareValue - The compare value.
   * @param {String} [attribute] - The attribute to compare. If not passed, it will compare the inner HTML content of the element.
   * @example const element = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectAttributeToBe(element, "Save");
   * @example const element = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectAttributeToBe(element, "Save", "title");
   */
  async expectAttributeToBe(elementOrSelector: Element | string, compareValue: string, attribute?: string): Promise<void> {
    const vl = this.vlf.initLog(this.expectAttributeToBe);
    const element = await resolveCssSelectorOrElement(elementOrSelector);
    const value = await nonUi5.element.getAttributeValue(element, attribute);
    return common.assertion.expectEqual(value, compareValue);
  }

  /**
   * @function expectAttributeToContain
   * @memberOf nonUi5.assertion
   * @description Expects the attributes value of the passed element to contain the compare value.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {String} compareValue - The compare value.
   * @param {String} [attribute] - The attribute to compare. If not passed, it will compare the inner HTML content of the element.
   * @example const element = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectAttributeToContain(element, "Save", "title");
   */
  async expectAttributeToContain(elementOrSelector: Element | string, compareValue: string, attribute?: string) {
    const vl = this.vlf.initLog(this.expectAttributeToContain);
    const element = await resolveCssSelectorOrElement(elementOrSelector);
    const value = await nonUi5.element.getAttributeValue(element, attribute);
    vl.log(`Expecting ${value} to contain ${compareValue}`);
    return expect(value).toContain(compareValue);
  }

  /**
   * @function expectValueToBe
   * @memberOf nonUi5.assertion
   * @description Expects the attributes value of the passed element to be the compare value.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {String} compareValue - The compare value.
   * @example const element = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectValueToBe(element, "Save");
   */
  async expectValueToBe(elementOrSelector: Element | string, compareValue: string): Promise<void> {
    const vl = this.vlf.initLog(this.expectValueToBe);
    // Note: it is not required to send 'value' here, because 'expectAttributeToBe' is calling 'getValue' inside
    const element = await resolveCssSelectorOrElement(elementOrSelector);
    await this.expectAttributeToBe(element, compareValue);
  }

  /**
   * @function expectCssPropertyValueToBe
   * @memberOf nonUi5.assertion
   * @description Expects the CSS property value of the passed element to be the compare value.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {String} cssProperty - The CSS property of the element to compare with.
   * @param {String} compareValue - The compare value.
   * @example const element = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectCssPropertyValueToBe(element, "color", "rgb(255, 0, 0)");
   */
  async expectCssPropertyValueToBe(elementOrSelector: Element | string, cssProperty: string, compareValue: string): Promise<void> {
    const vl = this.vlf.initLog(this.expectCssPropertyValueToBe);
    const value = await nonUi5.element.getCssPropertyValue(elementOrSelector, cssProperty);
    return common.assertion.expectEqual(value, compareValue);
  }

  /**
   * @function expectTextToBe
   * @memberOf nonUi5.assertion
   * @description Expects the text of the passed element to be the compare value.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {String} compareValue - The compare value.
   * @example const element = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectTextToBe(element, "Save");
   **/
  async expectTextToBe(elementOrSelector: Element | string, compareValue: string): Promise<void> {
    const vl = this.vlf.initLog(this.expectTextToBe);
    const element = await resolveCssSelectorOrElement(elementOrSelector);
    const textValue = await element.getText();
    return common.assertion.expectEqual(textValue, compareValue);
  }

  // =================================== VISIBILITY ===================================
  /**
   * @function expectToBeVisible
   * @memberOf nonUi5.assertion
   * @description Expects that the element is visible to the user.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @example const element = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectToBeVisible(elem);
   */
  async expectToBeVisible(elementOrSelector: Element | string): Promise<void> {
    const vl = this.vlf.initLog(this.expectToBeVisible);
    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);

      await browser.waitUntil(
        async function () {
          const isPresent = await element.isExisting();
          const isDisplayed = await element.isDisplayed();
          return isPresent && isDisplayed;
        },
        {
          interval: GLOBAL_WAIT_INTERVAL,
          timeout: GLOBAL_WAIT_TIMEOUT,
          timeoutMsg: "Function 'expectToBeVisible' failed. Timeout by waiting for element to be visible."
        }
      );
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function expectToBeNotVisible
   * @memberOf nonUi5.assertion
   * @description Expects that the element is not visible to the user.
   * @param {Element | string} elementOrSelector - The element or CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms). Recommendation is to lower the timeout since the element is not expected to show up.
   * @example const element = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectToBeNotVisible(element, 5000);
   */
  async expectToBeNotVisible(elementOrSelector: Element | string, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || GLOBAL_WAIT_TIMEOUT): Promise<void> {
    const vl = this.vlf.initLog(this.expectToBeNotVisible);
    try {
      const element = await resolveCssSelectorOrElement(elementOrSelector);
      await element.waitForDisplayed({
        timeout: +timeout,
        reverse: true,
        timeoutMsg: "Function 'expectToBeNotVisible' failed. Element is visible but was expected to be not.",
        interval: 100
      });
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }
}
export default new Assertion();
