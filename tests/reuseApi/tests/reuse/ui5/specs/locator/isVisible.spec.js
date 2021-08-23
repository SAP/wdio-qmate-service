"use strict";
describe("locator - isVisible with right selector", function () {
  let isVisible;
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

    isVisible = await ui5.common.locator.isVisible(selector);
  });

  it("Verification", async function () {
    ui5.common.assertion.expectTrue(isVisible);
  });
});

describe("locator - isVisible with right, but hidden selector", function () {
  let isVisible;

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    const selectorForInvisibleElement = {
      "elementProperties": {
        "metadata": "sap.ui.core.InvisibleText",
        "text": "Press F5 to Refresh"
      }
    };
    isVisible = await ui5.common.locator.isVisible(selectorForInvisibleElement);
  });

  it("Verification", async function () {
    ui5.common.assertion.expectFalse(isVisible);
  });
});

describe("locator - isVisible with wrong selector", function () {
  let isVisible;
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'Wrong Category')"
      }
    };

    isVisible = await ui5.common.locator.isVisible(selector);
  });

  it("Verification", async function () {
    ui5.common.assertion.expectFalse(isVisible);
  });
});