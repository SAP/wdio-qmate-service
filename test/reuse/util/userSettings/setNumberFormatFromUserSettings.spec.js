const data = require("./data/data.json");


describe("userSettings", function () {
  describe("setNumberFormatFromUserSettings.spec", function () {
  
    it("Execution", async function () {
      await util.userSettings.setNumberFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      util.console.log(process.env.USER_SETTINGS_NUMBER_FORMAT);
    });
  });
});
