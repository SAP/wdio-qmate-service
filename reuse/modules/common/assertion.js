"use strict";
/**
 * @class assertion
 * @memberof common
 */
const Assertion = function () {

  /**
   * @function expectEqual
   * @memberOf common.assertion
   * @description Expects the passed values to be equal.
   * @param {Any} value1 - Value (1) to be equal to value (2)
   * @param {Any} value2 - Value (2) to be equal to value (1)
   * @example common.assertion.expectEqual(value1, value2);
   */
  this.expectEqual = function (value1, value2) {
    expect(value1).toEqual(value2);
  };

  /**
   * @function expectUnequal
   * @memberOf common.assertion
   * @description Expects the passed values to be unequal.
   * @param {Any} value1 - Value (1) to be unequal to value (2)
   * @param {Any} value2 - Value (2) to be unequal to value (1)
   * @example common.assertion.expectUnequal(value1, value2);
   */
  this.expectUnequal = function (value1, value2) {
    expect(value1).not.toEqual(value2);
  };

  /**
   * @function expectTrue
   * @memberOf common.assertion
   * @description Expects the passed value to be true.
   * @param {Any} value - Value to be equal to true
   * @example common.assertion.expectTrue(value);
   */
  this.expectTrue = function (value) {
    this.expectEqual(value, true);
  };

  /**
   * @function expectFalse
   * @memberOf common.assertion
   * @description Expects the passed value to be false.
   * @param {Boolean} value - The value to be false.
   * @example common.assertion.expectFalse(false);
   */
  this.expectFalse = function (value) {
    this.expectEqual(value, false);
  };

  /**
   * @function expectDefined
   * @memberOf common.assertion
   * @description Expects the passed values is defined.
   * @param {Any} value - Value to be defined (not undefined)
   * @example common.assertion.expectDefined(value);
   */
  this.expectDefined = function (value) {
    expect(value).toBeDefined();
  };

  /**
   * @function expectUndefined
   * @memberOf common.assertion
   * @description Expects the passed values is undefined.
   * @param {Any} value - Value to be undefined
   * @example common.assertion.expectUndefined(value);
   */
  this.expectUndefined = function (value) {
    expect(value).toBeUndefined();
  };

  /**
   * @function expectUrlToBe
   * @memberOf common.assertion
   * @description Expects the url to be the passed value.
   * @example await common.assertion.expectUrlToBe("www.sap.com");
   */
  this.expectUrlToBe = async function (urlExp) {
    return expect(browser.getUrl()).resolves.toBe(urlExp);
  };

};
module.exports = new Assertion();