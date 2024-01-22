const fs = require("fs");
const path = require("path");

describe("data - writeDataToFile", function () {
  const filename = "data/test-out.json";
  const data = { purchaseOrder: "123456" };

  it("Execution", async function () {
    await util.data.writeDataToFile(filename, data);
  });

  it("Verification", async function () {
    const dataAct = await util.data.readDataFromFile(filename);
    common.assertion.expectEqual(dataAct, data);
  });

  it("Cleanup", async function () {
    fs.unlinkSync(path.resolve(__dirname, filename));
  });
});

describe("data - writeDataToFile - error case", function () {
  const data = { purchaseOrder: "123456" };

  it("Execution and Verification", async function () {
    await expect(util.data.writeDataToFile("no-such-folder/test-out.json", data)).rejects.toThrow("Function 'writeDataToFile' failed with:");
  });
});
