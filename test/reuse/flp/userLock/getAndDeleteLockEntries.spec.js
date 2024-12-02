const data = require("./data/data.json");

describe("userLocks", function () {
  let user;
  let pw;
  describe("get.getLockEntries - get and delete existing user locks", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
      user = util.data.decrypt(data.username);
      pw = util.data.decrypt(data.password);
    });

    it("Execution & Verification: Set User Date", async function () {
      await flp.userLocks.getAndDeleteLockEntries(user, pw);
    });
  });

});
