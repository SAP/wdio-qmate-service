"use strict";
// describe("element - isElementPresent - list item element", function () {
//   it("Preparation", async function () {
//     await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
//   });

//   it("Execution and Verification", async function () {
//     const itemElement = await nonUi5.element.getElementByCss(".sapMSLITitleOnly=Computer System Accessories");
//     const isPresent = await nonUi5.element.isElementPresent(itemElement);
//     await common.assertion.expectTrue(isPresent);
//   });
// });


describe("element - isElementPresent - hidden element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const hiddenElements = await nonUi5.element.getAll(".sapUiInvisibleText");
    common.assertion.expectDefined(hiddenElements);
    common.assertion.expectDefined(hiddenElements.length);
    const isPresent = await nonUi5.element.isElementPresent(hiddenElements[0]);
    await common.assertion.expectTrue(isPresent);
  });
});


// describe("element - isElementPresent - wrong element", function () {
//   it("Preparation", async function () {
//     await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
//   });

//   it("Execution and Verification", async function () {
//     await expect(nonUi5.element.isElementPresent(".sapUiInvisibleText"))
//       .rejects.toThrow(/not a function/);
//   });
// });