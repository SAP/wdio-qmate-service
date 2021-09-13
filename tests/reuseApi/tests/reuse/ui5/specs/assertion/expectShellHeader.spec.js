"use strict";

describe("assertion - expectShellHeader to be visible", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://super-sensitive.domain.name/ui";
  });

  it("Execution", async function () {
    await ui5.common.navigation.navigateToApplication("Shell-home", true);
    await ui5.common.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectShellHeader();
  });

  it("Clean Up", async function () {
    await ui5.common.session.logout();
  });
});

describe("assertion - expectShellHeader not to be visible (unhappy case)", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://super-sensitive.domain.name/ui";
    await ui5.common.navigation.navigateToApplication("Shell-home", true);
  });

  it("Execution and Verification", async function () {
    browser.config.useWaitUI5ToStabilize = false;
    await expect(ui5.common.assertion.expectShellHeader())
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found with selector*./);
    browser.config.useWaitUI5ToStabilize= true;
  });
});