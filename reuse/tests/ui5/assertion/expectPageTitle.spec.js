"use strict";

describe("assertion - expectPageTitle equal 'Home' after login", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://super-sensitive.domain.name/ui";
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", false);
    await ui5.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await ui5.assertion.expectPageTitle("Home");
    await expect(ui5.assertion.expectPageTitle("PurchaseOrder"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});