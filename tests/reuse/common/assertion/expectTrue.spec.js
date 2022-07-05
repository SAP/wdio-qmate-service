"use strict";

describe("assertion - expectTrue", function () {
  it("Execution & Verification", function () {
    common.assertion.expectTrue(true);
    expect(() => common.assertion.expectTrue(false)).toThrow(/Expected\w*|\d*true/);
    expect(() => common.assertion.expectTrue("true")).toThrow(/Expected\w*|\d*true/);
  });
});