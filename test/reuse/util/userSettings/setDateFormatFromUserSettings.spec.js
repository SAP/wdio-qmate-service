const data = require("./data/data.json");

describe("userSettings", function () {
  describe("setDateFormatFromUserSettings.spec", function () {

    it("Execution & Verification: Set User Date", async function () {
      await util.userSettings.setDateFormatFromUserSettings(util.data.decrypt(data.username), util.data.decrypt(data.password));
      const date = await common.date.getToday("yyyy/mm/dd");
      const userDate = await common.date.getToday(process.env.USER_SETTINGS_DATE_FORMAT);
      //Ensure returned date matches 10 digits
      common.assertion.expectEqual(date.length, 10);
      common.assertion.expectEqual(userDate.length, 10);
      //Ensure returned date is a valid date
      common.assertion.expectEqual(new Date(date), new Date(userDate));
    });
  });
});
