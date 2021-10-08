"use strict";
const {
  handleCookiesConsent
} = require("../../../../helper/utils");

describe("locator - getElementByCss + expectToBeVisible", function () {

  let downloadBtn;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    downloadBtn = await non_ui5.common.locator.getElementByCss("[id='sdk---app--apiMasterTab-text']");
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectToBeVisible(downloadBtn, 10000);
  });
});

describe("locator - getElementByCss outside of viewpoint", function () {
  let comboBoxElement;
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
    await utilities.browser.refresh(); // Need a refresh here as sapui5.hana.ondemand.com doesn't work correctly from time to time
    await handleCookiesConsent();

    const selectorForDropdownList = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.MultiComboBox"
      }
    };

    await ui5.common.userInteraction.clickSelectArrow(selectorForDropdownList);
  });

  it("Execution", async function () {
    // It should be  Photo Scan - combobox element at the end
    comboBoxElement = await non_ui5.common.locator.getElementByCss(".sapMMultiComboBoxItem", 80);
  });

  it("Verification", async function () {
    // Element is visible, but not in a viewport
    await non_ui5.common.assertion.expectToBeVisible(comboBoxElement);
    const isElementDisplayed = await comboBoxElement.isDisplayedInViewport();
    await non_ui5.common.assertion.expectFalse(isElementDisplayed);
  });
});

describe("locator - getElementByCss and catch error", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.locator.getElementByCss("[id='sdk--readMoreButton-BDI-content']"))
      .rejects.toThrow("Function 'getElementByCss' failed");
  });
});