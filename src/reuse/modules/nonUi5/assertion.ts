"use strict";

import { Element } from "../../../../@types/wdio";

/**
 * @class assertion
 * @memberof nonUi5
 */
export class Assertion {

  // =================================== PROPERTIES ===================================
  /**
   * @function expectAttributeToBe
   * @memberOf nonUi5.assertion
   * @description Expects the attributes value of the passed element to be the compare value.
   * @param {Object} elem - The element.
   * @param {String} compareValue - The compare value.
   * @param {String} [attribute] - The attribute to compare. If not passed, it will compare the inner HTML content of the element.
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectAttributeToBe(elem, "Save");
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectAttributeToBe(element, "Save", "title");
   */
  async expectAttributeToBe (elem: Element, compareValue: string, attribute: string): Promise<void> {
    const value = await nonUi5.element.getAttributeValue(elem, attribute);
    return common.assertion.expectEqual(value, compareValue);
  };

  /**
   * @function expectAttributeToContain
   * @memberOf nonUi5.assertion
   * @description Expects the attributes value of the passed element to contain the compare value.
   * @param {Object} elem - The element.
   * @param {String} compareValue - The compare value.
   * @param {String} [attribute] - The attribute to compare. If not passed, it will compare the inner HTML content of the element.
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectAttributeToContain(element, "Save", "title");
   */
  async expectAttributeToContain (elem: Element, compareValue: string, attribute: string) {
    const value = await nonUi5.element.getAttributeValue(elem, attribute);
    return expect(value).toContain(compareValue);
  };

  /**
   * @function expectValueToBe
   * @memberOf nonUi5.assertion
   * @description Expects the attributes value of the passed element to be the compare value.
   * @param {Object} elem - The element.
   * @param {String} compareValue - The compare value.
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectValueToBe(elem, "Save");
   */
  async expectValueToBe (elem: Element, compareValue: string): Promise<void> {
    // Note: it is not required to send 'value' here, because 'expectAttributeToBe' is calling 'getValue' inside
    // @ts-ignore
    await this.expectAttributeToBe(elem, compareValue);
  };


  // =================================== VISIBILITY ===================================
  /**
   * @function expectToBeVisible
   * @memberOf nonUi5.assertion
   * @description Expects that the element is visible to the user. 
   * @param {Object} element - The element.
   * @example const elem = await nonUi5.element.getById("button01");
   * await nonUi5.assertion.expectToBeVisible(elem);
   */
  async expectToBeVisible (element: Element): Promise<void> {
    if (!element) {
      throw new Error("Function 'expectToBeVisible' failed. Please provide an element as argument.");
    }
    await browser.waitUntil(async function () {
      const isPresent = await element.isExisting();
      const isDisplayed = await element.isDisplayed();
      return isPresent && isDisplayed;
    }, {
      interval: 100,
      timeout: 30000,
      timeoutMsg: "Function 'expectToBeVisible' failed. Timeout by waiting for element to be visible."
    });
  };

  /**
 * @function expectToBeNotVisible
 * @memberOf nonUi5.assertion
 * @description Expects that the element is not visible to the user.
 * @param {Object} element - The element.
 * @param {Number} [timeout=30000] - The timeout to wait (ms). Recommendation is to lower the timeout since the element is not expected to show up.
 * @example const elem = await nonUi5.element.getById("button01");
 * await nonUi5.assertion.expectToBeNotVisible(elem, 5000);
 */
  async expectToBeNotVisible (element: Element, timeout = process.env.QMATE_CUSTOM_TIMEOUT || 30000): Promise<void> {
    if (!element) {
      throw new Error("Function 'expectToBeNotVisible' failed. Please provide an element as argument.");
    }
    await element.waitForDisplayed({
      timeout: +timeout,
      reverse: true,
      timeoutMsg: "Function 'expectToBeNotVisible' failed. Element is visible but was expected to be not.",
      interval: 100
    });
  };

};
export default new Assertion();