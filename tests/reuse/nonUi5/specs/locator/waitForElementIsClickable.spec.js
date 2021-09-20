"use strict";
const { handleCookiesConsent } = require("../../../utils");

describe("locator - waitForElementIsClickable", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await non_ui5.common.locator.waitForElementIsClickable("[id='sdk---app--changeVersionButton-BDI-content']", 40000);
  });
});

describe("locator - waitForElementIsClickable and catch error", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/category/AC/product/HT-6111");
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.locator.waitForElementIsClickable("[class='sdk---app--changeVersionButton-BDI-content']", 40000))
      .rejects.toThrow("waitForElementIsClickable(): Timeout by waiting for element for selector '[class='sdk---app--changeVersionButton-BDI-content']' to be clickable.");
  });
});
