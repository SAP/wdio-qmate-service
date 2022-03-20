"use strict";
/**
 * @class assertion
 * @memberof common
 */
export class Assertion {

  /**
   * @function expectEqual
   * @memberOf common.assertion
   * @description Expects the passed values to be equal.
   * @param {Any} value1 - Value (1) to be equal to value (2)
   * @param {Any} value2 - Value (2) to be equal to value (1)
   * @example common.assertion.expectEqual(value1, value2);
   */
  expectEqual (value1: any, value2: any) {
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
  expectUnequal (value1: any, value2: any) {
    expect(value1).not.toEqual(value2);
  };

  /**
   * @function expectTrue
   * @memberOf common.assertion
   * @description Expects the passed value to be true.
   * @param {Any} value - Value to be equal to true
   * @example common.assertion.expectTrue(value);
   */
  expectTrue (value: any) {
    this.expectEqual(value, true);
  };

  /**
   * @function expectFalse
   * @memberOf common.assertion
   * @description Expects the passed value to be false.
   * @param {Boolean} value - The value to be false.
   * @example common.assertion.expectFalse(false);
   */
  expectFalse (value: any) {
    this.expectEqual(value, false);
  };

  /**
   * @function expectDefined
   * @memberOf common.assertion
   * @description Expects the passed values is defined.
   * @param {Any} value - Value to be defined (not undefined)
   * @example common.assertion.expectDefined(value);
   */
  expectDefined (value: any) {
    expect(value).toBeDefined();
  };

  /**
   * @function expectUndefined
   * @memberOf common.assertion
   * @description Expects the passed values is undefined.
   * @param {Any} value - Value to be undefined
   * @example common.assertion.expectUndefined(value);
   */
  expectUndefined (value: any) {
    expect(value).toBeUndefined();
  };

  /**
   * @function expectUrlToBe
   * @memberOf common.assertion
   * @description Expects the url to be the passed value.
   * @example await common.assertion.expectUrlToBe("www.sap.com");
   */
  expectUrlToBe (urlExp: string) {
    return expect(browser.getUrl()).resolves.toBe(urlExp);
  };

};
export default new Assertion();