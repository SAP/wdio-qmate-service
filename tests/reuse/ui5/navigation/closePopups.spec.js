"use strict";

describe("navigation - closePopups", function () {
  const system = "super-sensitive.domain.name";

  it("Preparation", async function () {
    await ui5.navigation.navigateToSystemAndApplication(system, "SupplierInvoice-create", false);
    await ui5.session.login("AP_ACCOUNTANT");
    // await util.browser.sleep(20000);
  });

  it("Execution", async function () {
    await ui5.navigation.closePopups();
  });

  it("Verification", async function () {
    await ui5.session.logout();
  });
});
