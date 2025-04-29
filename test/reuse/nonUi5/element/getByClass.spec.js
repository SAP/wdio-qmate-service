"use strict";

describe("element - getByClass + expectToBeVisible", function () {

  let downloadBtn;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution", async function () {
    downloadBtn = await nonUi5.element.getByClass("sapMPageSubHeader");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(downloadBtn, 10000);
  });
});

describe("element - getByClass - multiple classes", function () {

  let element;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution", async function () {
    element = await nonUi5.element.getByClass("sapMPage sapMPageBgSolid sapMPageWithHeader");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(element, 10000);
  });
});

describe("element - getByClass - all classes", function () {

  let element;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution", async function () {
    element = await nonUi5.element.getByClass("sapMPage sapMPageBgSolid sapMPageWithHeader sapMPageWithSubHeader sapMPageBusyCoversAll");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(element, 10000);
  });
});

describe("element - getByClass and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.getByClass("sapMPSubHeader"))
      .rejects.toThrow("Function 'getByClass' failed");
  });
});