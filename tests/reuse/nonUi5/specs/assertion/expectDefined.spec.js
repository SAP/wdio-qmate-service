"use strict";

describe("assertion - expectDefined", function () {

  it("Execution and Verification", function () {
    non_ui5.common.assertion.expectDefined(0);
    non_ui5.common.assertion.expectDefined(null);
    non_ui5.common.assertion.expectDefined(false);
    expect(() => non_ui5.common.assertion.expectDefined(undefined)).toThrow(/undefined/);
  });
});