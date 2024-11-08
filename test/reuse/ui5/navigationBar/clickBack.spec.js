"use strict";

describe("navigationBar - clickBack", async function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
    const selector = {
      "elementProperties": {
        "viewName": "sap.ushell.components.homepage.DashboardContent",
        "metadata": "sap.m.GenericTile",
        "bindingContextPath": "/groups/1/tiles/1/content/0"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution", async function () {
    await ui5.navigationBar.clickBack();
  });

  it("Verification", async function () {
    await ui5.navigationBar.expectPageTitle("Home");
  });
});

describe("navigationBar - clickBack - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution & Verification", async function () {
    await expect(ui5.navigationBar.clickBack()).rejects.toThrowError("Function 'clickBack' failed with:");
  });
});
