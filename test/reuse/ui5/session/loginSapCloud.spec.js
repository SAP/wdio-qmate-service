"use strict";

describe("session - loginSapCloud", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("<urlToSystem>");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.session.loginSapCloud("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.shell.ShellAppTitle",
        "id": "shellAppTitle"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });

  it("Cleanup", async function () {
    await ui5.session.logout();
  });
});

describe("session - loginSapCloud - Invalid credentials", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("<urlToSystem>");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution & Verification", async function () {
    await expect(ui5.session.loginSapCloud("Caput", "Draconis"))
      .rejects.toThrow(/Login failed: "Sorry, we could not authenticate you. Try again."/);
  });
});

describe("session - login - sapCloud for Fiori (error case)", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("<urlToSystem>");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution & Verification", async function () {
    await expect(ui5.session.loginSapCloud("PURCHASER"))
      .rejects.toThrow(/Login failed: Login page with the given authenticator not present./);
  });
});