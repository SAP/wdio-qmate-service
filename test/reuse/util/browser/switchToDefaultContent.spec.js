"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("browser - switchToDefaultContent", function () {

  let elem;
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
    elem = await $("iframe[id='sampleFrame']");
    await nonUi5.userInteraction.scrollToElement(elem);
    await util.browser.switchToIframe("iframe[id='sampleFrame']");
    await ui5.element.getDisplayed(dialogSelector);
  });

  it("Execution", async function () {
    await util.browser.switchToDefaultContent();
  });

  it("Verification", async function () {
    await expect(ui5.element.getDisplayed(dialogSelector))
      .rejects.toThrow("uiControlExecuteLocator(): No visible elements found with selector");
  });
});

