const path = require("path");

describe("file - findFilePathRecursively - test the absolute file path for xls", function () {
  let value;

  it("Execution", async function () {
    const xlsPath = path.resolve(__dirname, "./testFiles");
    value = await util.file.findFilePathRecursively(xlsPath, "test.xls");
  });

  it("Verification", async function () {
    common.assertion.expectTrue(value.includes("test.xls"));
  });
});
