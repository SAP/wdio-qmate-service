/* eslint-disable no-console */
/**
* @class assertion
* @memberof non_ui5.common
*/
const Assertion = function () {

  /**
  * @function expectToBeVisible
  * @memberOf non_ui5.common.assertion
  * @description Expects that the element is visible to the user. Will fail if it is not visible.
  * @param {Object} element - The element.
  * @returns {Promise} The promise to be resolved.
  * @example let elem = await non_ui5.common.locator.getElementById("button01");
  * await non_ui5.common.assertion.expectToBeVisible(elem);
  */
  this.expectToBeVisible = async function (element) {
    if (!element) {
      throw new Error("expectToBeVisible(): 'element' is empty");
    }
    await browser.waitUntil(async function () {
      const isPresent = await element.isExisting();
      const isDisplayed = await element.isDisplayed();
      return isPresent && isDisplayed;
    }, {
      interval: 100,
      timeout: 30000,
      timeoutMsg: "Timeout by waiting for element to be visible."
    }
    );
  };

  /**
  * @function expectValueToBe
  * @memberOf non_ui5.common.assertion
  * @description Expects the attributes value of the passed element to be the compare value.
  * @param {Object} elem - The element.
  * @param {String} compareValue - The compare value.
  * @param {String} attribute - [OPTIONAL] The attribute to compare. If not passed, it will compare the inner content of the element.
  * @returns {Promise} The promise to be resolved.
  * @example let elem = await non_ui5.common.locator.getElementById("button01");
  * await non_ui5.common.assertion.expectValueToBe(elem, "Save");
  * @example let element = await non_ui5.common.locator.getElementById("button01");
  * await non_ui5.common.assertion.expectValueToBe(element, "Save", "title");
  */
  this.expectValueToBe = async function (elem, compareValue, attribute) {
    const value = await non_ui5.common.locator.getValue(elem, attribute);
    return non_ui5.common.assertion.expectEqual(value, compareValue);
  };

  /**
  * @function isVisible
  * @memberOf non_ui5.common.assertion
  * @description returns a boolean if the element is visible to the user.
  * @param {Object} element - The element.
  * @returns {Boolean} Returns true or false.
  * @example let elem = await non_ui5.common.locator.getElementById("button01");
  * await non_ui5.common.assertion.isVisible(elem);
  */
  this.isVisible = async function (element) {
    return element.isDisplayedInViewport();
  };

  /**
  * @function isElementPresent
  * @memberOf non_ui5.common.assertion
  * @description returns a boolean if the element is present at the DOM or not.
  * @param {Object} elem - The element.
  * @returns {Boolean} Returns true or false.
  * @example await non_ui5.common.assertion.isElementPresent(elem);
  */
  this.isElementPresent = async function (elem) {
    return elem.isExisting();
  };

  this.isPresent = async function (selector, index = 0, timeout = 0) {
    console.log("function 'isPresent' is deprecated please use 'isPresentByCss'!");
    return await this.isPresentByCss(selector, index, timeout || 60000);
  };

  /**
  * @function isPresentByCss
  * @memberOf non_ui5.common.assertion
  * @description returns a boolean if the element is present at the DOM or not.
  * @param {String} css - The CSS selector of the element (can be a class for example).
  * @param {Integer} index=0 - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Integer} timeout=30000 - The timeout to wait (default value: 3 sec).
  * @returns {boolean}
  * @example await non_ui5.common.assertion.isPresentByCss(".button01");
  */
  this.isPresentByCss = async function (css, index = 0, timeout = 3000) {
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
   * @memberOf non_ui5.common.assertion
   * @description returns a boolean if the element is present at the DOM or not.
   * @param {String} xpath - The XPath selector of the element.
   * @param {Integer} index=0 - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Integer} timeout=3000 - The timeout to wait (default value: 3 sec).
   * @returns {boolean}
   * @example await non_ui5.common.assertion.isPresentByXPath(".//*[text()='Create']");
   */
  this.isPresentByXPath = async function (xpath, index = 0, timeout = 3000) {
    return this.isPresentByCss(xpath, index, timeout);
  };


  // /**
  // * @function hasChildNodes
  // * @memberOf non_ui5.common.assertion
  // * @description returns a boolean if the element is visible to the user.
  // * @param {Object} element - The element.
  // * @returns {boolean} Returns true or false.
  // * @example let elem = await non_ui5.common.locator.getElementById("list01");
  // * await non_ui5.common.assertion.hasChildNodes(elem);
  // */
  // this.hasChildNodes = async function (elem) {

  // };

  //-------------------------------- GENERAL -------------------------------
  /**
   * @function expectEqual
   * @memberOf non_ui5.common.assertion
   * @description Expects the passed values to be equal.
   * @param {Any} value1 - Value (1) to be equal to value (2)
   * @param {Any} value2 - Value (2) to be equal to value (1)
   * @example non_ui5.common.assertion.expectEqual(value1, value2);
   */
  this.expectEqual = function (value1, value2) {
    return expect(value1).toEqual(value2); // toEqual is better to use in case of objects/arrays comparison
  };

  /**
   * @function expectTrue
   * @memberOf non_ui5.common.assertion
   * @description Expects the passed value to be true.
   * @param {Any} value - Value to be equal to true
   * @example non_ui5.common.assertion.expectTrue(value);
   */
  this.expectTrue = function (value) {
    return this.expectEqual(value, true);
  };


  /**
   * @function expectFalse
   * @memberOf non_ui5.common.assertion
   * @description Expects the passed value to be false.
   * @param {Boolean} value - The value to be false.
   * @returns {Promise} The promise to be resolved.
   * @example await non_ui5.common.assertion.expectFalse(false);
   */
  this.expectFalse = async function (value) {
    return this.expectEqual(value, false);
  };

  /**
   * @function expectUnequal
   * @memberOf non_ui5.common.assertion
   * @description Expects the passed values to be unequal.
   * @param {Any} value1 - Value (1) to be unequal to value (2)
   * @param {Any} value2 - Value (2) to be unequal to value (1)
   * @example non_ui5.common.assertion.expectUnequal(value1, value2);
   */
  this.expectUnequal = function (value1, value2) {
    return expect(value1).not.toEqual(value2);
  };

  /**
   * @function expectDefined
   * @memberOf non_ui5.common.assertion
   * @description Expects the passed values is defined.
   * @param {Any} value - Value to be defined (not undefined)
   * @example non_ui5.common.assertion.expectDefined(value);
   */
  this.expectDefined = function (value) {
    return expect(value).toBeDefined();
  };

  /**
   * @function expectUndefined
   * @memberOf non_ui5.common.assertion
   * @description Expects the passed values is undefined.
   * @param {Any} value - Value to be undefined
   * @example non_ui5.common.assertion.expectUndefined(value);
   */
  this.expectUndefined = function (value) {
    return expect(value).toBeUndefined();
  };
};
module.exports = new Assertion();
