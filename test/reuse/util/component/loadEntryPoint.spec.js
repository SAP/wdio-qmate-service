const fs = require("fs");
const path = require("path");
const os = require("os");

describe("component - loadEntryPoint", function () {
  const filename = "loadEntryPoint.entrypoint.json";
  const folderPath = "entrypoints";
  const data = { purchaseOrder: "123456" };
  let entryPointData;

  it("Preparation", async function () {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    fs.writeFileSync(path.resolve(folderPath, filename), JSON.stringify(data));
  });

  it("Execution", async function () {
    entryPointData = await util.component.loadEntryPoint();
  });

  it("Verification", function () {
    common.assertion.expectEqual(entryPointData, data);
  });

  it("Cleanup", async function () {
    await fs.promises.rm(folderPath, {recursive: true, force: true});
  });
});

describe("component - loadEntryPoint - custom folder path", function () {
  const filename = "loadEntryPoint.entrypoint.json";
  const folderPath = path.resolve(os.tmpdir(), "entrypointsLoad");
  const data = { purchaseOrder: "123456" };
  let entryPointData;

  it("Preparation", async function () {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    fs.writeFileSync(path.resolve(folderPath, filename), JSON.stringify(data));
  });

  it("Execution", async function () {
    entryPointData = await util.component.loadEntryPoint(folderPath);
  });

  it("Verification", function () {
    common.assertion.expectEqual(entryPointData, data);
  });

  it("Cleanup", async function () {
    await fs.promises.rm(folderPath, {recursive: true, force: true});
  });
});

describe("component - loadEntryPoint - error case", function () {
  const folderPath = path.resolve(os.tmpdir(), "entrypointsLoad");

  it("Execution & Verification", async function () {
    await expect(util.component.loadEntryPoint(folderPath)).rejects.toThrow("Function 'loadEntryPoint' failed with:");
  });

});
