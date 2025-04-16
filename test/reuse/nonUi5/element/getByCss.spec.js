"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("element - getByCss + expectToBeVisible", function () {

  let downloadBtn;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    downloadBtn = await nonUi5.element.getByCss("[id='sdk---app--apiMasterTab-text']");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(downloadBtn, 10000);
  });
});

describe("element - getByCss outside of viewpoint", function () {
  let comboBoxElement;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
    await util.browser.refresh(); // Need a refresh here as sapui5.hana.ondemand.com doesn't work correctly from time to time
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const selectorForDropdownList = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.MultiComboBox"
      }
    };

    await ui5.userInteraction.clickSelectArrow(selectorForDropdownList);
  });

  it("Execution", async function () {
    // It should be  Photo Scan - combobox element at the end
    comboBoxElement = await nonUi5.element.getByCss(".sapMMultiComboBoxItem", 80);
  });

  it("Verification", async function () {
    // Element is visible, but not in a viewport
    await nonUi5.assertion.expectToBeVisible(comboBoxElement);
    const isElementDisplayed = await comboBoxElement.isDisplayedInViewport();
    await common.assertion.expectFalse(isElementDisplayed);
  });
});

describe("element - getByCss and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.getByCss("[id='sdk--readMoreButton-BDI-content']"))
      .rejects.toThrow("Function 'getByCss' failed");
  });
});