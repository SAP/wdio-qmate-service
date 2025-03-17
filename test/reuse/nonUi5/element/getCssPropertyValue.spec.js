"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("element - getCssPropertyValue - element", function () {
  let valueAct;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.96.27/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    // await handleCookiesConsent();
  });

  it("Execution", async function () {
    const product = await nonUi5.element.getByXPath("//div[contains(text(),'Laptops')]");
    valueAct = await nonUi5.element.getCssPropertyValue(product, "visibility");
  });

  it("Verification", async function () {
    const valueExp = "visible";
    await common.assertion.expectEqual(valueAct, valueExp);
  });
});
