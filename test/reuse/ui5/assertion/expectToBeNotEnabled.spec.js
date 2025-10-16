"use strict";

describe("assertion - expectToBeNotEnabled", function () {

  it("Preparation", async function () {
    await browser.url("#/categories");

    const cart = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Welcome",
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://cart"
      }
    };
    await ui5.userInteraction.click(cart);
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Cart",
        "metadata": "sap.m.Button",
        "id": "*editButton"
      }
    };
    await ui5.assertion.expectToBeNotEnabled(selector);
  });
});

describe("assertion - expectToBeNotEnabled when element enabled (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selectorForEnabledElement = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Welcome",
        "metadata": "sap.m.Link",
        "bindingContextPath": "/Viewed/0"
      }
    };
    await expect(ui5.assertion.expectToBeNotEnabled(selectorForEnabledElement))
      .rejects.toThrow(/Expect\w+|\d+false\w+|\d+Received\w+|\d+true/);
  });
});

describe("assertion - expectToBeNotEnabled with wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const wrongSelector = {
      "elementProperties": {
        "wrongData": "123"
      }
    };
    await expect(ui5.assertion.expectToBeNotEnabled(wrongSelector))
      .rejects.toThrow(/No visible elements found/);
  });
});