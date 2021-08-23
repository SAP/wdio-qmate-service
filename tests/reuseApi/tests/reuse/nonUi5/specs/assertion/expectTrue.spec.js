"use strict";

describe("assertion - expectTrue", function () {
  it("Execution and Verification", function () {
    non_ui5.common.assertion.expectTrue(true);
    expect(() => non_ui5.common.assertion.expectTrue(false)).toThrow(/Expected\w*|\d*true/);
    expect(() => non_ui5.common.assertion.expectTrue("true")).toThrow(/Expected\w*|\d*true/);
  });
});