"use strict";

describe("assertion - expectValueToBe", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const input = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.SearchField",
        "id": "*searchField"
      }
    };
    await ui5.userInteraction.fill(input, "Watch");
    await ui5.assertion.expectValueToBe(input, "Watch");
  });
});

describe("assertion - expectValueToBe with wrong value input (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const input = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.SearchField",
        "id": "*searchField"
      }
    };
    await ui5.userInteraction.fill(input, "Wtch");
    await expect(ui5.assertion.expectValueToBe(input, "Watch"))
      .rejects.toThrow(/Expect\w+|\d+Watch\w+|\d+Received\w+|\d+Wtch/);
  });
});

describe("assertion - expectValueToBe with wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    let wrongSelector = {
      "elementProperties": {
        "wrongData": "123"
      }
    };
    await expect(ui5.assertion.expectValueToBe(wrongSelector, "Watch"))
      .rejects.toThrow(/No visible elements found/);
    wrongSelector = 123;
    await expect(ui5.assertion.expectValueToBe(wrongSelector, "Watch"))
      .rejects.toThrow("Function 'expectValueToBe' failed with: Please provide a valid selector as argument.");
  });
});