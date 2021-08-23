"use strict";
describe("locator - getElementId by wrong selector (unhappy case)", function () {
  let elemIdFirst;
  let elemIdSecond;

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*)"
      }
    };
    elemIdFirst = await ui5.common.locator.getElementId(selector, 0);
    elemIdSecond = await ui5.common.locator.getElementId(selector, 1);
  });

  it("Verification", function () {
    expect(elemIdFirst).toContain("categoryList-0"); // No such method in 'ui5.common.assertion' unfortunately
    ui5.common.assertion.expectUnequal(elemIdFirst, elemIdSecond);
  });
});

describe("locator - getElementId by wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const wrongSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItemWrong" // instead of sap.m.StandardListItem
      }
    };
    await expect(ui5.common.locator.getElementId(wrongSelector, 0))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("locator - getElementId by wrong index (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };
    await expect(ui5.common.locator.getElementId(selector, 111))
      .rejects.toThrow(/Index out of bound. Trying to access element at index: 111/);
  });
});

describe("locator - getElementId should get element id by empty object selector(unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.common.locator.getElementId({}, 0))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});