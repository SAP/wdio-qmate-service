"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("assertion - expectToBeVisible", function () {
  let visibleElement;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution", async function () {
    visibleElement = await nonUi5.element.getElementByCss("#visibleParagraph");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(visibleElement, 10000);
  });
});

describe("assertion - expectToBeVisible for element out of viewpoint", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selectorForDropdownList = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.MultiComboBox"
      }
    };

    // Expand dropdown list
    await ui5.userInteraction.clickSelectArrow(selectorForDropdownList);
  });

  it("Verification", async function () {
    // Get id of an element at the end of dropdown list
    const elem = await nonUi5.element.getElementByCssContainingText(".sapMMultiComboBoxItem", "Smart Games");
    await nonUi5.assertion.expectToBeVisible(elem);
  });
});

describe("assertion - expectToBeVisible and catch error", function () {

  let hiddenElement;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution", async function () {
    // Get hidden elements (cannot use 'getElementByCss' here as element with id=hiddenParagraph is being hidden)
    const hiddenElements = await nonUi5.element.waitForAllElements("#hiddenParagraph");
    common.assertion.expectDefined(hiddenElements);
    common.assertion.expectDefined(hiddenElements.length);

    hiddenElement = hiddenElements[0];
    common.assertion.expectDefined(hiddenElement);
  });

  it("Verification", async function () {
    await expect(nonUi5.assertion.expectToBeVisible(hiddenElement))
      .rejects.toThrow("Timeout by waiting for element to be visible.");

    await expect(nonUi5.assertion.expectToBeVisible(undefined))
      .rejects.toThrow("Function 'expectToBeVisible' failed. Please provide an element as argument.");
  });
});