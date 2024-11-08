const data = require("./data/data.json");


describe("userSettings", function () {
  describe("setTimeFormatFromUserSettings.spec", function () {
  
    it("Execution", async function () {
      await util.userSettings.setTimeFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      util.console.log(process.env.USER_SETTINGS_TIME_FORMAT);
    });
 
  });
});
