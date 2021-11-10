"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("locator - getByChild", function () {
  let parentSelector;
  let childSelector;
  let finalElement;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    parentSelector = "[id='container-cart---homeView--searchField-F']";
    childSelector = "[id='container-cart---homeView--searchField-I']";
    finalElement = await nonUi5.element.getByChild(parentSelector, childSelector);

  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(finalElement, 10000);
  });
});

describe("locator - getByChild - error case with wrong element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const parentSelector = ".wrongParent";
    const childSelector = ".wrongChild";
    await expect(nonUi5.element.getByChild(parentSelector, childSelector))
      .rejects.toThrow("Function 'getByChild' failed. No element found with selector");
  });
});

describe("locator - getByChild - error case with wrong order of parent and child", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const parentSelector = "[id='container-cart---homeView--searchField-I']";
    const childSelector = "[id='container-cart---homeView--searchField-F']";
    await expect(nonUi5.element.getByChild(parentSelector, childSelector))
      .rejects.toThrow("Function 'getByChild' failed. The found element(s) with the given selector do(es) not have any child with selector");
  });
});