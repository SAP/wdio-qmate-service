"use strict";

describe("navigationBar - expectPageTitle", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution & Verification", async function () {
    await ui5.navigationBar.expectPageTitle("Home");
  });
});

describe("navigationBar - expectPageTitle - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://www.sap.com");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.navigationBar.expectPageTitle("Home"))
      .rejects.toThrowError("Function 'expectPageTitle' failed with:");
  });
});