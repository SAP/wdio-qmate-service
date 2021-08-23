"use strict";

describe("formatter - addRemoveLeadingZeros - add zeros", function () {
  it("Execution and Verification", function () {
    const newValue = ui5.common.formatter.addRemoveLeadingZeros(10, 5);
    ui5.common.assertion.expectEqual(newValue, "00010");

    ui5.common.assertion.expectEqual(
      newValue,
      ui5.common.formatter.addRemoveLeadingZeros("10", 5)
    );

    ui5.common.assertion.expectEqual(
      newValue,
      ui5.common.formatter.addRemoveLeadingZeros(new Number(10), 5)
    );
  });
});


describe("formatter - addRemoveLeadingZeros - remove zeros", function () {
  it("Execution and Verification", function () {
    const newValue = ui5.common.formatter.addRemoveLeadingZeros("0000010", 2);
    const newShortValue = ui5.common.formatter.addRemoveLeadingZeros("0000010", 1);

    ui5.common.assertion.expectEqual(newValue, "10");
    ui5.common.assertion.expectEqual(newShortValue, "0");
  });
});