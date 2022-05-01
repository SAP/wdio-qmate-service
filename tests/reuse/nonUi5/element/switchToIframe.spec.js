"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("element - switchToIframe + expectToBeVisible", function () {

  let elem;

  it("Preparation", async function () {
    //keep latest demo kit version due to iframes here
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Dialog/sample/sap.m.sample.Dialog");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    elem = await $("iframe[id='sampleFrame']");
    await nonUi5.userInteraction.scrollToElement(elem);
    await nonUi5.element.switchToIframe("iframe[id='sampleFrame']");
  });
});

describe("element - switchToIframe and catch error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.suite.ui.commons.imageeditor/sample/sap.suite.ui.commons.sample.ImageEditorContainer");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.switchToIframe("iframe[id*='__uploader']"))
      .rejects.toThrow(/Expected element not visible for selector/);
  });
});
