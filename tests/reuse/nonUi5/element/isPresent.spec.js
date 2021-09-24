"use strict";
describe("assertion - isPresent for list item element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const isPresent = await nonUi5.element.isPresent(".sapMSLITitleOnly=Computer System Accessories");
    await common.assertion.expectTrue(isPresent);
  });
});


describe("assertion - isPresent for hidden element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const isPresent = await nonUi5.element.isPresent(".sapUiInvisibleText");
    await common.assertion.expectTrue(isPresent);
  });
});


describe("assertion - isPresent for wrong element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const isPresent = await nonUi5.element.isPresent(".sapUiInvisibleTextThatDoesNotExist");
    await common.assertion.expectFalse(isPresent);
  });
});
