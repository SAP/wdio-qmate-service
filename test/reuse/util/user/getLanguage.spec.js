const path = require("path");
const fs = require("fs");

describe("user", function () {
  describe("get user language", function () {
    it("Execution", async function () {
      await util.user.getLanguage("TESTER_GSFINDE_EX01", "Welcome1!");
      common.assertion.expectEqual(process.env.USER_SETTINGS_LANG_KEY.length, 2);
    });
  });
});
