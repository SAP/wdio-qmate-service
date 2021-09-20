"use strict";

describe("navigationBar - click Back", async function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://super-sensitive.domain.name/ui";
    await browser.navigateTo("https://super-sensitive.domain.name/ui");
    await ui5.session.login("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();

    await ui5.assertion.expectPageTitle("Home");

    await ui5.navigation.navigateToApplication("PurchaseOrder-manage", true);
    await ui5.assertion.expectPageTitle("Manage Purchase Orders");
  });

  it("Execution and Verification", async function () {
    await ui5.navigationBar.clickBack();
    await ui5.assertion.expectPageTitle("Home");
  });
});

describe("navigationBar - click Back and catch error", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://super-sensitive.domain.name/ui");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.navigationBar.clickBack())
      .rejects.toThrowError(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});