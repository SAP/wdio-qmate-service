const path = require("path");
const fs = require("fs");

describe("user", function () {
  describe("get user language", function () {
    it("Execution", async function () {
      await util.user.getDateFormat("<user>", "<pw>!");
      console.log(process.env.USER_SETTINGS_DATE_FORMAT);
    });
  });
});
