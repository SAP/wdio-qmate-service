"use strict";

describe("assertion - expectToBeNotVisible for non-visible element (element is in DOM)", function () {
  let selectorForInvisibleElement;
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    selectorForInvisibleElement = {
      "elementProperties": {
        "metadata": "sap.ui.core.InvisibleText",
        "text": "Press F5 to Refresh"
      }
    };
  });

  it("Verification", async function () {
    await ui5.assertion.expectToBeNotVisible(selectorForInvisibleElement);
  });
});

describe("assertion - expectToBeNotVisible for visible element (unhappy case)", function () {
  let selectorForVisibleElement;
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    selectorForVisibleElement = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };
  });

  it("Verification", async function () {
    await expect(ui5.assertion.expectToBeNotVisible(selectorForVisibleElement))
      .rejects.toThrow("Element is visible, timeout reached.");
  });
});

describe("assertion - expectToBeNotVisible for element not in DOM", function () {
  let selector;
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Category",
        "metadata": "sap.m.ObjectListItem",
        "bindingContextPath": "/Products*'HT-1258')"
      }
    };
  });

  it("Verification", async function () {
    await ui5.assertion.expectToBeNotVisible(selector);
  });
});