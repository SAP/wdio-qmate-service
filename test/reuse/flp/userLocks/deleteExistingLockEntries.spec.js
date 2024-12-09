const data = require("./data/data.json");

describe("userLocks", function () {
  let user;
  let pw;
  describe("deleteExistingLockEntries - get and delete existing user locks", function () {

    it("Preparation: Set systemUrl ", async function () {
      browser.config.params.systemUrl = util.data.decrypt(data.systemUrl);
      browser.config.baseUrl = util.data.decrypt(data.baseUrl);
      user = util.data.decrypt(data.username);
      pw = util.data.decrypt(data.password);
    });

    it("Preparation: Navigate to application", async function () {
      await ui5.navigation.navigateToApplication("ForeignExchangeFixingReference-createFXFixingReference");
    });

    it("Preparation: Login", async function () {
      await ui5.session.login(user, pw);
    });

    it("Preparation: Switch to iframe", async function () {
      await util.browser.switchToIframe("iframe[id='application-ForeignExchangeFixingReference-createFXFixingReference-iframe']");
    });

    it("Preparation: Click 'New Entry'", async function () {
      await nonUi5.userInteraction.click("div[id='M0:48::btn[5]']");
    });

    it("Execution & Verification: delete existing locks", async function () {
      await flp.userLocks.deleteExistingLockEntries(user, pw);
    });

  });

});
