const data = require("./data/data.json");

describe("userSettings", function () {
  describe("setLanguageFromUserSettings.spec", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
    });

    it("Execution & Verification", async function () {
      await util.userSettings.setLanguageFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      common.assertion.expectEqual(process.env.USER_SETTINGS_LANG_KEY.length, 2); //Output: en
    });
  });

});
