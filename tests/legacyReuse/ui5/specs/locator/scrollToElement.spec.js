"use strict";
const {handleCookiesConsent} = require("../../../../helper/utils");

describe("locator - scrollToElement", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html");
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Welcome",
        "metadata": "sap.m.Title",
        "text": [{
          "path": "i18n>promotedTitle"
        }]
      }
    };
    const index = 0;
    const alignment = "start";
    const timeout = 30000;
    await ui5.common.locator.scrollToElement(selector, index, alignment, timeout);
    await ui5.common.assertion.expectToBeVisible(selector);
  });
});

describe("locator - scrollToElement outside of viewpoint", function () {
  it("Preparation", async function () {
    await ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selectorForDropdownList = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.MultiComboBox"
      }
    };
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.StandardListItem",
        "title": "Smart Games"
      }
    };

    await ui5.common.userInteraction.clickSelectArrow(selectorForDropdownList);
    await ui5.common.locator.scrollToElement(selector);
    await ui5.common.userInteraction.click(selector);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.Token"
      }
    };
    await ui5.common.assertion.expectAttributeToBe(selector, "text", "Smart Games");
  });
});

describe("locator - scrollToElement and catch error", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html");
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "ghgjho.cart.view.Welcome",
        "metadata": "",
        "text": [{
          "path": "i18n>promotedTitle"
        }]
      }
    };
    const index = 0;
    const alignment = "start";
    const timeout = 30000;
    await expect(ui5.common.locator.scrollToElement(selector, index, alignment, timeout))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});
