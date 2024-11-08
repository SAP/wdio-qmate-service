const data = require("./data/data.json");


describe("user", function () {
  describe("get user language", function () {
    it("Execution", async function () {
      await util.userSettings.setNumberFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      util.console.log(process.env.USER_SETTINGS_NUMBER_FORMAT);
    });
  });
});
