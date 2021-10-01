"use strict";

describe("assertion - expectTrue", function () {
  it("Execution and Verification", function () {
    ui5.common.assertion.expectTrue(true);
    expect(() => ui5.common.assertion.expectTrue(false)).toThrow(/Expected\w*|\d*true/);
    expect(() => ui5.common.assertion.expectTrue("true")).toThrow(/Expected\w*|\d*true/);
  });
});