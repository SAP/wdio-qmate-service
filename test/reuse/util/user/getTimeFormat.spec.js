const path = require("path");
const fs = require("fs");

describe("user", function () {
  describe("get user language", function () {
    it("Execution", async function () {
      await util.user.getTimeFormat("<user>", "<pw>!");
      console.log(process.env.USER_SETTINGS_TIME_FORMAT);
    });
  });
});
