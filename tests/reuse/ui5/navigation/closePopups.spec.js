"use strict";

describe("navigation - closePopups", function () {
  const system = "hbr-710.wdf.sap.corp";

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
