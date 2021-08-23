"use strict";

describe("locator - getElementByClass + expectToBeVisible", function () {

  let downloadBtn;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution", async function () {
    downloadBtn = await non_ui5.common.locator.getElementByClass("sapMPageSubHeader");
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectToBeVisible(downloadBtn, 10000);
  });
});

describe("locator - getElementByClass and catch error", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.locator.getElementByClass("sapMPSubHeader"))
      .rejects.toThrow("getElementByClass(): Element with class \"sapMPSubHeader\" not found.");
  });
});
