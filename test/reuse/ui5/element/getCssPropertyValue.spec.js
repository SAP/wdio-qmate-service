"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("element - getCssPropertyValue", function () {
  let valueAct;
  
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.96.27/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
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
    valueAct = await ui5.element.getCssPropertyValue(selector, "visibility");
  });

  it("Verification", async function(){
    const valueExp = "visible"
    await common.assertion.expectEqual(valueAct, valueExp);
  });
});
