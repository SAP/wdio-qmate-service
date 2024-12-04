const data = require("./data/data.json");


describe("userSettings", function () {
  describe("setTimeFormatFromUserSettings.spec", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
    });

    it("Execution & Verification", async function () {
      await flp.userSettings.setTimeFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      common.assertion.expectDefined(process.env.USER_SETTINGS_TIME_FORMAT); //12 Hour Format
    });

  });
});
