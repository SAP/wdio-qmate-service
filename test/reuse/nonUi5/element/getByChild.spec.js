"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("element - getByChild", function () {
  let elemAct;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const elementSelector = "[id='container-cart---homeView--searchField-F']";
    const childSelector = "[id='container-cart---homeView--searchField-I']";
    elemAct = await nonUi5.element.getByChild(elementSelector, childSelector);
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(elemAct, 10000);
  });
});

describe("element - getByChild - with index", function () {
  let elemAct;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Tree/sample/sap.m.sample.TreeExpandMulti");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const elementSelector = "LI[role='treeitem'][aria-expanded='false']";
    const childSelector = "DIV[class='sapMLIBContent']";
    const index = 2;
    elemAct = await nonUi5.element.getByChild(elementSelector, childSelector, index);
  });

  it("Verification", async function () {
    const elemExp = await nonUi5.element.getByCssContainingText("LI", "Node1-3");
    await common.assertion.expectEqual(elemAct.elementId, elemExp.elementId);
  });
});

describe("element - getByChild - error case with wrong element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    const elementSelector = ".wrongParent";
    const childSelector = ".wrongChild";
    await expect(nonUi5.element.getByChild(elementSelector, childSelector))
      .rejects.toThrow("Function 'getByChild' failed with: No element found for selector:");
  });
});

describe("element - getByChild - error case with wrong order of parent and child", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    const elementSelector = "[id='container-cart---homeView--searchField-I']";
    const childSelector = "[id='container-cart---homeView--searchField-F']";
    await expect(nonUi5.element.getByChild(elementSelector, childSelector))
      .rejects.toThrow(`Function 'getByChild' failed with: The found element(s) with the given selector do(es) not have any child with selector [id='container-cart---homeView--searchField-F']`);
  });
});