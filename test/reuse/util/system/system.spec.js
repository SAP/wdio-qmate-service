const path = require("path");
const fs = require("fs");

describe("system", function () {

  describe("getOS", function () {
    let osName;
    it("Execution", async function () {
      osName = await util.system.getOS();
    });
    it("Verification", async function () {
      await common.assertion.expectDefined(osName);
    });
  });

}); 