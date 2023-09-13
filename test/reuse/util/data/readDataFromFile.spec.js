const fs = require("fs");
const path = require("path");

describe("data - readDataFromFile", function () {
  const filename = "data/test.json";
  let dataAct, dataExp;

  it("Preparation", async function () {
    dataExp = JSON.parse(fs.readFileSync(path.resolve(__dirname, filename)));
  });

  it("Execution", async function () {
    dataAct = await util.data.readDataFromFile(filename);
  });

  it("Verification", function () {
    common.assertion.expectEqual(dataAct, dataExp);
  });
});

describe("data - readDataFromFile - error case", function () {
  it("Execution and Verification", async function () {
    await expect(util.data.readDataFromFile("data/no-such-file.json")).rejects.toThrow("Function 'readDataFromFile' failed with:");
  });
});
