"use strict";

describe("assertion - expectTextToBe", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Welcome",
        "metadata": "sap.m.Title",
        "text": [{
          "path": "i18n>promotedTitle"
        }]
      }
    };
    await ui5.assertion.expectTextToBe(selector, "Promoted Items");
  });
});

describe("assertion - expectTextToBe with wrong selector", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    let wrongSelector = {
      "elementProperties": {
        "wrongData": "123"
      }
    };
    await expect(ui5.assertion.expectTextToBe(wrongSelector, "Watch"))
      .rejects.toThrow(/No visible elements found/);
    wrongSelector = 123;
    await expect(ui5.assertion.expectTextToBe(wrongSelector, "Watch"))
      .rejects.toThrow("Function 'expectTextToBe' failed with: Please provide a valid selector as argument.");
  });
});