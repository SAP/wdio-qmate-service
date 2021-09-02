"use strict";

describe("navigation - navigateToUrl", function () {
  it("Execution", async function () {
    await ui5.common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectUrlToBe(browser.config.baseUrl);
  });
});

describe("navigation - navigateToUrl for empty url (unhappy case)", function () {
  it("Execution and Verification", async function () {
    await expect(ui5.common.navigation.navigateToUrl())
      .rejects.toThrow(/Malformed type for "url" parameter of command navigateTo/);
  });
});

describe("navigation - navigateToUrl for part of url (unhappy case)", function () {
  it("Execution and Verification", async function () {
    await expect(ui5.common.navigation.navigateToUrl("#/category"))
      .rejects.toThrow(/invalid argument/);
  });
});