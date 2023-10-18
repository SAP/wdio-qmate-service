describe("formatter - sliceStringAfter", function () {
  let input;
  let slicePoint;
  let length;
  let sliced;
  let expected;
  let expectedError;

  describe("sliceStringAfter - happy case", async function () {
    it("Preparation", function () {
      input = "abcd1234xyz";
      slicePoint = "12";
      length = 4;
      expected = "34xy";
    });

    it("Execution", function () {
      sliced = util.formatter.sliceStringAfter(input, slicePoint, length);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(sliced, expected);
    });
  });

  describe("sliceStringAfter - unhappy case (slice at char which is not present in a string)", async function () {
    it("Preparation", function () {
      input = "abcd1234xyz";
      slicePoint = "s";
      length = 4;
      expectedError = `Function 'sliceStringAfter' failed with: Char '${slicePoint}' not found in input '${input}'.`;
    });

    it("Execution & Verification", async function () {
      let error;
      try {
        util.formatter.sliceStringAfter(input, slicePoint, length);
      } catch (e) {
        error = e.message;
      }
      await common.assertion.expectEqual(error, expectedError);
    });
  });

  describe("sliceStringAfter - unhappy case (pass 2 arguments instead of 3)", async function () {
    it("Preparation", function () {
      input = "abcd1234xyz";
      slicePoint = "12";
      expectedError = "Function 'sliceStringAfter' failed with: Incorrect or missing arguments.";
    });

    it("Execution & Verification", async function () {
      let error;
      try {
        util.formatter.sliceStringAfter(input, slicePoint);
      } catch (e) {
        error = e.message;
      }
      await common.assertion.expectEqual(error, expectedError);
    });
  });
});