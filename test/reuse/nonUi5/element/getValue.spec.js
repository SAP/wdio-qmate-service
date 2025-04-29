"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("element - getValue", function () {
  let actValue;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const elem = await nonUi5.element.getByXPath("//div[contains(text(),'Laptops')]");
    actValue = await nonUi5.element.getValue(elem);
  });

  it("Verification", async function () {
    await common.assertion.expectEqual(actValue, "Laptops");
  });
});

describe("element - getValue - innerHTML", function () {
  let actValue;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution", async function () {
    const elem = await nonUi5.element.getByCss("SPAN[id='container-cart---homeView--page-title-inner']");
    actValue = await nonUi5.element.getValue(elem);
  });

  it("Verification", async function () {
    const expValue = "Product Catalog";
    await common.assertion.expectEqual(actValue, expValue);
  });
});

describe("element - getValue - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.getValue())
      .rejects.toThrow("Function 'getValue' failed");
  });
});