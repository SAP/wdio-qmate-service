describe("formatter - stringifyJSON", function () {
  let input;
  let expected;
  let stringified;

  describe("stringifyJSON - happy case", async function () {
    it("Preparation", function () {
      input = {
        "a": 123,
        "b": 456,
        "c": 789
      };
      expected = JSON.stringify(input);
    });

    it("Execution", function () {
      stringified = util.formatter.stringifyJSON(input);
    });

    it("Verification", async function () {
      await common.assertion.expectEqual(stringified, expected);
    });
  });
});