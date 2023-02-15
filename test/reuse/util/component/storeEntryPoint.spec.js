const fs = require("fs");
const path = require("path");

describe("component - storeEntryPoint", function () {
  const filename = "storeEntryPoint.entrypoint.json";
  const folderPath = path.resolve(__dirname, "entrypoints");
  const data = { purchaseOrder: "123456" };

  it("Execution", async function () {
    await util.component.storeEntryPoint(data);
  });

  it("Verification", async function () {
    const dataAct = await util.data.readDataFromFile(path.resolve(folderPath, filename));
    common.assertion.expectEqual(dataAct, data);
  });

  it("Cleanup", async function () {
    fs.unlinkSync(path.resolve(folderPath, filename));
  });

});

describe("component - storeEntryPoint - custom folder path", function () {
  const filename = "storeEntryPoint.entrypoint.json";
  const folderPath = path.resolve(__dirname, "myEntrypoints");
  const data = { purchaseOrder: "123456" };

  it("Execution", async function () {
    await util.component.storeEntryPoint(data, folderPath);
  });

  it("Verification", async function () {
    const dataAct = await util.data.readDataFromFile(path.resolve(folderPath, filename));
    common.assertion.expectEqual(dataAct, data);
  });

  it("Cleanup", async function () {
    fs.unlinkSync(path.resolve(folderPath, filename));
  });

});

describe("component - storeEntryPoint - error case", function () {

  it("Execution & Verification", async function () {
    await expect(util.component.storeEntryPoint())
      .rejects.toThrow("Function 'writeDataToFile' failed:");
  });

});