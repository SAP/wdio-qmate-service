const data = require("./data/data.json");


describe("user", function () {
  describe("get default logon user language", function () {
    it("Execution", async function () {
      await util.user.setDefaultLogonLanguageFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      console.log(process.env.USER_SETTINGS_LANG_KEY);
      common.assertion.expectEqual(process.env.USER_SETTINGS_LANG_KEY.length, 2);
    });
  });
});
