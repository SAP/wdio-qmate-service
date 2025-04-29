"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("element - getCssPropertyValue", function () {
  let valueAct;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
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
    valueAct = await ui5.element.getCssPropertyValue(selector, cssProperty, index, timeout);
  });

  it("Verification", async function () {
    const valueExp = "visible";
    await common.assertion.expectEqual(valueAct, valueExp);
  });
});

describe("element - getCssPropertyValue - error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.element.getCssPropertyValue()).rejects.toThrow("Function 'getCssPropertyValue' failed");
  });
});