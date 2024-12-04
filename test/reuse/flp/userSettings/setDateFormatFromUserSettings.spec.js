const data = require("./data/data.json");

describe("userSettings", function () {
  describe("setDateFormatFromUserSettings.spec - passing date format", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
    });

    it("Execution & Verification: Set User Date", async function () {
      await flp.userSettings.setDateFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      const date = await common.date.getToday("yyyy/mm/dd");
      const userDate = await common.date.getToday(process.env.USER_SETTINGS_DATE_FORMAT);
      //Ensure returned date is a valid date
      common.assertion.expectEqual(new Date(date), new Date(userDate));
    });
  });

  describe("setDateFormatFromUserSettings.spec - do not pass format, defaulted env(process.env.USER_SETTINGS_DATE_FORMAT) is taken", function () {
    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
    });

    it("Execution & Verification ", async function () {
      await flp.userSettings.setDateFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      const date = await common.date.getToday("yyyy/mm/dd");
      const userDate = await common.date.getToday();
      //Ensure returned date is a valid date
      common.assertion.expectEqual(new Date(date), new Date(userDate));
    });
  });

});
