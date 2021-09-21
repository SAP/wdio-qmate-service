"use strict";
const {
  handleCookiesConsent
} = require("../../utils");

describe("locator - getValue + expectEqual", function () {

  let product;
  let currentValue;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    product = await nonUi5.element.getElementByXPath("//div[contains(text(),'Laptops')]");
    currentValue = await nonUi5.element.getValue(product);
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectEqual(currentValue, "Laptops");
  });
});

describe("locator - getValue and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.getValue())
      .rejects.toThrow("Function 'getValue' failed");
  });
});