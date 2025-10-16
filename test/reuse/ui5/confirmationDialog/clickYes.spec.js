"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");
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
    await util.browser.switchToIframe("[id='sampleFrame']");

    const openDialogButton = {
      "elementProperties": {
        "viewName": "sap.m.sample.MessageBoxInitialFocus.V",
        "metadata": "sap.m.Button",
        "text": "Custom action"
      }
    };

    await ui5.userInteraction.click(openDialogButton);
  });

  it("Execution", async function () {
    // Check Dialog window opened
    await expect(ui5.element.getDisplayed(selectorForDialog))
      .resolves.toBeTruthy();

    // Check we have "Yes" button to click
    await expect(ui5.element.getDisplayed(selectorForYesButton))
      .resolves.toBeTruthy();

    await ui5.confirmationDialog.clickYes();
  });

  it("Verification", async function () {
    // Check Dialog closed
    await expect(ui5.element.getDisplayed(selectorForDialog))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("confirmationDialog - clickYes without confirmation dialog (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    // Check No Dialog available
    await expect(ui5.element.getDisplayed(selectorForDialog))
      .rejects.toThrow(/No visible elements found/);

    // Check No "Yes" button available
    await expect(ui5.element.getDisplayed(selectorForYesButton))
      .rejects.toThrow(/No visible elements found/);

    await expect(ui5.confirmationDialog.clickYes())
      .rejects.toThrow(/No visible elements found/);
  });
});