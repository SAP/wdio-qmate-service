"use strict";

describe("navigationBar - expectShellHeader", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution & Verification", async function () {
    await ui5.navigationBar.expectShellHeader();
  });
});

describe("navigationBar - expectShellHeader - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://www.sap.com");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.navigationBar.expectShellHeader())
      .rejects.toThrowError("Function 'expectShellHeader' failed with:");
  });
});