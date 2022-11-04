"use strict";

describe("navigation - closePopups", function () {
  it("Preparation", async function () {
    await ui5.navigation.navigateToSystemAndApplication("<urlToSystem>", "Shell-Home", false);
    await ui5.session.login("AP_ACCOUNTANT");
  });

  it("Execution", async function () {
    await ui5.navigation.closePopups();
  });

  it("Verification", async function () {
    await ui5.session.logout();
  });
});
