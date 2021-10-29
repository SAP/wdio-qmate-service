"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("locator - getAttributeValue - inner HTML", function () {

  let product;
  let valueAct;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    product = await nonUi5.element.getByXPath("//div[contains(text(),'Laptops')]");
    valueAct = await nonUi5.element.getAttributeValue(product);
  });

  it("Verification", async function () {
    const valueExp = "Laptops";
    await common.assertion.expectEqual(valueAct, valueExp);
  });
});

describe("locator - getAttributeValue - with attribute", function () {

  let product;
  let valueAct;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    product = await nonUi5.element.getByXPath("//div[contains(text(),'Laptops')]");
    valueAct = await nonUi5.element.getAttributeValue(product, "class");
  });

  it("Verification", async function () {
    const valueExp = "sapMSLITitleOnly";
    await common.assertion.expectEqual(valueAct, valueExp);
  });
});

describe("locator - getAttributeValue - error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.getAttributeValue())
      .rejects.toThrow("Function 'getAttributeValue' failed");
  });
});