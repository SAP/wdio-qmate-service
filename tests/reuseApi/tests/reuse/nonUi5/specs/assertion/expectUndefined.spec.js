"use strict";

describe("assertion - expectUndefined", function () {

  it("Execution and Verification", function () {
    non_ui5.common.assertion.expectUndefined(undefined);
    expect(() => non_ui5.common.assertion.expectUndefined(0)).toThrow(/Received\w*|\d*|\s*0/);
    expect(() => non_ui5.common.assertion.expectUndefined(null)).toThrow(/Received\w*|\d*|\s*null/);
    expect(() => non_ui5.common.assertion.expectUndefined(false)).toThrow(/Received\w*|\d*|\s*false/);
  });
});