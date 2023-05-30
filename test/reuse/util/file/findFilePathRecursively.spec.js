const path = require("path");

describe("file - findFilePathRecursively - It fetches the absolute file path", function () {
  let value;
  
  it("Execution", async function () {
    const xlsPath = path.resolve(__dirname, "./testFiles");
    value = await util.file.getAbsoluteFilePath(xlsPath, "test.xls");
  });

  it("Verification", async function () {
    await common.assertion.expectDefined(value);
  });
});
