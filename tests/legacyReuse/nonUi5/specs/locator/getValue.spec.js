"use strict";
const {
  handleCookiesConsent
} = require("../../../utils");

describe("locator - getValue + expectEqual", function () {

  let product;
  let currentValue;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    product = await non_ui5.common.locator.getElementByXPath("//div[contains(text(),'Laptops')]");
    currentValue = await non_ui5.common.locator.getValue(product);
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectEqual(currentValue, "Laptops");
  });
});

describe("locator - getValue and catch error", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.locator.getValue())
      .rejects.toThrow("Function 'getAttributeValue' failed. Please provide an element as first argument (must be of type 'object').");
  });
});