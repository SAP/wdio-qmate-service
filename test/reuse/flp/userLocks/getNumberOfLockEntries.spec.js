const data = require("./data/data.json");

describe("userLocks", function () {
  let user;
  let pw;

  describe("getNumberOfLockEntries - get user locks", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
      user = util.data.decrypt(data.username);
      pw = util.data.decrypt(data.password);
    });

    it("Execution & Verification: get locks", async function () {
      await flp.userLocks.getNumberOfLockEntries(user, pw);
    });
  });

});
