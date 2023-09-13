const path = require("path");
describe("file - expectTextDataToContain - Expect the passed .txt file to contain a certain value", function () {
  it("Preperation & Execution & Verification", async function () {
    const pathToFile = path.resolve(__dirname, "./testFiles/test3.txt");
    await util.file.expectTextDataToContain(pathToFile, "10001079QV4PU6C0G");
  });
});

describe("file - expectTextDataToContain - Expect the passed .txt file to not contain a certain value", function () {
  it("Preperation & Execution & Verification", async function () {
    const pathToFile = path.resolve(__dirname, "./testFiles/test3.txt");
    await expect(util.file.expectTextDataToContain(pathToFile, "STREET 000")).rejects.toThrowError("Function 'expectTextDataToContain' failed with: Search String not included in .txt file.");
  });
});
