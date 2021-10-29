"use strict";

describe("navigationBar - click Back", async function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://qs9-715.wdf.sap.corp/ui";
    await browser.navigateTo("https://qs9-715.wdf.sap.corp/ui");
    await ui5.session.login("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();

    await ui5.navigationBar.expectPageTitle("Home");

    await ui5.navigation.navigateToApplication("PurchaseOrder-manage", true);
    await ui5.navigationBar.expectPageTitle("Manage Purchase Orders");
  });

  it("Execution and Verification", async function () {
    await ui5.navigationBar.clickBack();
    await ui5.navigationBar.expectPageTitle("Home");
  });
});

describe("navigationBar - click Back and catch error", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://qs9-715.wdf.sap.corp/ui");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.navigationBar.clickBack())
      .rejects.toThrowError(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});