describe("formatter - addRemoveLeadingZeros", function () {
  let input;
  let length;
  let sliced;
  let expected;

  describe("formatter - addRemoveLeadingZeros - add zeros", function () {
    it("Execution & Verification", function () {
      common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros(10, 5), "00010");
      common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros("12", 4), "0012");
      common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros("0014", 5), "00014");
      common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros("11", 2), "11");
      common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros(new Number(10), 5), "00010");
    });
  });


  describe("formatter - addRemoveLeadingZeros - remove zeros", function () {
    it("Execution & Verification", function () {
      common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros("0000010", 2), "10");
      common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros("0000010", 1), "0");
      common.assertion.expectEqual(util.formatter.addRemoveLeadingZeros("00012", 3), "012");
    });
  });
});