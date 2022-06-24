"use strict";

describe("navigationBar - expectPageTitle - Home QS9", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://qs9-715.wdf.sap.corp/ui");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectPageTitle("Home");
  });

  it("Clean Up", async function () {
    await ui5.session.logout();
  });

});

describe("navigationBar - expectPageTitle - Home QS9 - Error case", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://qs9-715.wdf.sap.corp/ui");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await expect(ui5.navigationBar.expectPageTitle("Not Home"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });

  it("Clean Up", async function () {
    await ui5.session.logout();
  });

});

describe("navigationBar - expectPageTitle - Home HBR", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://hbr-715.wdf.sap.corp/ui");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.session.login("PURCHASER");
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectPageTitle("Home");
  });

  it("Clean Up", async function () {
    await ui5.session.logout();
  });

});

describe("navigationBar - expectPageTitle - Home HBR - Error case", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://hbr-715.wdf.sap.corp/ui");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.session.login("PURCHASER");
  });

  it("Verification", async function () {
    await expect(ui5.navigationBar.expectPageTitle("Not Home"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });

  it("Clean Up", async function () {
    await ui5.session.logout();
  });
});