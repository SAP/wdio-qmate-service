"use strict";
// Note: need to dynamically switch base urls in the spec as we run tests against multiple systems

describe("session - login - fiori", function () {
  it("Preparation", async function () {
    utilities.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
    await non_ui5.common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.common.session.login("PURCHASER");
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

// Note: "https://super-sensitive.domain.name/ui" is down from time to time, so tests are skipped
describe.skip("session - login - sapCloud", function () {
  it("Preparation", async function () {
    utilities.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
    await non_ui5.common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.common.session.login("PURCHASER");
    await ui5.common.navigation.navigateToApplication("Shell-home", true);

    // closePopups() call is not required for "https://super-sensitive.domain.name/ui",
    // it just makes test execution longer
    // await ui5.common.navigation.closePopups();
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
