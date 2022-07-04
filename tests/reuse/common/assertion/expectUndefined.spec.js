"use strict";

describe("assertion - expectUndefined", function () {

  it("Execution & Verification", function () {
    common.assertion.expectUndefined(undefined);
    expect(() => common.assertion.expectUndefined(0)).toThrow(/Received\w*|\d*|\s*0/);
    expect(() => common.assertion.expectUndefined(null)).toThrow(/Received\w*|\d*|\s*null/);
    expect(() => common.assertion.expectUndefined(false)).toThrow(/Received\w*|\d*|\s*false/);
  });
});