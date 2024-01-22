const path = require("path");
describe("file - getTextData - Retrieve the content from .txt file", function () {
  let value;

  it("Preperation & Execution", async function () {
    const pathToFile = path.resolve(__dirname, "./testFiles/test.txt");
    value = await util.file.getTextData(pathToFile);
  });

  it("Verification", async () => {
    common.assertion.expectEqual(typeof value === "string", true);
  });
});

describe("file - getTextData - Assert if search string is included in file", function () {
  let value;

  it("Preperation & Execution", async function () {
    const pathToFile = path.resolve(__dirname, "./testFiles/test3.txt");
    value = await util.file.getTextData(pathToFile);
  });

  it("Verification", async () => {
    common.assertion.expectEqual(value.includes("FICA payment formats PF_BE"), true);
    common.assertion.expectEqual(value.includes("C000000000100000"), true);
  });
});

describe("file - getTextData - checkFileEnding - Assert correct file ending", function () {
  let pathToFile = null;

  it("Preperation", async function () {
    pathToFile = path.resolve(__dirname, "./testFiles/test1.xml");
  });

  it("Execution & Verification", async () => {
    await expect(util.file.getTextData(pathToFile)).rejects.toThrowError("Function 'getTextData' failed with: Wrong file format 'xml' was passed to function. Expected file format: txt.");
  });
});
