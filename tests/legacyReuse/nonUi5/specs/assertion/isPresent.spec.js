"use strict";
describe("assertion - isPresent for list item element", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const isPresent = await non_ui5.common.assertion.isPresent(".sapMSLITitleOnly=Computer System Accessories");
    await non_ui5.common.assertion.expectTrue(isPresent);
  });
});


describe("assertion - isPresent for hidden element", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const isPresent = await non_ui5.common.assertion.isPresent(".sapUiInvisibleText");
    await non_ui5.common.assertion.expectTrue(isPresent);
  });
});


describe("assertion - isPresent for wrong element", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const isPresent = await non_ui5.common.assertion.isPresent(".sapUiInvisibleTextThatDoesNotExist");
    await non_ui5.common.assertion.expectFalse(isPresent);
  });
});
