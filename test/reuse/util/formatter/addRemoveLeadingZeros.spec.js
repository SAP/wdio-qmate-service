describe("formatter - addRemoveLeadingZeros", function () {
  let input;
  let length;
  let sliced;
  let expected;

  describe("addRemoveLeadingZeros - add zeros to the number", async function () {
    it("Preparation", function () {
      input = "12";
      length = 4;
      expected = "0012";
    });

    it("Execution", function () {
      sliced = util.formatter.addRemoveLeadingZeros(input, length);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(sliced, expected);
    });
  });

  describe("addRemoveLeadingZeros - remove zeros from number", async function () {
    it("Preparation", function () {
      input = "00012";
      length = 3;
      expected = "012";
    });

    it("Execution", function () {
      sliced = util.formatter.addRemoveLeadingZeros(input, length);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(sliced, expected);
    });
  });
});