"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

const selector = {
  elementProperties: {
    viewName: "sap.ui.demo.cart.view.Home",
    metadata: "sap.m.StandardListItem",
    bindingContextPath: "/ProductCategories*'LT')"
  }
};
const cssProperty = "visibility";
const index = 0;
const timeout = 30000;

describe("assertion - expectCssPropertyValueToBe", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const valueExp = "visible";
    await ui5.assertion.expectCssPropertyValueToBe(selector, cssProperty, valueExp, index, timeout);
  });
});

describe("assertion - expectCssPropertyValueToBe - error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const wrongValue = "wrong";
    await expect(ui5.assertion.expectCssPropertyValueToBe(selector, cssProperty, wrongValue, index, timeout))
      .rejects.toThrow(/Expected.*wrong.*|Received.*visible/);
  });
});
