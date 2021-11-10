"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("locator - getByParent", function () {
  let parentSelector;
  let childSelector;
  let finalElement;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    parentSelector = "[id='container-cart---homeView--searchField-I']";
    childSelector = "[id='container-cart---homeView--searchField-F']";
    finalElement = await nonUi5.element.getByParent(parentSelector, childSelector);

  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(finalElement, 10000);
  });
});

describe("locator - getByParent - error case with wrong element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const parentSelector = ".wrongParent";
    const childSelector = ".wrongChild";
    await expect(nonUi5.element.getByParent(parentSelector, childSelector))
      .rejects.toThrow("Function 'getByParent' failed. No parent element found for selector:");
  });
});

describe("locator - getByParent - error case with wrong order of parent and child", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const parentSelector = "[id='container-cart---homeView--searchField-F']";
    const childSelector = "[id='container-cart---homeView--searchField-I']";
    await expect(nonUi5.element.getByParent(parentSelector, childSelector))
      .rejects.toThrow("Function 'getByParent' failed. No visible elements found for selector");
  });
});