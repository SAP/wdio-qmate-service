const path = require("path");
const fs = require("fs");

describe("user", function () {
  describe("get user language", function () {
    it("Execution", async function () {
      await util.user.getNumberFormat("<user>", "<pw>");
      console.log(process.env.USER_SETTINGS_NUMBER_FORMAT);
    });
  });
});
