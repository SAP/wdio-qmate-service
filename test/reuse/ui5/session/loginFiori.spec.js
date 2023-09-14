"use strict";

describe("session - loginFiori", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("<urlToSystem>");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.session.loginFiori("PURCHASER");
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

describe("session - loginFiori - invalid credentials", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("<urlToSystem>");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution & Verification", async function () {
    await ui5.session.loginFiori("Caput", "Draconis");
    await expect(ui5.session.loginFiori("Caput", "Draconis"))
      .rejects.toThrow(/Login failed: "Client, name, or password is not correct; log on again"/);
  });
});

describe("session - loginFiori - error case", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://www.sap.com");
    await ui5.navigation.navigateToApplication("", true);
  });

  it("Execution & Verification", async function () {
    await expect(ui5.session.loginFiori("PURCHASER"))
      .rejects.toThrow(/Function 'loginFiori' failed/);
  });
});
