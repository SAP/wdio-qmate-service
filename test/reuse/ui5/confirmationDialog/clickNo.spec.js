"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");
const selectorForNoButton = {
  "elementProperties": {
    "metadata": "sap.m.Button",
    "text": "No"
  }
};

const selectorForPopup = {
  "elementProperties": {
    "metadata": "sap.m.Dialog"
  }
};

describe("confirmationDialog - clickNo", function () {
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

    // Open Dialog window (with "Yes", "No", "Custom Action")
    await ui5.userInteraction.click(openDialogButton);
  });

  it("Execution", async function () {
    // Check Dialog window opened
    await expect(ui5.element.getDisplayed(selectorForPopup))
      .resolves.toBeTruthy();

    // Check we have "No" button to click
    await expect(ui5.element.getDisplayed(selectorForNoButton)).resolves.toBeTruthy();

    await ui5.confirmationDialog.clickNo();
  });

  it("Verification", async function () {
    // Dialog window closed via button "No"
    await expect(ui5.element.getDisplayed(selectorForPopup))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("confirmationDialog - clickNo without 'No' button (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageBox/sample/sap.m.sample.MessageBoxInitialFocus");
    await util.browser.switchToIframe("[id='sampleFrame']");
    const openDialogButton = {
      "elementProperties": {
        "viewName": "sap.m.sample.MessageBoxInitialFocus.V",
        "metadata": "sap.m.Button",
        "text": "Action"
      }
    };

    // Open Dialog window (without "No")
    await ui5.userInteraction.click(openDialogButton);
  });

  it("Execution", async function () {
    // Check Dialog window opened
    await expect(ui5.element.getDisplayed(selectorForPopup)).resolves.toBeTruthy();

    // Check we have no "No" button to click
    await expect(ui5.element.getDisplayed(selectorForNoButton))
      .rejects.toThrow(/No visible elements found/);
  });

  it("Execution & Verification", async function () {
    await expect(ui5.confirmationDialog.clickNo())
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("confirmationDialog - clickNo without confirmation dialog (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    // No Dialog window opened
    await expect(ui5.element.getDisplayed(selectorForPopup))
      .rejects.toThrow(/No visible elements found/);

    await expect(ui5.confirmationDialog.clickNo())
      .rejects.toThrow(/No visible elements found/);
  });
});