"use strict";

describe("assertion - expectShellHeader to be visible", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://qs9-715.wdf.sap.corp/ui";
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await ui5.assertion.expectShellHeader();
  });

  it("Clean Up", async function () {
    await ui5.session.logout();
  });
});

describe("assertion - expectShellHeader not to be visible (unhappy case)", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://qs9-715.wdf.sap.corp/ui";
    await ui5.navigation.navigateToApplication("Shell-home", true);
  });

  it("Execution and Verification", async function () {
    await expect(ui5.assertion.expectShellHeader())
      .rejects.toThrow("Function 'expectToBeVisible' failed:Error:");
  });
});