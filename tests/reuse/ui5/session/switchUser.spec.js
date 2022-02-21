"use strict";

describe("session - switchUser in fiori", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://qs9-715.wdf.sap.corp/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
    await ui5.session.login("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();
    await ui5.navigationBar.expectShellHeader();
  });

  it("Execution", async function () {
    await ui5.session.switchUser("AP_ACCOUNTANT");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectShellHeader();
  });

  it("Cleanup", async function () {
    await ui5.session.logout();
  });
});

describe("session - switchUser in sapCloud", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://hbr-715.wdf.sap.corp/ui");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.session.loginSapCloud("PURCHASER");
    await ui5.navigationBar.expectShellHeader();
  });

  it("Execution", async function () {
    await ui5.session.switchUser("AP_ACCOUNTANT", "Welcome1!", ui5.authenticators.sapCloudForm);
    await ui5.navigation.navigateToApplication("Shell-home", true);
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectShellHeader();
  });

  it("Cleanup", async function () {
    await ui5.session.logout();
  });
});