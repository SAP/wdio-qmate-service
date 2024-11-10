const data = require("./data/data.json");


describe("userSettings", function () {
  describe("setNumberFormatFromUserSettings.spec", function () {
    
    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
    });

    it("Execution", async function () {
      await util.userSettings.setNumberFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
    });
  });
});
