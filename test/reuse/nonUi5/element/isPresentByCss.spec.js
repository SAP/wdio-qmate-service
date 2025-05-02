"use strict";

describe("element - isPresentByCss (id)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution & Verification", async function () {
    let isPresented = await nonUi5.element.isPresentByCss("[id='paragraphWithClass']");
    common.assertion.expectTrue(isPresented);

    isPresented = await nonUi5.element.isPresentByCss("#paragraphWithClass");
    common.assertion.expectTrue(isPresented);
  });
});

describe("element - isPresentByCss (class)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution & Verification", async function () {
    const isPresented = await nonUi5.element.isPresentByCss(".customClass");
    common.assertion.expectTrue(isPresented);
  });
});

describe("element - isPresentByCss (partial text for paragraph)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution & Verification", async function () {
    const isPresented = await nonUi5.element.isPresentByCss("p*=paragraph");
    common.assertion.expectTrue(isPresented);
  });
});

describe("element - isPresentByCss with wrong selector/hidden element and catch error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution & Verification", async function () {
    let isPresented = await nonUi5.element.isPresentByCss("[='wrongSelector']", 1000);
    common.assertion.expectFalse(isPresented);

    isPresented = await nonUi5.element.isPresentByCss("#hiddenParagraph", 1000);
    common.assertion.expectFalse(isPresented);
  });
});

describe("element - isPresent (by class) for list item element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    const isPresent = await nonUi5.element.isPresentByCss(".sapMSLITitleOnly=Computer System Accessories");
    await common.assertion.expectTrue(isPresent);
  });
});

describe("element - isPresent (by class) for hidden element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    const isPresent = await nonUi5.element.isPresentByCss(".sapUiInvisibleText");
    await common.assertion.expectTrue(isPresent);
  });
});