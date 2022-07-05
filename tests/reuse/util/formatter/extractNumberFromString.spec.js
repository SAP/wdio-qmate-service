describe("formatter - extractNumberFromString", function () {
  let input;
  let expected;
  let extracted;
  let expectedError;

  describe("extractNumberFromString - happy case (first number in a string is returned with no index specified)", async function () {
    it("Preparation", function () {
      input = "abcd1234xyz 8778";
      expected = "1234";
    });

    it("Execution", function () {
      extracted = util.formatter.extractNumberFromString(input);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(extracted, expected);
    });
  });

  describe("extractNumberFromString - happy case (first number in a string is returned with an index specified as 0)", async function () {
    it("Preparation", function () {
      input = "abcd1234xyz 8778";
      expected = "1234";
    });

    it("Execution", function () {
      extracted = util.formatter.extractNumberFromString(input, 0);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(extracted, expected);
    });
  });

  describe("extractNumberFromString - happy case (second number in a string is returned with an index specified as 1)", async function () {
    it("Preparation", function () {
      input = "abcd1234xyz 8778";
      expected = "8778";
    });

    it("Execution", function () {
      extracted = util.formatter.extractNumberFromString(input, 1);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(extracted, expected);
    });
  });

  describe("extractNumberFromString - unhappy case (throws an error in case called with no arguments)", async function () {
    it("Preparation", function () {
      expectedError = "Function 'extractNumberFromString' failed: Incorrect or missing arguments.";
    });

    it("Execution & Verification", async function () {
      let error;
      try {
        util.formatter.extractNumberFromString();
      } catch (e) {
        error = e.message;
      }
      await common.assertion.expectEqual(error, expectedError);
    });
  });
});