"use strict";

describe("locator - getDisplayedChildElement by parent and child selectors", function () {
  let element;

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    const parentSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.List",
        "id": "*categoryList"
      }
    };
    const childSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };

    element = await ui5.common.locator.getDisplayedChildElement(parentSelector, childSelector);
  });

  it("Verification", async function () {
    await expect(element.getText()).resolves.toMatch(/Laptops/);
  });
});

describe("locator - getDisplayedChildElement by wrong parent, child selectors and indexes (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const parentSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.WrongHome", // "sap.ui.demo.cart.view.WrongHome" instead if "sap.ui.demo.cart.view.Home"
        "metadata": "sap.m.List",
        "id": "*categoryList"
      }
    };
    const childSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };

    await expect(ui5.common.locator.getDisplayedChildElement(parentSelector, childSelector))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("locator - getDisplayedChildElement by parent, wrong child selectors and indexes (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const parentSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.List",
        "id": "*categoryList"
      }
    };
    const childSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategory" // "/ProductCategory*)" instead of  "/ProductCategories*'LT')"
      }
    };
    await expect(ui5.common.locator.getDisplayedChildElement(parentSelector, childSelector))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});