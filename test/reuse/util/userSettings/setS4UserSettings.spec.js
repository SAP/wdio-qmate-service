const data = require("./data/data.json");

describe("userSettings", function () {
  describe("setS4UserSettings.spec - apply all s4 user settings", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
    });

    it("Execution & Verification: Set User Date", async function () {
      await util.userSettings.setS4UserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      common.assertion.expectDefined(process.env.USER_SETTINGS_NUMBER_FORMAT);
      common.assertion.expectDefined(process.env.USER_SETTINGS_TIME_ZONE);
      common.assertion.expectDefined(process.env.USER_SETTINGS_TIME_FORMAT);
      common.assertion.expectDefined(process.env.USER_SETTINGS_DATE_FORMAT);
      common.assertion.expectDefined(process.env.USER_SETTINGS_LANG_KEY);
    });

    describe("setS4UserSettings.spec - apply all s4 user settings via config<->login", function () {
      it("Preparation: Set systemUrl and baseUrl ", async function () {
        browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
        browser.config.baseUrl = util.data.decrypt(data.baseUrl);
      });

      it("Execution & Verification", async function () {
        await ui5.navigation.navigateToApplication("BusinessUser-maintain");
        await ui5.session.login(util.data.decrypt(data.username), util.data.decrypt(data.password));
        common.assertion.expectDefined(process.env.USER_SETTINGS_NUMBER_FORMAT);
        common.assertion.expectDefined(process.env.USER_SETTINGS_TIME_ZONE);
        common.assertion.expectDefined(process.env.USER_SETTINGS_TIME_FORMAT);
        common.assertion.expectDefined(process.env.USER_SETTINGS_DATE_FORMAT);
        common.assertion.expectDefined(process.env.USER_SETTINGS_LANG_KEY);
      });
    });

  });
});
