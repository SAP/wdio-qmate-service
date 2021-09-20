"use strict";
// Note: need to dynamically switch base urls in the spec as we run tests against multiple systems

describe("session - switchUser in fiori", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://qs9-715.wdf.sap.corp/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
    await ui5.session.login("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();
    await ui5.assertion.expectShellHeader();
  });

  it("Execution", async function () {
    await ui5.session.switchUser("AP_ACCOUNTANT");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();
  });

  it("Verification", async function () {
    await ui5.assertion.expectShellHeader();
  });

  it("Cleanup", async function () {
    await ui5.session.logout();
  });
});

// Note: "https://hbr-715.wdf.sap.corp/ui" is down from time to time, so tests are skipped
describe.skip("session - switchUser in sapCloud", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://hbr-715.wdf.sap.corp/ui");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.session.loginSapCloud("PURCHASER");

    // closePopups() call is not required for "https://hbr-715.wdf.sap.corp/ui",
    // it just makes test execution longer
    // await ui5.navigation.closePopups();

    await ui5.assertion.expectShellHeader();
  });

  it("Execution", async function () {
    await ui5.session.switchUser("AP_ACCOUNTANT", "Welcome1!", ui5.common.authenticators.sapCloudForm);
    await ui5.navigation.navigateToApplication("Shell-home", true);

    // closePopups() call is not required for "https://hbr-715.wdf.sap.corp/ui",
    // it just makes test execution longer
    // await ui5.navigation.closePopups();
  });

  it("Verification", async function () {
    await ui5.assertion.expectShellHeader();
  });

  it("Cleanup", async function () {
    await ui5.session.logout();
  });
});