"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("browser - switchToIframe", function () {
  let elem;

  it("Preparation", async function () {
    //keep latest demo kit version due to iframes here
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Dialog/sample/sap.m.sample.Dialog");
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    elem = await $("iframe[id='sampleFrame']");
    await nonUi5.userInteraction.scrollToElement(elem);
    await util.browser.switchToIframe("iframe[id='sampleFrame']");
  });
});

describe("browser - switchToIframe - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.suite.ui.commons.imageeditor/sample/sap.suite.ui.commons.sample.ImageEditorContainer");
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    await expect(util.browser.switchToIframe("iframe[id*='__uploader']")).rejects.toThrow(`Function 'switchToIframe' failed with: element ("iframe[id*='__uploader']") still not displayed after 30000ms`);
  });
});
