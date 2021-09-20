"use strict";
const { handleCookiesConsent } = require("../../../utils");

describe("assertion - getValue + expectValueToBe", function () {

  let product;
  let currentValue;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    product = await non_ui5.common.locator.getElementByXPath("//div[contains(text(),'Laptops')]");
    await non_ui5.common.assertion.expectValueToBe(product, "Laptops");
  });
});

describe("assertion - expectValueToBe and catch error", function () {

  let product;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.locator.getValue())
      .rejects.toThrow("Please provide an element as first argument (must be of type 'object').");
  });
});
