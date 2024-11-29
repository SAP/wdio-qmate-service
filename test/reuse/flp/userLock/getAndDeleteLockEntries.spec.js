// const data = require("./data/data.json");

describe("userLocks", function () {

  describe("get.getLockEntries - get user locks", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = "https://hbr-710.devsys.net.sap/";
    });

    it("Execution & Verification: Set User Date", async function () {
      await flp.userLocks.getAndDeleteLockEntries("GL_ACCOUNTANT_LU", "Welcome1!");
    });
  });

});
