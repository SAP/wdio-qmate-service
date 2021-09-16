"use strict";

describe("formatter - addRemoveLeadingZeros - add zeros", function () {
  it("Execution and Verification", function () {
    ui5.common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros(10, 5), "00010");
    ui5.common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros("12", 4), "0012");
    ui5.common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros("0014", 5), "00014");
    ui5.common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros("11", 2), "11");
    ui5.common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros(new Number(10), 5), "00010");
  });
});

describe("formatter - addRemoveLeadingZeros - remove zeros", function () {
  it("Execution and Verification", function () {
    ui5.common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros("0000010", 2), "10");
    ui5.common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros("0000010", 1), "0");
  });
});