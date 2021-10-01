"use strict";

describe("navigationBar - expectPageTitle equal 'Home' after login", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://qs9-715.wdf.sap.corp/ui";
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", false);
    await ui5.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectPageTitle("Home");
    await expect(ui5.navigationBar.expectPageTitle("PurchaseOrder"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});