const path = require("path");
const fs = require("fs");

describe("user", function () {
  describe("get user language", function () {
    it("Execution", async function () {
      await util.user.getTimeFormat("TESTER_GSFINDE_EX01", "Welcome1!");
      console.log(process.env.USER_SETTINGS_TIME_FORMAT);
    });
  });
});
