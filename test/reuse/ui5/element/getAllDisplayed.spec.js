"use strict";

describe("element - getAllDisplayed - by selector", function () {
  let elements;

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.demo.cart.view.Home",
        metadata: "sap.m.StandardListItem"
      }
    };
    elements = await ui5.element.getAllDisplayed(selector);
  });

  it("Verification", async function () {
    common.assertion.expectDefined(elements);
    common.assertion.expectDefined(elements.length);
  });
});

describe("element - getAllDisplayed - wrong selector (error case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "random.View",
        metadata: "sap.m.StandardListItem"
      }
    };
    await expect(ui5.element.getAllDisplayed(selector)).rejects.toThrow(/No visible elements found/);
  });
});

describe("element - getAllDisplayed - invisible elements (error case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selectorForInvisibleElements = {
      elementProperties: {
        metadata: "sap.ui.core.InvisibleText"
      }
    };
    await expect(ui5.element.getAllDisplayed(selectorForInvisibleElements)).rejects.toThrow(/No visible elements found/);
  });
});

describe("element - getAllDisplayed - empty elementProperties (error case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {}
    };
    await expect(ui5.element.getAllDisplayed(selector)).rejects.toThrow(`Function 'getAllDisplayed' failed with: uiControlExecuteLocator(): No visible elements found with selector: {\"elementProperties\":{}} in 30s`);
  });
});
