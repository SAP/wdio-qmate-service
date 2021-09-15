"use strict";

describe("assertion - expectPageTitle equal 'Home' after login", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://qs9-715.wdf.sap.corp/ui";
  });

  it("Execution", async function () {
    await ui5.common.navigation.navigateToApplication("Shell-home", false);
    await ui5.common.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectPageTitle("Home");
    await expect(ui5.common.assertion.expectPageTitle("PurchaseOrder"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});