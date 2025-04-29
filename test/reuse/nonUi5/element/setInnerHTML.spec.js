"use strict";

const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("element - getById + expectToBeVisible", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const elem = await nonUi5.element.getByCss("SPAN[id='container-cart---homeView--page-title-inner']");
    await nonUi5.element.setInnerHTML(elem, "Hello World!");
  });

  it("Verification", async function () {
    const elem = await nonUi5.element.getByCss("SPAN[id='container-cart---homeView--page-title-inner']");
    await nonUi5.assertion.expectValueToBe(elem, "Hello World!");
  });
});