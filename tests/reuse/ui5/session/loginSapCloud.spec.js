"use strict";
// Note: need to dynamically switch base urls in the spec as we run tests against multiple systems
// Note 1: need to dynamically switch base urls in the spec as we run tests against multiple systems
// Note 2: "https://hbr-715.wdf.sap.corp/ui" is down from time to time, so tests are skipped
// Note 4: We skip Invalid credentials test for above reason mentioned, anyway, all cases should be
//         tested while doing any future developments.

describe.skip("session - loginSapCloud - Invalid credentials", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://hbr-715.wdf.sap.corp/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution and Verification", async function () {
    await expect(ui5.session.loginSapCloud("Caput", "Draconis"))
      .rejects.toThrow(/Failure message while login "Sorry, we could not authenticate you. Try again."/);
  });


});

describe.skip("session - loginSapCloud", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://hbr-715.wdf.sap.corp/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.session.loginSapCloud("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);

    // closePopups() call is not required for "https://hbr-715.wdf.sap.corp/ui",
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
    util.browser.setBaseUrl("https://qs9-715.wdf.sap.corp/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution and Verification", async function () {
    await expect(ui5.session.loginSapCloud("PURCHASER"))
      .rejects.toThrow(/expected user name field to be present/);
  });
});