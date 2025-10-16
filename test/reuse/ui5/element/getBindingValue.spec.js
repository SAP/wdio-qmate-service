"use strict";

describe("element - getBindingValue 'text'", function () {
  let bindingValue;

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
    const attribute = "title";
    bindingValue = await ui5.element.getBindingValue(selector, attribute);
  });

  it("Verification", function () {
    common.assertion.expectEqual(bindingValue, "Laptops");
  });

});

describe("element - getBindingValue for wrong attribute", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };
    const attribute = "case";

    switch (browser.capabilities.browserName) {
      case "Safari":
        await expect(ui5.element.getBindingValue(selector, attribute))
          .rejects.toThrow("A JavaScript exception occured: undefined is not an object");
        break;
      case "firefox":
        await expect(ui5.element.getBindingValue(selector, attribute))
          .rejects.toThrow("TypeError: control.getBinding(...) is undefined");
        break;
      default: //chrome and edge
        await expect(ui5.element.getBindingValue(selector, attribute))
          .rejects.toThrow("javascript error: Cannot read properties of undefined (reading 'getValue')");
        break;
    }

  });
});

describe("element - getBindingValue for wrong selector", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sapfiori.cart.view.Home", // "sapfiori.cart.view.Home" instead of "sap.ui.demo.cart.view.Home"
        "metadata": "sap.StandartListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };
    const attribute = "title";
    await expect(ui5.element.getBindingValue(selector, attribute))
      .rejects.toThrow(/No visible elements found/);
  });
});