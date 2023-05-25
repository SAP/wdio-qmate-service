const path = require("path");

describe("file - getExcelData - Retrieve xls file data", function () {
  let value;

  it("Execution", async function () {
    const xlsPath = path.resolve(__dirname, "./testFiles");
    value = await util.file.getExcelData(xlsPath, "test.xls", 1);
  });

  it("Verification", async function () {
    common.assertion.expectDefined(value);
  });
});

describe("file - getExcelData - Retrieve xlsx file data", function () {
  let value;

  it("Execution", async function () {
    const xlsxPath = path.resolve(__dirname, "./testFiles");
    value = await util.file.getExcelData(xlsxPath, "test1.xlsx", 1);
  });

  it("Verification", async function () {
    common.assertion.expectDefined(value);
  });
});

describe("file - getExcelData - error case for in correct sheet index", function () {
  it("Execution & Verification", async function () {
    const xlsPath = path.resolve(__dirname, "./testFiles");
    await expect(async () => {
      await util.file.getExcelData(xlsPath, "test.xls", 2);
    }).rejects.toThrow("The specified sheet index '2' is invalid for the Excel file.");
  });
});

describe("file - getExcelData - error case for in wrong file", function () {
  it("Execution & Verification", async function () {
    const xlsPath = path.resolve(__dirname, "./testFiles");
    await expect(async () => {
      await util.file.getExcelData(xlsPath, "test.txt");
    }).rejects.toThrow("The specified file 'test.txt' doesn't exist in the directory:");
  });
});
