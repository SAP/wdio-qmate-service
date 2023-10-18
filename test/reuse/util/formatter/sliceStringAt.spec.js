describe("formatter - sliceStringAt", function () {
  let input;
  let slicePoint;
  let length;
  let sliced;
  let expected;
  let expectedError;

  describe("sliceStringAt - happy case", async function () {
    it("Preparation", function () {
      input = "abcd1234xyz";
      slicePoint = "12";
      length = 4;
      expected = "1234";
    });

    it("Execution", function () {
      sliced = util.formatter.sliceStringAt(input, slicePoint, length);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(sliced, expected);
    });
  });

  describe("sliceStringAt - unhappy case (slice at char which is not present in a string)", async function () {
    it("Preparation", function () {
      input = "abcd1234xyz";
      slicePoint = "s";
      length = 4;
      expectedError = `Function 'sliceStringAt' failed with: Char '${slicePoint}' not found in input '${input}'.`;
    });

    it("Execution & Verification", async function () {
      let error;
      try {
        util.formatter.sliceStringAt(input, slicePoint, length);
      } catch (e) {
        error = e.message;
      }
      await common.assertion.expectEqual(error, expectedError);
    });
  });

  describe("sliceStringAt - unhappy case (pass 2 arguments instead of 3)", async function () {
    it("Preparation", function () {
      input = "abcd1234xyz";
      slicePoint = "12";
      expectedError = `Function 'sliceStringAt' failed with: Incorrect or missing arguments.`;
    });

    it("Execution & Verification", async function () {
      let error;
      try {
        util.formatter.sliceStringAt(input, slicePoint);
      } catch (e) {
        error = e.message;
      }
      await common.assertion.expectEqual(error, expectedError);
    });
  });
});