"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("locator - getValue", function () {
  let actValue;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const elem = await nonUi5.element.getElementByXPath("//div[contains(text(),'Laptops')]");
    actValue = await nonUi5.element.getValue(elem);
  });

  it("Verification", async function () {
    await common.assertion.expectEqual(actValue, "Laptops");
  });
});

describe("locator - getValue - innerHTML", function () {
  let actValue;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution", async function () {
    const elem = await nonUi5.element.getElementByCss("SPAN[id='container-cart---homeView--page-title-inner']");
    actValue = await nonUi5.element.getValue(elem);
  });

  it("Verification", async function () {
    const expValue = "Product Catalog";
    await common.assertion.expectEqual(actValue, expValue);
  });
});

describe("locator - getValue - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.getValue())
      .rejects.toThrow("Function 'getValue' failed");
  });
});