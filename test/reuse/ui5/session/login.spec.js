"use strict";

describe("session - login - fiori", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("<urlToSystem>");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.session.login("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();
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

describe("session - login - fiori - invalid credentials", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("<urlToSystem>");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution & Verification", async function () {
    await expect(ui5.session.login("Caput", "Draconis"))
      .rejects.toThrow(/Login failed: "Client, name, or password is not correct; log on again"/);
  });
});

describe("session - login - sapCloud", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("<urlToSystem>");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.session.login("PURCHASER");
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

describe("session - login - sapCloud - Invalid credentials", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("<urlToSystem>");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution & Verification", async function () {
    await expect(ui5.session.loginSapCloud("Caput", "Draconis"))
      .rejects.toThrow(/Login failed: "Sorry, we could not authenticate you. Try again."/);
  });
});