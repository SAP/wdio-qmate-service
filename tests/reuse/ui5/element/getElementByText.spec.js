"use strict";
const selectorForAllListItems = {
  "elementProperties": {
    "viewName": "sap.ui.demo.cart.view.Home",
    "metadata": "sap.m.StandardListItem"
  }
};

describe("element - getElementByText should get element by right text", function () {
  let elementByRightName;
  let secondElementByRightName;
  let elementText;
  const textToGetElement = "Laptops\n11";

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    elementByRightName = await ui5.element.getElementByText(selectorForAllListItems, textToGetElement);
    elementText = await elementByRightName.getText();
    await expect(ui5.element.getElementByText(selectorForAllListItems, textToGetElement, 1))
      .rejects.toThrow(/getElementByText\(\): Index out of bound./); // Element with text "Laptops\n11" is unique
  });

  it("Verification", function () {
    common.assertion.expectUndefined(secondElementByRightName);
    common.assertion.expectEqual(textToGetElement, elementText);
  });
});

describe("element - getElementByText should get element by wrong text (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    const wrongText = "Wrong Text";
    await expect(ui5.element.getElementByText(selectorForAllListItems, wrongText))
      .rejects.toThrow(/No elements found for given text./);
  });
});

describe("element - getElementByText with index 1 (unhappy case)", function () {

  const value = "Gaming Monster";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/category/DC");
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Category",
        "metadata": "sap.m.Text"
      }
    };
    const index = 1;
    const timeout = 30000;

    await expect(ui5.element.getElementByText(selector, value, index, timeout))
      .rejects.toThrow(/getElementByText\(\): Index out of bound./);
  });
});