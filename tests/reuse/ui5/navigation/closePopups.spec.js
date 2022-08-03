"use strict";

describe("navigation - closePopups (S4)", function () {
  const system = "super-sensitive.domain.name";

  it("Execution and Verification", async function () {
    await ui5.navigation.closePopups(30000);
    await ui5.navigation.navigateToSystemAndApplication(system, "Shell-home", false);
    await ui5.session.loginFiori("PURCHASER");
    await util.browser.sleep(30000);
  });

  it("Verification and Clean Up", async function () {
    // When the popup is not closed, logout will not work
    try {
      await ui5.session.logout();
    } catch (e) {
      // Reload Session so the Cleanup is done correctly for the next test
      await browser.reloadSession();
      throw new Error(e);
    }
  });
});
