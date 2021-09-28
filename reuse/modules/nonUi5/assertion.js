"use strict";
/**
 * @class assertion
 * @memberof nonUi5
 */
const Assertion = function () {

  // =================================== PROPERTIES ===================================
  /**
   * @function expectAttributeToBe
   * @memberOf nonUi5.assertion
   * @description Expects the attributes value of the passed element to be the compare value.
   * @param {Object} elem - The element.
   * @param {String} compareValue - The compare value.
   * @param {String} [attribute] - The attribute to compare. If not passed, it will compare the inner HTML content of the element.
   * @example const elem = await nonUi5.element.getElementById("button01");
   * await nonUi5.assertion.expectAttributeToBe(elem, "Save");
   * @example const elem = await nonUi5.element.getElementById("button01");
   * await nonUi5.assertion.expectAttributeToBe(element, "Save", "title");
   */
  this.expectAttributeToBe = async function (elem, compareValue, attribute) {
    const value = await nonUi5.element.getValue(elem, attribute);
    return common.assertion.expectEqual(value, compareValue);
  };

  /**
   * @function expectValueToBe
   * @memberOf nonUi5.assertion
   * @description Expects the attributes value of the passed element to be the compare value.
   * @param {Object} elem - The element.
   * @param {String} compareValue - The compare value.
   * @example const elem = await nonUi5.element.getElementById("button01");
   * await nonUi5.assertion.expectValueToBe(elem, "Save");
   */
  this.expectValueToBe = async function (elem, compareValue) {
    const value = await this.expectAttributeToBe(elem, compareValue, "value");
    return common.assertion.expectEqual(value, compareValue);
  };


  // =================================== VISIBILITY ===================================
  /**
   * @function expectToBeVisible
   * @memberOf nonUi5.assertion
   * @description Expects that the element is visible to the user. 
   * @param {Object} element - The element.
   * @example const elem = await nonUi5.element.getElementById("button01");
   * await nonUi5.assertion.expectToBeVisible(elem);
   */
  this.expectToBeVisible = async function (element) {
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
      timeoutMsg: "Timeout by waiting for element to be visible."
    });
  };

};
module.exports = new Assertion();