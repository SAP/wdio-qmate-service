const data = require("./data/data.json");
// let secureData;

describe("userSettings", function () {
  describe("setLanguageFromUserSettings.spec", function () {

    it("Execution & Verification", async function () {
      await util.userSettings.setLanguageFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      util.console.log(process.env.USER_SETTINGS_LANG_KEY);
      common.assertion.expectEqual(process.env.USER_SETTINGS_LANG_KEY.length, 2);
    });
  });

});
