const data = require("./data/data.json");


describe("userSettings", function () {
  describe("getTimeFormatFromUserSettings.spec", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
    });

    it("Execution", async function () {
      const userTimeFormat = await flp.userSettings.getTimeFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      common.assertion.expectDefined(userTimeFormat); //12 Hour Format (Example: 12:05:10 PM)
    });

  });
});
