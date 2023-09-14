"use strict";

describe("assertion - expectToBeNotVisible - no visible element (element is in DOM)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selectorForInvisibleElement = {
      "elementProperties": {
        "metadata": "sap.ui.core.InvisibleText",
        "text": "Press F5 to Refresh"
      }
    };
    await ui5.assertion.expectToBeNotVisible(selectorForInvisibleElement);
  });
});

describe("assertion - expectToBeNotVisible - visible element (negative case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selectorForVisibleElement = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };
    await expect(ui5.assertion.expectToBeNotVisible(selectorForVisibleElement))
      .rejects.toThrow("Function 'expectToBeNotVisible' failed with:");
  });
});

describe("assertion - expectToBeNotVisible - element not in DOM", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Category",
        "metadata": "sap.m.ObjectListItem",
        "bindingContextPath": "/Products*'HT-1258')"
      }
    };
    await ui5.assertion.expectToBeNotVisible(selector);
  });
});