"use strict";
describe("assertion - isElementPresent for list item element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const itemElements = await nonUi5.element.waitForAllElements(".sapMSLITitleOnly=Computer System Accessories");
    common.assertion.expectDefined(itemElements);
    common.assertion.expectDefined(itemElements.length);
    const isPresent = await nonUi5.assertion.isElementPresent(itemElements[0]);
    await common.assertion.expectTrue(isPresent);
  });
});


describe("assertion - isElementPresent for hidden element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const hiddenElements = await nonUi5.element.waitForAllElements(".sapUiInvisibleText");
    common.assertion.expectDefined(hiddenElements);
    common.assertion.expectDefined(hiddenElements.length);
    const isPresent = await nonUi5.assertion.isElementPresent(hiddenElements[0]);
    await common.assertion.expectTrue(isPresent);
  });
});


describe("assertion - isElementPresent for wrong element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.assertion.isElementPresent(".sapUiInvisibleText"))
      .rejects.toThrow(/not a function/);
  });
});