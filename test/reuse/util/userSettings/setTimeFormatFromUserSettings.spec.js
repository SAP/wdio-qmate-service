const data = require("./data/data.json");


describe("userSettings", function () {
  describe("setTimeFormatFromUserSettings.spec", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
    });

    it("Execution", async function () {
      await util.userSettings.setTimeFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
    });

  });
});
