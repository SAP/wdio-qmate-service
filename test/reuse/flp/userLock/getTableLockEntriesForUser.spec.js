// const data = require("./data/data.json");

describe("userSettings", function () {
  // const DATE_FORMAT_LENGTH = 10;

  describe("getDateFormatFromUserSettings.spec - passing date format", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = "https://hbr-710.devsys.net.sap/";
    });

    it("Execution & Verification: Set User Date", async function () {
      await flp.userLocks.getLockEntries("GL_ACCOUNTANT_LU", "Welcome1!");
    });
  });

});
