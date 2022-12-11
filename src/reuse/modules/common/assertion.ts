"use strict";

import { VerboseLoggerFactory } from "../../helper/verboseLogger";

/**
 * @class assertion
 * @memberof common
 */
export class Assertion {
  private vlf = new VerboseLoggerFactory("common", "assertion")

  /**
   * @function expectEqual
   * @memberOf common.assertion
   * @description Expects the passed values to be equal.
   * @param {Any} value1 - Value (1) to be equal to value (2)
   * @param {Any} value2 - Value (2) to be equal to value (1)
   * @example common.assertion.expectEqual(value1, value2);
   */
  expectEqual (value1: any, value2: any) {
    const vl = this.vlf.initLog(this.expectEqual)
    vl.log(`Expecting ${value1} to be equal to ${value2}`)
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
    const vl = this.vlf.initLog(this.expectUnequal)
    vl.log(`Expecting ${value1} not to be equal to ${value2}`)
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
    const vl = this.vlf.initLog(this.expectUnequal)
    vl.log(`Expecting ${value} to be true`)
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
    const vl = this.vlf.initLog(this.expectFalse)
    vl.log(`Expecting ${value} to be false`)
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
    const vl = this.vlf.initLog(this.expectDefined)
    vl.log(`Expecting ${value} to be defined`)
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
    const vl = this.vlf.initLog(this.expectUndefined)
    vl.log(`Expecting ${value} to be undefined`)
    expect(value).toBeUndefined();
  };

  /**
   * @function expectUrlToBe
   * @memberOf common.assertion
   * @description Expects the url to be the passed value.
   * @example await common.assertion.expectUrlToBe("www.sap.com");
   */
  expectUrlToBe (urlExp: string) {
    const vl = this.vlf.initLog(this.expectUrlToBe)
    vl.log(`Expecting current url to be to be ${urlExp}`)
    return expect(browser.getUrl()).resolves.toBe(urlExp);
  };

};
export default new Assertion();