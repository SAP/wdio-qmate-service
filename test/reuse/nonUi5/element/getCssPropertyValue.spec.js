"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

const selector = "//div[contains(text(),'Laptops')]";
const cssProperty = "visibility";
const valueExp = "visible";

describe("element - getCssPropertyValue - element", function () {
  let valueAct;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const product = await nonUi5.element.getByXPath(selector);
    valueAct = await nonUi5.element.getCssPropertyValue(product, cssProperty);
  });

  it("Verification", async function () {
    await common.assertion.expectEqual(valueAct, valueExp);
  });
});

describe("element - getCssPropertyValue - selector", function () {
  let valueAct;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    valueAct = await nonUi5.element.getCssPropertyValue(selector, cssProperty);
  });

  it("Verification", async function () {
    await common.assertion.expectEqual(valueAct, valueExp);
  });
});

describe("element - getCssPropertyValue - error", function () {
  
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.getCssPropertyValue()).rejects.toThrow("Function 'getCssPropertyValue' failed");
  });
});
