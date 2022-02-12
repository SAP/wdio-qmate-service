"use strict";
// Note: need to dynamically switch base urls in the spec as we run tests against multiple systems

describe("session - loginFiori - invalid credentials", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution and Verification", async function () {
    await expect(ui5.session.loginFiori("Caput", "Draconis"))
      .rejects.toThrow(/Failure message while login "Client, name, or password is not correct; log on again"/);
  });
});

describe("session - login - fiori", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
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
});

// Note: "https://super-sensitive.domain.name/ui" is down from time to time, so tests are skipped

describe.skip("session - loginSapCloud - Invalid credentials", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution and Verification", async function () {
    await expect(ui5.session.loginSapCloud("Caput", "Draconis"))
      .rejects.toThrow(/Failure message while login "Sorry, we could not authenticate you. Try again."/);
  });


});

describe.skip("session - login - sapCloud", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.session.login("PURCHASER");
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
