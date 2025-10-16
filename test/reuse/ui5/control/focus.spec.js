"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("control - focus - for a input field", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.TextInEditModeSource");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const lastInputSelector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smartfield.TextInEditModeSource.Main",
        "metadata": "sap.m.Input",
        "id": "*idValueListNoValidation-input"
      }
    };
    await ui5.control.focus(lastInputSelector);
    await ui5.userInteraction.clearAndFillAndRetry(lastInputSelector, "LN");
  });
});

describe("control - focus", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.ActionSheet");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.ControlsMaster",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/entities/199"
      }
    };
    await ui5.control.focus(selector);  //can see the scroll take place during this step
    await ui5.assertion.expectToBeVisible(selector);
  });
});

describe("control - focus - outside of viewpoint", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
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

    await ui5.userInteraction.clickSelectArrow(selectorForDropdownList);
    await ui5.control.focus(selector);
    await ui5.userInteraction.click(selector);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.Token"
      }
    };
    await ui5.assertion.expectAttributeToBe(selector, "text", "Smart Games");
  });
});

describe("control - focus - no selector found and catch error", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
  });

  it("Execution & Verification", async function () {
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
    const timeout = 30000;
    await expect(ui5.control.focus(selector, index, timeout))
      .rejects.toThrow(/No visible elements found/);
  });
});