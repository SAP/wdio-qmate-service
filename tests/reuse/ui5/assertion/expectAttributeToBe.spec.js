"use strict";
let selector;

describe("assertion - expectAttributeToBe: title to be 'Laptops' (string)", function () {

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };

  });

  it("Verification", async function () {
    await ui5.assertion.expectAttributeToBe(selector, "title", "Laptops");
    await ui5.assertion.expectAttributeToBe(selector, "title", "Laptops", 0, 30000, 10000); // Test 'loadPropertyTimeout' parameter
  });
});

describe("assertion - expectAttributeToBe wrong/null/undefined", function () {

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };
  });

  it("Verification", async function () {
    await expect(ui5.assertion.expectAttributeToBe(selector, "title", "Laptop"))
      .rejects.toThrow(/Expect\w+|\d+Laptop\w+|\d+Received\w+|\d+laptops/);

    await expect(ui5.assertion.expectAttributeToBe(selector, "title"))
      .rejects.toThrowError(/Expect\w+|\d+undefined\w+|\d+Received\w+|\d+laptops/);

    await expect(ui5.assertion.expectAttributeToBe(selector, "title", null))
      .rejects.toThrow(/Expect\w+|\d+null\w+|\d+Received\w+|\d+laptops/);

    await expect(ui5.assertion.expectAttributeToBe(selector, "title", undefined))
      .rejects.toThrow(/Expect\w+|\d+undefined\w+|\d+Received\w+|\d+laptops/);

    await expect(ui5.assertion.expectAttributeToBe(selector, "title", ""))
      .rejects.toThrow(/Expect\w+|\d+\w+|\d+Received\w+|\d+laptops/);
  });
});

describe("assertion - expectAttributeToBe: 'visible' of the listItem to be true (boolean and as string)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };
  });

  it("Verification", async function () {
    await ui5.assertion.expectAttributeToBe(selector, "visible", true);
    await ui5.assertion.expectAttributeToBe(selector, "visible", "true");
    await ui5.assertion.expectAttributeToBe(selector, "visible", true, 0, 30000, 10000); // Test 'loadPropertyTimeout' parameter
  });
});

describe("assertion - expectAttributeToBe: 'busyIndicatorDelay' of the listItem to be 1000 (number and as string)", function () {

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };

  });
  it("Verification", async function () {
    await ui5.assertion.expectAttributeToBe(selector, "busyIndicatorDelay", 1000);
    await ui5.assertion.expectAttributeToBe(selector, "busyIndicatorDelay", "1000");
    await ui5.assertion.expectAttributeToBe(selector, "busyIndicatorDelay", 1000, 0, 30000, 10000); // Test 'loadPropertyTimeout' parameter
  });
});

// TODO: add check for 'enabled' parameter