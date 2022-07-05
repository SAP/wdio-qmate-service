"use strict";

describe("assertion - expectUnequal", function () {
  it("Execution & Verification", function () {
    common.assertion.expectUnequal(0, "0");
    common.assertion.expectUnequal(true, "true");
    common.assertion.expectUnequal(true, false);
    common.assertion.expectUnequal(true, 0);
    common.assertion.expectUnequal({
      property: "value"
    }, {
      property: "value",
      anotherProp: "value"
    });
    common.assertion.expectUnequal([1, 2, ], [1, 2, 3]);
    common.assertion.expectUnequal([{
      property: "value"
    }], [{
      property: "value"
    }, 1]);

    expect(() => common.assertion.expectUnequal(0, 0)).toThrow(/Expected: not/);
    expect(() => common.assertion.expectUnequal(true, true)).toThrow(/Expected: not/);
  });
});