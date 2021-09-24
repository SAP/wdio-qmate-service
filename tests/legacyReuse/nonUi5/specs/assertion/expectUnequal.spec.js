"use strict";

describe("assertion - expectUnequal", function () {
  it("Execution and Verification", function () {
    non_ui5.common.assertion.expectUnequal(0, "0");
    non_ui5.common.assertion.expectUnequal(true, "true");
    non_ui5.common.assertion.expectUnequal(true, false);
    non_ui5.common.assertion.expectUnequal(true, 0);
    non_ui5.common.assertion.expectUnequal({ property: "value" }, { property: "value", anotherProp: "value" });
    non_ui5.common.assertion.expectUnequal([1, 2,], [1, 2, 3]);
    non_ui5.common.assertion.expectUnequal([{ property: "value" }], [{ property: "value" }, 1]);

    expect(() => non_ui5.common.assertion.expectUnequal(0, 0)).toThrow(/Expected: not/);
    expect(() => non_ui5.common.assertion.expectUnequal(true, true)).toThrow(/Expected: not/);
  });
});