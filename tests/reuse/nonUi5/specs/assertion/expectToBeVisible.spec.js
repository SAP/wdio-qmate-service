"use strict";
const { handleCookiesConsent } = require("../../../utils");

describe("assertion - getElementByCss + expectToBeVisible", function () {
  let visibleElement;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution", async function () {
    visibleElement = await non_ui5.common.locator.getElementByCss("#visibleParagraph");
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectToBeVisible(visibleElement, 10000);
  });
});

describe("assertion - expectToBeVisible for element out of viewpoint", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
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
    await ui5.common.userInteraction.clickSelectArrow(selectorForDropdownList);
  });

  it("Verification", async function () {
    // Get id of an element at the end of dropdown list
    const elem = await non_ui5.common.locator.getElementByCssContainingText(".sapMMultiComboBoxItem", "Smart Games");
    await non_ui5.common.assertion.expectToBeVisible(elem);
  });
});

describe("assertion - expectToBeVisible and catch error", function () {

  let hiddenElement;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution", async function () {
    // Get hidden elements (cannot use 'getElementByCss' here as element with id=hiddenParagraph is being hidden)
    const hiddenElements = await non_ui5.common.locator.waitForAllElements("#hiddenParagraph");
    non_ui5.common.assertion.expectDefined(hiddenElements);
    non_ui5.common.assertion.expectDefined(hiddenElements.length);

    hiddenElement = hiddenElements[0];
    non_ui5.common.assertion.expectDefined(hiddenElement);
  });

  it("Verification", async function () {
    await expect(non_ui5.common.assertion.expectToBeVisible(hiddenElement))
      .rejects.toThrow("Timeout by waiting for element to be visible.");

    await expect(non_ui5.common.assertion.expectToBeVisible(undefined))
      .rejects.toThrow("expectToBeVisible(): 'element' is empty");
  });
});
