const fs = require("fs");
const path = require("path");

describe("component - loadEntryPoint", function () {
  const filename = "loadEntryPoint.entrypoint.json";
  const folderPath = path.resolve(__dirname, "entrypoints");
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
    fs.unlinkSync(path.resolve(folderPath, filename));
  });
});

describe("component - loadEntryPoint - custom folder path", function () {
  const filename = "loadEntryPoint.entrypoint.json";
  const folderPath = path.resolve(__dirname, "myEntrypoints");
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
    fs.unlinkSync(path.resolve(folderPath, filename));
  });
});

describe("component - loadEntryPoint - error case", function () {
  const filename = "loadEntryPoint.no-such-entrypoint.json";
  const folderPath = path.resolve(__dirname, "entrypoints");
  const data = { purchaseOrder: "123456" };

  it("Preparation", async function () {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    fs.writeFileSync(path.resolve(folderPath, filename), JSON.stringify(data));
  });

  it("Execution & Verification", async function () {
    await expect(util.component.loadEntryPoint()).rejects.toThrow("Function 'readDataFromFile' failed:");
  });

  it("Cleanup", async function () {
    fs.unlinkSync(path.resolve(folderPath, filename));
  });
});
