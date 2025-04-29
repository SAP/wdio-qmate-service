"use strict";
const selectorForAllListItems = {
  "elementProperties": {
    "viewName": "sap.ui.demo.cart.view.Home",
    "metadata": "sap.m.StandardListItem"
  }
};

describe("element - getByText should get element by right text", function () {
  let elementByRightName;
  let secondElementByRightName;
  let elementText;
  const textToGetElement = "Laptops\n11";

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    // Note: error in safari macOS: Error: getByText(): No elements found for given text.
    elementByRightName = await ui5.element.getByText(selectorForAllListItems, textToGetElement);
    elementText = await elementByRightName.getText();
    await expect(ui5.element.getByText(selectorForAllListItems, textToGetElement, 1))
      .rejects.toThrow(`Function 'getByText' failed with: Index out of bound. Cannot get element by text Laptops`); // Element with text "Laptops\n11" is unique
  });

  it("Verification", function () {
    common.assertion.expectUndefined(secondElementByRightName);
    common.assertion.expectEqual(textToGetElement, elementText);
  });
});

describe("element - getByText should get element by wrong text (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    const wrongText = "Wrong Text";
    await expect(ui5.element.getByText(selectorForAllListItems, wrongText))
      .rejects.toThrow(/No elements found for given text./);
  });
});

describe("element - getByText with index 1 (unhappy case)", function () {

  const value = "Gaming Monster";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/category/DC");
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

    await expect(ui5.element.getByText(selector, value, index, timeout))
      .rejects.toThrow(`Function 'getByText' failed with: Index out of bound. Cannot get element by text Gaming Monster at index 1`);
  });
});