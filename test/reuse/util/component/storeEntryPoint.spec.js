const fs = require("fs");
const path = require("path");
const os = require("os");

describe("component - storeEntryPoint - custom folder path", function () {
  const filename = "storeEntryPoint.entrypoint.json";
  const folderPath = path.resolve(os.tmpdir(), "entrypointsStore");
  const data = { purchaseOrder: "123456" };

  it("Execution", async function () {
    await util.component.storeEntryPoint(data, folderPath);
  });

  it("Verification", async function () {
    const dataAct = await util.data.readDataFromFile(path.resolve(folderPath, filename));
    common.assertion.expectEqual(dataAct, data);
  });

  it("Cleanup", async function () {
    await fs.promises.rm(folderPath, {recursive: true, force: true});
  });

});

describe("component - storeEntryPoint - error case", function () {
  const folderPath = path.resolve(os.tmpdir(), "entrypointsStore");
  
  it("Execution & Verification", async function () {
    await expect(util.component.storeEntryPoint(undefined, folderPath))
      .rejects.toThrow("Function 'storeEntryPoint' failed with:");
  });

  it("Cleanup", async function () {
    await fs.promises.rm(folderPath, {recursive: true, force: true});
  });

});

// this test has been moved down, and sleep added to
// avoid race condition with loadEntryPoint tests
// since both use the same folder
describe("component - storeEntryPoint", function () {
  const filename = "storeEntryPoint.entrypoint.json";
  const folderPath = "entrypoints";
  const data = { purchaseOrder: "123456" };

  it("Execution", async function () {
    await util.browser.sleep(1000);
    await util.component.storeEntryPoint(data);
  });

  it("Verification", async function () {
    const dataAct = await util.data.readDataFromFile(path.resolve(folderPath, filename));
    common.assertion.expectEqual(dataAct, data);
  });

  it("Cleanup", async function () {
    await fs.promises.rm(folderPath, {recursive: true, force: true});
  });

});