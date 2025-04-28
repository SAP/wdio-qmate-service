"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("assertion - expectValueToBe", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    const product = await nonUi5.element.getByXPath("//div[contains(text(),'Laptops')]");
    await nonUi5.assertion.expectValueToBe(product, "Laptops");
  });
});

describe("assertion - expectValueToBe - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    const product = await nonUi5.element.getByXPath("//div[contains(text(),'Laptops')]");
    await expect(nonUi5.assertion.expectValueToBe(product, "Wrong Value")).rejects.toThrow("toEqual");
  });
});
