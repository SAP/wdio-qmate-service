const mockHelper = require("../../utils/mockHelper.js");

describe("Execute all QUnit tests", function () {
  it("Execute QUnits", async function () {
    // Enter path to Qunit html file  
    await ui5.qunit.executeTests("test/unit/unitTests.qunit.html");
  });

  it("Teardown", async function () {
    // Record coverage if needed  
    await mockHelper.takeCoverageSnapshot();
  });

});