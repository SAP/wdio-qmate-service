"use strict";

describe("session - logout with inner verification", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("<urlToSystem");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
    await ui5.session.loginFiori("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();
  });

  it("Execution", async function () {
    await ui5.session.logout();
  });

  it("Verification", async function () {
    await ui5.session.expectLogoutText();
  });
});

describe("session - logout without inner verification", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("<urlToSystem");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
    await ui5.session.loginFiori("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();
  });

  it("Execution", async function () {
    await ui5.session.logout(false);
  });

  it("Verification", async function () {
    await ui5.session.expectLogoutText();
  });
});

describe("session - logout without login (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrlAndRetry("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.session.logout())
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});