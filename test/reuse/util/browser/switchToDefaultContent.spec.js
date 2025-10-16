"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("browser - switchToDefaultContent", function () {

  const dialogSelector = {
    "elementProperties": {
      "viewName": "sap.m.sample.Dialog.V",
      "metadata": "sap.m.Button",
      "text": "Dialog (Fixed Size)"
    }
  };

  it("Preparation", async function () {
    //keep latest demo kit version due to iframes here
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Dialog/sample/sap.m.sample.Dialog");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await util.browser.switchToDefaultContent();
  });

  it("Verification", async function () {
    await expect(ui5.element.getDisplayed(dialogSelector)).rejects.toThrow(/No visible elements found/);
  });
});
