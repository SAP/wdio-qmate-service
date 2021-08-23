"use strict";

describe("locator - highlightElement", function () {

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };
    const duration = 60000;
    const color = "green";
    await ui5.common.locator.highlightElement(selector, duration, color);
  });

  it("Verification", async function () {
    // TODO: find a way to check highlighting
  });
});

describe("locator - highlightElement and catch error", function () {

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProdgjhgctCategories*'LT')" // Wrong "bindingContextPath"
      }
    };
    const duration = 3000;
    const color = "green";
    await expect(ui5.common.locator.highlightElement(selector, duration, color))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});
