"use strict";
const { handleCookiesConsent } = require("../../../../helper/utils");
const selectorForPopupOkButton = {
  "elementProperties": {
    "metadata": "sap.m.Button",
    "text": "OK"
  }
};

describe("confirmationDialog - clickOk", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.Input/sample/sap.m.sample.InputChecked");
    await handleCookiesConsent();

    const submitButtonSelector = {
      "elementProperties": {
        "viewName": "sap.m.sample.InputChecked.V",
        "metadata": "sap.m.Button"
      }
    };

    await ui5.common.userInteraction.click(submitButtonSelector);

    // Check Dialog window
    await expect(ui5.common.locator.getDisplayedElement(selectorForPopupOkButton)).resolves.toBeTruthy();
  });

  it("Execution", async function () {
    await ui5.common.confirmationDialog.clickOk();
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
    await ui5.common.assertion.expectValidationError(inputFieldWithCheckSelector);

    // No dialog with "Ok" button any more
    await expect(ui5.common.locator.getDisplayedElement(selectorForPopupOkButton))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("confirmationDialog - clickOk without confirmation dialog (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    // No dialog with "Ok" button
    await expect(ui5.common.locator.getDisplayedElement(selectorForPopupOkButton))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

    await expect(ui5.common.confirmationDialog.clickOk())
      .rejects.toThrow(/waitUntil condition failed/);
  });
});
