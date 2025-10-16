"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");
const selectorForPopupOkButton = {
  "elementProperties": {
    "metadata": "sap.m.Button",
    "text": "OK"
  }
};

describe("confirmationDialog - clickButton - text 'OK'", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputChecked");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const submitButtonSelector = {
      "elementProperties": {
        "viewName": "sap.m.sample.InputChecked.V",
        "metadata": "sap.m.Button"
      }
    };

    await ui5.userInteraction.click(submitButtonSelector);
  });

  it("Execution", async function () {
    await ui5.confirmationDialog.clickButton("OK");
  });

  it("Verification", async function () {
    // After we close Dialog window, we have a validation error
    const inputFieldWithCheckSelector = {
      "elementProperties": {
        "viewName": "sap.m.sample.InputChecked.V",
        "metadata": "sap.m.Input",
        "value": [{
          "path": "/email"
        }]
      }
    };
    await ui5.assertion.expectValidationError(inputFieldWithCheckSelector);

    await expect(ui5.element.getDisplayed(selectorForPopupOkButton))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("confirmationDialog - clickButton - text 'OK' without confirmation dialog (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.element.getDisplayed(selectorForPopupOkButton))
      .rejects.toThrow(/No visible elements found/);

    await expect(ui5.confirmationDialog.clickButton("OK"))
      .rejects.toThrow(/waitUntil condition failed/);
  });
});

describe("confirmationDialog - clickButton - text 'Cancel'", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageBox/sample/sap.m.sample.MessageBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const confirmButtonSelector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MessageBox.V",
        "metadata": "sap.m.Button",
        "text": "Confirm"
      }
    };

    await ui5.userInteraction.click(confirmButtonSelector);
  });

  it("Execution", async function () {
    await ui5.confirmationDialog.clickButton("Cancel");
  });

  it("Verification", async function () {
    await expect(ui5.element.getDisplayed(selectorForPopupOkButton))
      .rejects.toThrow(/No visible elements found/);
  });
});