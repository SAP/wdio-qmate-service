const assert = require("assert");
const path = require("path");

describe("file - getAttributeValuesFromJson - Retrieve the Attribute from JSON file", function () {
  let value;
  let jsonFile;

  it("Preperation", async function () {
    const pathToFile = path.resolve(__dirname, "./testFiles/test1.json");
    jsonFile = require(pathToFile);
  });

  it("Execution & Verification - 'IBAN' - get multiple results", async () => {
    value = util.file.getAttributeValuesFromJson(jsonFile, "IBAN");
    common.assertion.expectEqual(["AT925500011700006258" ,"AT816000000007654321"], value);
  });

  it("Execution & Verification - 'AdrLine'", async () => {
    value = util.file.getAttributeValuesFromJson(jsonFile, "AdrLine");
    common.assertion.expectEqual(["Lassallestrasse 1", "1234 Wien"], value);
  });
});

describe("file - getAttributeValuesFromJson - Search for not existing value", function () {
  let value;
  let jsonFile;

  it("Preperation", async function () {
    const pathToFile = path.resolve(__dirname, "./testFiles/test1.json");
    jsonFile = require(pathToFile);
  });

  it("Execution & Verification - 'valueNotInJson' - should return null", async () => {
    value = util.file.getAttributeValuesFromJson(jsonFile, "valueNotInJson");
    common.assertion.expectEqual([], value);
  });
});
