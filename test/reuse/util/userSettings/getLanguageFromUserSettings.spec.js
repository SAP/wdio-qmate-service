const data = require("./data/data.json");

describe("userSettings", function () {
  describe("getLanguageFromUserSettings.spec", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
    });

    it("Execution & Verification", async function () {
      const userLanguage = await util.userSettings.getLanguageFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      common.assertion.expectEqual(userLanguage.length, 2);
    });
  });
});
