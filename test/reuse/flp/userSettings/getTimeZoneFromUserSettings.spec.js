const data = require("./data/data.json");

describe("userSettings", function () {
  describe("getTimeZoneFromUserSettings.spec", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
    });

    it("Execution", async function () {
      const userTimeZone = await flp.userSettings.getTimeZoneFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      common.assertion.expectDefined(userTimeZone); //Europe, Berlin was set.
    });

  });
});
