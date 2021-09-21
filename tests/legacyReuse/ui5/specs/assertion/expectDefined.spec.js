"use strict";

describe("assertion - expectDefined", function () {

  it("Execution and Verification", function () {
    ui5.common.assertion.expectDefined(0);
    ui5.common.assertion.expectDefined(null);
    ui5.common.assertion.expectDefined(false);
    expect(() => ui5.common.assertion.expectDefined(undefined)).toThrow(/undefined/);
  });
});