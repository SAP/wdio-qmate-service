"use strict";

describe("locator - getElementByXPath + expectToBeVisible", function () {

  let searchInput;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution", async function () {
    searchInput = await non_ui5.common.locator.getElementByXPath("//input[@id='container-cart---homeView--searchField-I']");
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectToBeVisible(searchInput, 10000);
  });
});

describe("locator - getElementByXPath and catch error", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.locator.getElementByXPath("sap-word"))
      .rejects.toThrow("Function 'getElementByXPath' failed");
  });
});