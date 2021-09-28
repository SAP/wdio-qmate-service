"use strict";

describe("navigationBar - expectShellHeader to be visible", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://super-sensitive.domain.name/ui";
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectShellHeader();
  });

  it("Clean Up", async function () {
    await ui5.session.logout();
  });
});

describe("navigationBar - expectShellHeader not to be visible (unhappy case)", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://super-sensitive.domain.name/ui";
    await ui5.navigation.navigateToApplication("Shell-home", true);
  });

  it("Execution and Verification", async function () {
    await expect(ui5.navigationBar.expectShellHeader())
      .rejects.toThrow("Function 'expectToBeVisible' failed:Error:");
  });
});