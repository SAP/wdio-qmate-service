"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("assertion - expectCssPropertyValueToBe", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.96.27/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.demo.cart.view.Home",
        metadata: "sap.m.StandardListItem",
        bindingContextPath: "/ProductCategories*'LT')"
      }
    };
    await ui5.assertion.expectCssPropertyValueToBe(selector, "visibility", "visible");
  });
});

describe("assertion - expectCssPropertyValueToBe - error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.96.27/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.demo.cart.view.Home",
        metadata: "sap.m.StandardListItem",
        bindingContextPath: "/ProductCategories*'LT')"
      }
    };
    await expect(ui5.assertion.expectCssPropertyValueToBe(selector, "visibility", "wrong"))
      .rejects.toThrow(/Expected.*wrong.*|Received.*visible/);
  });
});
