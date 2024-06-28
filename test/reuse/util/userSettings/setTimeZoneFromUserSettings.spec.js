const data = require("./data/data.json");

describe("user", function () {
  describe("setTimeZoneFromUserSettings.spec", function () {
    it("Execution", async function () {
      await util.user.setTimeZoneFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      console.log(process.env.USER_SETTINGS_TIME_ZONE);
    });
  });
});
