"use strict";

describe("assertion - expectFalse", function () {
  it("Execution and Verification", function () {
    ui5.common.assertion.expectFalse(false);
    expect(() => ui5.common.assertion.expectFalse(true)).toThrow(/Expected\w*|\d*false/);
    expect(() => ui5.common.assertion.expectFalse("false")).toThrow(/Expected\w*|\d*false/);
  });
});