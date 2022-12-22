const fs = require("fs");
const path = require("path");

describe("component - loadEntryPoint", function () {
  const filename = "loadEntryPoint.entrypoint.json";
  const data = { purchaseOrder: "123456" };
  let entryPointData;

  it("Preparation", async function () {
    fs.writeFileSync(path.resolve(__dirname, filename), JSON.stringify(data));
  });

  it("Execution", async function () {
    entryPointData = await util.component.loadEntryPoint();
  });

  it("Verification", function () {
    common.assertion.expectEqual(entryPointData, data);
  });

  it("Cleanup", async function () {
    fs.unlinkSync(path.resolve(__dirname, filename));
  });

});

describe("component - loadEntryPoint - error case", function () {
  const filename = "loadEntryPoint.no-such-entrypoint.json";
  const data = { purchaseOrder: "123456" };

  it("Preparation", async function () {
    fs.writeFileSync(path.resolve(__dirname, filename), JSON.stringify(data));
  });

  it("Execution and Verification", async function () {
    await expect(util.component.loadEntryPoint())
      .rejects.toThrow("Function 'readDataFromFile' failed:");
  });

  it("Cleanup", async function () {
    fs.unlinkSync(path.resolve(__dirname, filename));
  });

});