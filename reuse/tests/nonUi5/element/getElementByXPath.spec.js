"use strict";

describe("locator - getElementByXPath + expectToBeVisible", function () {

  let searchInput;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution", async function () {
    searchInput = await nonUi5.element.getElementByXPath("//input[@id='container-cart---homeView--searchField-I']");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(searchInput, 10000);
  });
});

describe("locator - getElementByXPath and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.getElementByXPath("sap-word"))
      .rejects.toThrow("Function 'getElementByXPath' failed");
  });
});