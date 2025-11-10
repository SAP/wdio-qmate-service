"use strict";

describe("element - highlight", function () {

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
    const duration = 60000;
    const color = "green";
    await ui5.element.highlight(selector, duration, color);
  });

  it("Verification", async function () {
    // TODO: find a way to check highlighting
  });
});

describe("element - highlight and catch error", function () {

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProdgjhgctCategories*'LT')" // Wrong "bindingContextPath"
      }
    };
    const duration = 3000;
    const color = "green";
    await expect(ui5.element.highlight(selector, duration, color))
      .rejects.toThrow(/No visible elements found/);
  });
});
