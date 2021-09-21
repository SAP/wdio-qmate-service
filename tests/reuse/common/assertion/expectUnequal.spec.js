"use strict";

describe("assertion - expectUnequal", function () {
  it("Execution and Verification", function () {
    ui5.assertion.expectUnequal(0, "0");
    ui5.assertion.expectUnequal(true, "true");
    ui5.assertion.expectUnequal(true, false);
    ui5.assertion.expectUnequal(true, 0);
    ui5.assertion.expectUnequal({
      property: "value"
    }, {
      property: "value",
      anotherProp: "value"
    });
    ui5.assertion.expectUnequal([1, 2, ], [1, 2, 3]);
    ui5.assertion.expectUnequal([{
      property: "value"
    }], [{
      property: "value"
    }, 1]);

    expect(() => ui5.assertion.expectUnequal(0, 0)).toThrow(/Expected: not/);
    expect(() => ui5.assertion.expectUnequal(true, true)).toThrow(/Expected: not/);
  });
});