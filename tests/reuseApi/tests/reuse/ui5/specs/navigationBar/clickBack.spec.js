"use strict";

describe("navigationBar - click Back", async function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://cc3-721.wdf.sap.corp/ui";
    await browser.navigateTo("https://cc3-721.wdf.sap.corp/ui");
    await ui5.common.session.login("PURCHASER");
    await ui5.common.navigation.navigateToApplication("Shell-home", true);
    await ui5.common.navigation.closePopups();

    await ui5.common.assertion.expectPageTitle("Home");

    await ui5.common.navigation.navigateToApplication("PurchaseOrder-manage", true);
    await ui5.common.assertion.expectPageTitle("Manage Purchase Orders");
  });

  it("Execution and Verification", async function () {
    await ui5.common.navigationBar.clickBack();
    await ui5.common.assertion.expectPageTitle("Home");
  });
});

describe("navigationBar - click Back and catch error", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://cc3-721.wdf.sap.corp/ui");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.common.navigationBar.clickBack())
      .rejects.toThrowError(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});
