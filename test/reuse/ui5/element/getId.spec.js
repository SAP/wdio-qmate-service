"use strict";
describe("element - getId by wrong selector (unhappy case)", function () {
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
    elemIdFirst = await ui5.element.getId(selector, 0);
    elemIdSecond = await ui5.element.getId(selector, 1);
  });

  it("Verification", function () {
    expect(elemIdFirst).toContain("categoryList-0"); // No such method in 'ui5.assertion' unfortunately
    common.assertion.expectUnequal(elemIdFirst, elemIdSecond);
  });
});

describe("element - getId by wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const wrongSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItemWrong" // instead of sap.m.StandardListItem
      }
    };
    await expect(ui5.element.getId(wrongSelector, 0))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("element - getId by wrong index (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };
    await expect(ui5.element.getId(selector, 111))
      .rejects.toThrow(/Index out of bound. Trying to access element at index: 111/);
  });
});

describe("element - getId should get element id by empty object selector(unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.element.getId({}, 0))
      .rejects.toThrow(/No visible elements found/);
  });
});