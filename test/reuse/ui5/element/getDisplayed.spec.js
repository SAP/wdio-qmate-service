"use strict";

const selectorForKeyboardsListElement = {
  "elementProperties": {
    "viewName": "sap.ui.demo.cart.view.Home",
    "metadata": "sap.m.StandardListItem",
    "bindingContextPath": "/ProductCategories*)"
  }
};

describe("element - 'getDisplayed' by selector and index", function () {
  let elementOne;
  let elementTwo;

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    const selectorForMultipleElements = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*)"
      }
    };
    elementOne = await ui5.element.getDisplayed(selectorForMultipleElements, 0);
    elementTwo = await ui5.element.getDisplayed(selectorForMultipleElements, 1);
  });

  it("Verification", async function () {
    await expect(elementOne.getText()).resolves.toMatch(/Accessories/);
    await expect(elementTwo.getText()).resolves.toMatch(/Computer System Accessories/);
  });
});

describe("element - getDisplayed by wrong index (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.element.getDisplayed(selectorForKeyboardsListElement, 111))
      .rejects.toThrow(/Index out of bound. Trying to access element at index: 111/);
  });
});

describe("element - getDisplayed by wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const wrongSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItemWrong",
        "bindingContextPath": "/ProductCategories*'KB')"
      }
    };
    await expect(ui5.element.getDisplayed(wrongSelector))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("element - getDisplayed by index which is equal to the number of elements on a page (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const searchFieldSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.SearchField",
        "id": "*searchField"
      }
    };
    await expect(ui5.element.getDisplayed(searchFieldSelector, 1))
      .rejects.toThrow(/Index out of bound. Trying to access element at index: 1/);
  });
});

describe("element - 'getDisplayed' by selector having wildcard character(*) for metadata", function () {
  let elementOne;
  let elementTwo;

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    const selectorForMultipleElements = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.*ListItem",
        "bindingContextPath": "/ProductCategories*)"
      }
    };
    elementOne = await ui5.element.getDisplayed(selectorForMultipleElements, 0);
    elementTwo = await ui5.element.getDisplayed(selectorForMultipleElements, 1);
  });

  it("Verification", async function () {
    await expect(elementOne.getText()).resolves.toMatch(/Accessories/);
    await expect(elementTwo.getText()).resolves.toMatch(/Computer System Accessories/);
  });
});
