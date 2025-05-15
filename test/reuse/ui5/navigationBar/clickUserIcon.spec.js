"use strict";

describe("navigationBar - clickUserIcon", async function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.navigationBar.clickUserIcon();
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ui.core.Icon",
        "bindingContextPath": "/userActions/items/4"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });

});

describe("navigationBar - clickUserIcon - error case", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://www.sap.com");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.navigationBar.clickUserIcon())
      .rejects.toThrowError("Function 'clickUserIcon' failed with:");
  });

});