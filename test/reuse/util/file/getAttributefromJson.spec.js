const assert = require("assert");
const path = require("path");

describe("file - getAttributeValueFromJson - Retrieve the Attribute from JSON file", function () {
  let value;
  let jsonFile;

  it("Preperation", async function () {
    const pathToFile = path.resolve(__dirname, "./testFiles/test1.json");
    jsonFile = require(pathToFile);
  });

  it("Execution & Verification - 'IBAN'", async () => {
    value = util.file.getAttributeValueFromJson(jsonFile, "IBAN");
    common.assertion.expectEqual(["AT925500011700006258"], value);
  });

  it("Execution & Verification - 'AdrLine'", async () => {
    value = util.file.getAttributeValueFromJson(jsonFile, "AdrLine");
    common.assertion.expectEqual(["Lassallestrasse 1", "1234 Wien"], value);
  });
});

describe("file - getAttributeValueFromJson - Search for not existing value", function () {
  let value;
  let jsonFile;

  it("Preperation", async function () {
    const pathToFile = path.resolve(__dirname, "./testFiles/test1.json");
    jsonFile = require(pathToFile);
  });

  it("Execution & Verification - 'valueNotInJson' - should return null", async () => {
    value = util.file.getAttributeValueFromJson(jsonFile, "valueNotInJson");
    common.assertion.expectEqual(null, value);
  });
});
