"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("locator - getElementByChild + expectToBeVisible", function () {

  let parentSelector;
  let childSelector;
  let finalElement;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    parentSelector = "[id='container-cart---homeView--searchField']";
    childSelector = "[class='sapMSFF']";
    finalElement = await nonUi5.element.getElementByChild(parentSelector, childSelector);

  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(finalElement, 10000);
  });
});

describe("locator - getElementByChild and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.getElementByChild(".form01", ".input01"))
      .rejects.toThrow("Function 'getElementByCss' failed");
  });
});