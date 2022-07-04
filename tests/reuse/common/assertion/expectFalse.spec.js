"use strict";

describe("assertion - expectFalse", function () {
  it("Execution & Verification", function () {
    common.assertion.expectFalse(false);
    expect(() => common.assertion.expectFalse(true)).toThrow(/Expected\w*|\d*false/);
    expect(() => common.assertion.expectFalse("false")).toThrow(/Expected\w*|\d*false/);
  });
});