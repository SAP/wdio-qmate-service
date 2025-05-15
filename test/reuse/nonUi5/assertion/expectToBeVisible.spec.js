"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("assertion - expectToBeVisible", function () {
  let visibleElement;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution", async function () {
    visibleElement = await nonUi5.element.getByCss("#visibleParagraph");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(visibleElement, 10000);
  });
});

describe("assertion - expectToBeVisible - element out of viewport", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selectorForDropdownList = {
      elementProperties: {
        viewName: "sap.m.sample.MultiComboBox.view.MultiComboBox",
        metadata: "sap.m.MultiComboBox",
      },
    };
    await ui5.userInteraction.clickSelectArrow(selectorForDropdownList);
  });

  it("Verification", async function () {
    const elem = await nonUi5.element.getByCssContainingText(".sapMMultiComboBoxItem", "Smart Games");
    await nonUi5.assertion.expectToBeVisible(elem);
  });
});

describe("assertion - expectToBeVisible - error case", function () {
  let hiddenElement;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/hiddenAndVisible.html");
  });

  it("Execution", async function () {
    const hiddenElements = await nonUi5.element.getAll("#hiddenParagraph");

    common.assertion.expectDefined(hiddenElements);
    common.assertion.expectDefined(hiddenElements.length);

    hiddenElement = hiddenElements[0];
    common.assertion.expectDefined(hiddenElement);
  });

  it("Verification", async function () {
    await expect(nonUi5.assertion.expectToBeVisible(hiddenElement)).rejects.toThrow("Timeout by waiting for element to be visible.");
    await expect(nonUi5.assertion.expectToBeVisible(undefined)).rejects.toThrow("Function 'expectToBeVisible' failed with: Please provide an element or a CSS selector as first argument.");
  });
});
