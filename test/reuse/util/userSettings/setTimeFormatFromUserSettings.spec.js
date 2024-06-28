const data = require("./data/data.json");


describe("user", function () {
  describe("get user language", function () {
    it("Execution", async function () {
      await util.user.setTimeFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      console.log(process.env.USER_SETTINGS_TIME_FORMAT);
    });
  });
});
