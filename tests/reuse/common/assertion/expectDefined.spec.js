"use strict";

describe("assertion - expectDefined", function () {

  it("Execution & Verification", function () {
    common.assertion.expectDefined(0);
    common.assertion.expectDefined(null);
    common.assertion.expectDefined(false);
    expect(() => common.assertion.expectDefined(undefined)).toThrow(/undefined/);
  });
});