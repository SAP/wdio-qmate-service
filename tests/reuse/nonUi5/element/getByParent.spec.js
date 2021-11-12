"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("locator - getByParent", function () {
  let finalElement;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const elementSelector = "[id='container-cart---homeView--searchField-I']";
    const parentSelector = "[id='container-cart---homeView--searchField-F']";
    finalElement = await nonUi5.element.getByParent(elementSelector, parentSelector);

  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(finalElement, 10000);
  });
});

describe("locator - getByParent - with index", function () {
  let elemAct;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Tree/sample/sap.m.sample.TreeExpandMulti");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const elementSelector = "DIV[class='sapMLIBContent']";
    const parentSelector = "LI[role='treeitem'][aria-expanded='false']";
    const index = 2;
    elemAct = await nonUi5.element.getByParent(elementSelector, parentSelector, index);
  });

  it("Verification", async function () {
    const elemExp = await nonUi5.element.getByCssContainingText("DIV[class='sapMLIBContent']", "Node1-3");
    await common.assertion.expectEqual(elemAct.elementId, elemExp.elementId);
  });
});

describe("locator - getByParent - error case with wrong element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const elementSelector = ".wrongParent";
    const parentSelector = ".wrongChild";
    await expect(nonUi5.element.getByParent(elementSelector, parentSelector))
      .rejects.toThrow("Function 'getByParent' failed. No parent element found for selector:");
  });
});

describe("locator - getByParent - error case with wrong order of parent and child", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const elementSelector = "[id='container-cart---homeView--searchField-F']";
    const parentSelector = "[id='container-cart---homeView--searchField-I']";
    await expect(nonUi5.element.getByParent(elementSelector, parentSelector))
      .rejects.toThrow("Function 'getByParent' failed. No visible elements found for selector");
  });
});