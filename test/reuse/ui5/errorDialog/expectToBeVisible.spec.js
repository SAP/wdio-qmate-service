"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.js");
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("errorDialog - expectToBeVisible", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.m.Dialog/sample/sap.m.sample.DialogMessage`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await expect(ui5.errorDialog.expectToBeVisible())
      .rejects.toThrow(/No visible elements/);

    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.DialogMessage.V",
        "metadata": "sap.m.Button",
        "text": "Message Dialog (Error)"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Verification", async function () {
    await ui5.errorDialog.expectToBeVisible();
  });
});