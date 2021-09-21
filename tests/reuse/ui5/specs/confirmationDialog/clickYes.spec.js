"use strict";
const { handleCookiesConsent } = require("../../../utils");
const selectorForYesButton = {
  "elementProperties": {
    "metadata": "sap.m.Button",
    "text": "Yes"
  }
};

const selectorForDialog = {
  "elementProperties": {
    "metadata": "sap.m.Dialog"
  }
};

describe("confirmationDialog - clickYes", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageBox/sample/sap.m.sample.MessageBoxInitialFocus");
    await handleCookiesConsent();

    const openDialogButton = {
      "elementProperties": {
        "viewName": "sap.m.sample.MessageBoxInitialFocus.V",
        "metadata": "sap.m.Button",
        "text": "Custom action"
      }
    };

    await ui5.common.userInteraction.click(openDialogButton);
  });

  it("Execution", async function () {
    // Check Dialog window opened
    await expect(ui5.common.locator.getDisplayedElement(selectorForDialog))
      .resolves.toBeTruthy();

    // Check we have "Yes" button to click
    await expect(ui5.common.locator.getDisplayedElement(selectorForYesButton))
      .resolves.toBeTruthy();

    await ui5.common.confirmationDialog.clickYes();
  });

  it("Verification", async function () {
    // Check Dialog closed
    await expect(ui5.common.locator.getDisplayedElement(selectorForDialog))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("confirmationDialog - clickYes without confirmation dialog (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    // Check No Dialog available
    await expect(ui5.common.locator.getDisplayedElement(selectorForDialog))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

    // Check No "Yes" button available
    await expect(ui5.common.locator.getDisplayedElement(selectorForYesButton))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

    await expect(ui5.common.confirmationDialog.clickYes())
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});
