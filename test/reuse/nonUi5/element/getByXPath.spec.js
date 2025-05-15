"use strict";

describe("element - getByXPath + expectToBeVisible", function () {

  let searchInput;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution", async function () {
    searchInput = await nonUi5.element.getByXPath("//input[@id='container-cart---homeView--searchField-I']");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(searchInput, 10000);
  });
});

describe("element - getByXPath and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.getByXPath("sap-word"))
      .rejects.toThrow("Function 'getByXPath' failed");
  });
});