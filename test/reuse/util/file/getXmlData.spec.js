const path = require("path");
describe("file - getXmlData - Retrieve XML file data as JSON", function () {
  let value;

  it("Preperation & Execution", async function () {
    const pathToFile = path.resolve(__dirname, "./testFiles/test1.xml");
    value = await util.file.getXmlData(pathToFile);
  });

  it("Verification", async () => {
    common.assertion.expectEqual(typeof value === "object", true);
  });

  describe("file - getXmlData - Assert if values are included", function () {
    let value;
    it("Preperation & Execution", async function () {
      const pathToFile = path.resolve(__dirname, "./testFiles/test1.xml");
      value = await util.file.getXmlData(pathToFile);
    });

    it("Verification", async () => {
      const isAuthorIncluded = JSON.stringify(value).includes("Ralls, Kim");
      common.assertion.expectEqual(isAuthorIncluded, true);
    });
  });

  describe("file - getXmlData - Assert if JSON was trimmed and normalized", function () {
    let value;
    it("Preperation & Execution", async function () {
      const pathToFile = path.resolve(__dirname, "./testFiles/test2.xml");
      value = await util.file.getXmlData(pathToFile);
    });

    it("Verification", async () => {
      const jsonString = JSON.stringify(value);
      const trimmedJson = JSON.parse(jsonString.trim());
      common.assertion.expectEqual(value, trimmedJson);
    });
  });
});
