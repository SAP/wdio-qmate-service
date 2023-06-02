const path = require("path");

describe("file - getExcelData - Retrieve xls file data", function () {
  let value;

  it("Execution", async function () {
    const xlsPath = path.resolve(__dirname, "./testFiles");
    value = await util.file.getExcelData(xlsPath, "test.xls", 1);
  });

  it("Verification", async function () {
    const valueExp = [{ Number: "1.1", Name: "MAT7_XBOX_SHORT_7_019", Supplier: "BigBox Retail", "Price (USD)\n5/1/2023 - 5/31/2023": "111.0", "Price (USD)\n6/1/2023 - 6/30/2023": "111.0", "Lead Time": "96 Hr", "Manufacturer Name": "", "Manufacturer Part Id": "", "Supplier Part Id": "V00433" }];
    common.assertion.expectEqual(value, valueExp);
  });
});

describe("file - getExcelData - Retrieve xlsx file data", function () {
  let value;

  it("Execution", async function () {
    const xlsxPath = path.resolve(__dirname, "./testFiles");
    value = await util.file.getExcelData(xlsxPath, "test1.xlsx", 1);
  });

  it("Verification", async function () {
    const valueExp = [{ Number: "1.1", Name: "MAT7_XBOX_SHORT_7_019", Supplier: "BigBox Retail", "Price (USD)\n5/1/2023 - 5/31/2023": "111.0", "Price (USD)\n6/1/2023 - 6/30/2023": "111.0", "Lead Time": "96 Hr", "Manufacturer Name": "", "Manufacturer Part Id": "", "Supplier Part Id": "V00433" }];
    common.assertion.expectEqual(value, valueExp);
  });
});

describe("file - getExcelData - test xls to csv file data", function () {
  let value;

  it("Execution", async function () {
    const xlsxPath = path.resolve(__dirname, "./testFiles");
    value = await util.file.getExcelData(xlsxPath, "test.xls", 1, "csv");
  });

  it("Verification", async function () {
    const valueExp = `Number,Name,Supplier,"Price (USD)
5/1/2023 - 5/31/2023","Price (USD)
6/1/2023 - 6/30/2023",Incoterms,Lead Time,Manufacturer Name,Manufacturer Part Id,Supplier Part Id
1.1,MAT7_XBOX_SHORT_7_019,BigBox Retail,111.0,111.0,,96 Hr,,,V00433`;
    common.assertion.expectEqual(value, valueExp);
  });
});

describe("file - getExcelData - test xls to txt file data", function () {
  let value;

  it("Execution", async function () {
    const xlsxPath = path.resolve(__dirname, "./testFiles");
    value = await util.file.getExcelData(xlsxPath, "test.xls", 1, "txt");
  });

  it("Verification", async function () {
    value = value.replace(/[\n\"]/g, "");
    common.assertion.expectTrue(value.length > 0);
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
