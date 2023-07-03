const path = require("path");
describe("file - getAttributeFromJson - Retrieve the Attribute from JSON file", function () {
  let value;

  it("Preperation & Execution", async function () {
    const pathToFile = path.resolve(__dirname, "./testFiles/test1.json");
    const jsonFile = require(pathToFile);
    value = util.file.getAttributeFromJson(jsonFile, "IBAN");
  });

  it("Verification", async () => {
    common.assertion.expectEqual([ 'AT925500011700006258' ], value);

  });

});
