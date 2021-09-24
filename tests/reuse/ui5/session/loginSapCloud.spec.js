"use strict";
// Note: need to dynamically switch base urls in the spec as we run tests against multiple systems
// Note 1: need to dynamically switch base urls in the spec as we run tests against multiple systems
// Note 2: "https://super-sensitive.domain.name/ui" is down from time to time, so tests are skipped
describe.skip("session - loginSapCloud", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.session.loginSapCloud("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);

    // closePopups() call is not required for "https://super-sensitive.domain.name/ui",
    // it just makes test execution longer
    // await ui5.navigation.closePopups();
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
});

describe("session - loginSapCloud for Fiori (unhappy case)", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution and Verification", async function () {
    await expect(ui5.session.loginSapCloud("PURCHASER"))
      .rejects.toThrow(/expected user name field to be present/);
  });
});