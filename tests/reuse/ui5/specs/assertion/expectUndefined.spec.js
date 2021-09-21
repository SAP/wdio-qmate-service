"use strict";

describe("assertion - expectUndefined", function () {

  it("Execution and Verification", function () {
    ui5.common.assertion.expectUndefined(undefined);
    expect(() => ui5.common.assertion.expectUndefined(0)).toThrow(/Received\w*|\d*|\s*0/);
    expect(() => ui5.common.assertion.expectUndefined(null)).toThrow(/Received\w*|\d*|\s*null/);
    expect(() => ui5.common.assertion.expectUndefined(false)).toThrow(/Received\w*|\d*|\s*false/);
  });
});