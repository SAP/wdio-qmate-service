"use strict";

describe("navigationBar - expectPageTitle - Home QS9", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", false);
    await ui5.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectPageTitle("Home");
  });
});

describe("navigationBar - expectPageTitle - Home QS9 - Error case", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", false);
    await ui5.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await expect(ui5.navigationBar.expectPageTitle("Not Home"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("navigationBar - expectPageTitle - Home HBR", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", false);
    await ui5.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectPageTitle("Home");
  });
});

describe("navigationBar - expectPageTitle - Home HBR - Error case", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
  });

  it("Execution", async function () {
    await ui5.navigation.navigateToApplication("Shell-home", false);
    await ui5.session.loginFiori("PURCHASER");
  });

  it("Verification", async function () {
    await expect(ui5.navigationBar.expectPageTitle("Not Home"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});