"use strict";
// Note: need to dynamically switch base urls in the spec as we run tests against multiple systems

describe("session - logout with inner verification", function () {
  it("Preparation", async function () {
    utilities.browser.setBaseUrl("https://qs9-715.wdf.sap.corp/ui");
    await non_ui5.common.navigation.navigateToUrl(browser.config.baseUrl);
    await ui5.common.session.loginFiori("PURCHASER");
    await ui5.common.navigation.navigateToApplication("Shell-home", true);
    await ui5.common.navigation.closePopups();

  });

  it("Execution", async function () {
    await ui5.common.session.logout();
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectLogoutText();
  });
});

describe("session - logout without inner verification", function () {
  it("Preparation", async function () {
    utilities.browser.setBaseUrl("https://qs9-715.wdf.sap.corp/ui");
    await non_ui5.common.navigation.navigateToUrl(browser.config.baseUrl);
    await ui5.common.session.loginFiori("PURCHASER");
    await ui5.common.navigation.navigateToApplication("Shell-home", true);
    await ui5.common.navigation.closePopups();
  });

  it("Execution", async function () {
    await ui5.common.session.logout(false);
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectLogoutText();
  });
});

describe("session - logout without login (unhappy case)", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrlAndRetry("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.common.session.logout())
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});