"use strict";

describe("assertion - expectFalse", function () {
  it("Execution and Verification", function () {
    common.assertion.expectFalse(false);
    expect(() => common.assertion.expectFalse(true)).toThrow(/Expected\w*|\d*false/);
    // TODO: doesn't throw an error
    // expect(() => common.assertion.expectFalse("false")).toThrow(/Expected\w*|\d*false/);
  });
});