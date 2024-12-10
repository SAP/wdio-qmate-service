const data = require("./data/data.json");

describe("userSettings", function () {
  const DATE_FORMAT_LENGTH = 10;

  describe("getDateFormatFromUserSettings.spec - passing date format", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
    });

    it("Execution & Verification: Set User Date", async function () {
      const userDateFormat = await util.userSettings.getDateFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      const date = await common.date.getToday("yyyy/mm/dd");
      const userDate = await common.date.getToday(userDateFormat);
      //Ensure returned date is a valid date
      common.assertion.expectEqual(new Date(date), new Date(userDate));
    });
  });

});
