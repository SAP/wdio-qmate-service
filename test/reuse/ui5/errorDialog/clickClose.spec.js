"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("errorDialog - clickClose", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Dialog/sample/sap.m.sample.Dialog");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const dialogSelector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Dialog.V",
        "metadata": "sap.m.Button",
        "text": "Dialog (Fixed Size)"
      }
    };
    await ui5.userInteraction.click(dialogSelector);
  });

  it("Verification", async function () {
    const dialogCloseButtonSelector = ui5.errorDialog.selectors.closeButton;
    await ui5.assertion.expectToBeVisible(dialogCloseButtonSelector);

    await ui5.errorDialog.clickClose();
    await ui5.assertion.expectToBeNotVisible(dialogCloseButtonSelector);
  });
});