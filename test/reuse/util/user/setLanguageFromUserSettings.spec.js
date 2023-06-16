const path = require("path");
const fs = require("fs");

describe("user", function () {
  describe("get user language", function () {
    it("Execution", async function () {
      await util.user.setLanguageFromUserSettings("<user>", "<pw>");
      console.log(process.env.USER_SETTINGS_LANG_KEY);
      // common.assertion.expectEqual(process.env.USER_SETTINGS_LANG_KEY.length, 2);
    });
  });
});
