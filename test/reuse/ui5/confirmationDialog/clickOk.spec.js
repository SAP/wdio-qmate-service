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

describe("confirmationDialog - clickOk", function () {
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

    // Check Dialog window
    await expect(ui5.element.getDisplayed(selectorForPopupOkButton)).resolves.toBeTruthy();
  });

  it("Execution", async function () {
    await ui5.confirmationDialog.clickOk();
  });

  it("Verification", async function () {
    // After we closed Dialog window, we have a validation error
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

    // No dialog with "Ok" button any more
    await expect(ui5.element.getDisplayed(selectorForPopupOkButton))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("confirmationDialog - clickOk without confirmation dialog (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    // No dialog with "Ok" button
    await expect(ui5.element.getDisplayed(selectorForPopupOkButton))
      .rejects.toThrow(/No visible elements found/);

    await expect(ui5.confirmationDialog.clickOk())
      .rejects.toThrow(/waitUntil condition failed/);
  });
});