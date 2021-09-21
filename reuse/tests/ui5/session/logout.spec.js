"use strict";
// Note: need to dynamically switch base urls in the spec as we run tests against multiple systems

describe("session - logout with inner verification", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
    await ui5.session.loginFiori("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();

  });

  it("Execution", async function () {
    await ui5.session.logout();
  });

  it("Verification", async function () {
    await ui5.assertion.expectLogoutText();
  });
});

describe("session - logout without inner verification", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
    await ui5.session.loginFiori("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();
  });

  it("Execution", async function () {
    await ui5.session.logout(false);
  });

  it("Verification", async function () {
    await ui5.assertion.expectLogoutText();
  });
});

describe("session - logout without login (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrlAndRetry("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.session.logout())
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});