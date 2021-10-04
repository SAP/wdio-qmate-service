"use strict";

describe("assertion - expectToBeEnabled", function () {

  it("Preparation", async function () {
    await browser.url("#/categories");
    const elementSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };

    await ui5.common.userInteraction.click(elementSelector); // navigate to products

    const productSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Category",
        "metadata": "sap.m.ObjectStatus"
      }
    };

    await ui5.common.userInteraction.click(productSelector); // navigate to product
  });

  it("Execution and Verification", async function () {
    const addToCartSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Product",
        "metadata": "sap.m.Button",
        "text": [{
          "path": "i18n>addToCartShort"
        }]
      }
    };
    await ui5.common.assertion.expectToBeEnabled(addToCartSelector);
  });
});

describe("assertion - expectToBeEnabled when element not enabled (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");

    const cartSelector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Welcome",
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://cart"
      }
    };
    await ui5.common.userInteraction.click(cartSelector); // Navigate to shopping cart
  });

  it("Execution and Verification", async function () {
    const selectorForNotEnabledElement = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Cart",
        "metadata": "sap.m.Button",
        "id": "*editButton"
      }
    };
    await expect(ui5.common.assertion.expectToBeEnabled(selectorForNotEnabledElement))
      .rejects.toThrow(/Expect\w+|\d+true\w+|\d+Received\w+|\d+false/);
  });
});

describe("assertion - expectToBeEnabled with wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const selectorForNonExistingElement = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Product",
        "metadata": "sap.m.ObjectAttribute",
        "title": [{
          "path": "i18n>productMeasuresAttributeText"
        }]
      }
    };
    await expect(ui5.common.assertion.expectToBeEnabled(selectorForNonExistingElement, 0, 2500))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

    const wrongSelector = 123;
    await expect(ui5.common.assertion.expectToBeEnabled(wrongSelector))
      .rejects.toThrow("Function 'expectAttributeToBe' failed:");
  });
});