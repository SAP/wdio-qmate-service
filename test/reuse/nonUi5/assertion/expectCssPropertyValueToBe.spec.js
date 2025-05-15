"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

const selector = "//div[contains(text(),'Laptops')]";
const cssProperty = "visibility";
const compareValue = "visible";

describe("assertion - expectCssPropertyValueToBe - element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const product = await nonUi5.element.getByXPath(selector);
    await nonUi5.assertion.expectCssPropertyValueToBe(product, cssProperty, compareValue);
  });
});

describe("assertion - expectCssPropertyValueToBe - selector", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await nonUi5.assertion.expectCssPropertyValueToBe(selector, cssProperty, compareValue);
  });
});

const errorRegexp = /Expected.*wrong.*|Received.*visible/;

describe("assertion - expectCssPropertyValueToBe - element - error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const product = await nonUi5.element.getByXPath(selector);
    await expect(nonUi5.assertion.expectCssPropertyValueToBe(product, cssProperty, "wrong"))
      .rejects.toThrow(errorRegexp);
  });
});

describe("assertion - expectCssPropertyValueToBe - selector - error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.assertion.expectCssPropertyValueToBe(selector, cssProperty, "wrong"))
      .rejects.toThrow(errorRegexp);
  });
});
