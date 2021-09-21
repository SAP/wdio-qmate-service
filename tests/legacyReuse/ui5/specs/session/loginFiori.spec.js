"use strict";
// Note: need to dynamically switch base urls in the spec as we run tests against multiple systems

describe("session - loginFiori", function () {
  it("Preparation", async function () {
    utilities.browser.setBaseUrl("https://qs9-715.wdf.sap.corp/ui");
    await non_ui5.common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.common.session.loginFiori("PURCHASER");
    await ui5.common.navigation.navigateToApplication("Shell-home", true);
    await ui5.common.navigation.closePopups();
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.shell.ShellAppTitle",
        "id": "shellAppTitle"
      }
    };
    await ui5.common.assertion.expectToBeVisible(selector);
  });
});

describe("session - loginFiori for Sap Cloud login", function () {
  it("Preparation", async function () {
    utilities.browser.setBaseUrl("https://ccf-715.wdf.sap.corp/ui");
    await ui5.common.navigation.navigateToApplication("", true);
  });

  it("Execution and Verification", async function () {
    await expect(ui5.common.session.loginFiori("PURCHASER"))
      .rejects.toThrow(/Function 'loginFiori' failed/);
  });
});