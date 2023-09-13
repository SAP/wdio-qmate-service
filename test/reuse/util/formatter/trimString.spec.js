describe("formatter - trimString", function () {
  let input;
  let expected;
  let trimmed;
  let expectedError;

  describe("trimString - happy case", async function () {
    it("Preparation", function () {
      input = "    abcd1234xyz    ";
      expected = "abcd1234xyz";
    });

    it("Execution", function () {
      trimmed = util.formatter.trimString(input);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(trimmed, expected);
    });
  });

  describe("trimString - unhappy case (call function with no arguments)", async function () {
    it("Preparation", function () {
      expectedError = "Function 'trimString' failed with: Incorrect or missing arguments.";
    });

    it("Execution & Verification", async function () {
      let error;
      try {
        util.formatter.trimString();
      } catch (e) {
        error = e.message;
      }
      await common.assertion.expectEqual(error, expectedError);
    });
  });
});
