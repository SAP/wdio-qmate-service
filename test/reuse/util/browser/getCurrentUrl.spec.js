"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("browser - getCurrentUrl", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Verification", async function () {
    const url = await util.browser.getCurrentUrl();
    await common.assertion.expectEqual(url, browser.config.baseUrl);
  });

  it("Go to Samples page", async function () {
    await handleCookiesConsent();
    //await util.browser.switchToIframe("[id='sampleFrame']");
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.m.IconTabFilter",
        "text": [{
          "path": "i18n>APP_TABHEADER_ITEM_SAMPLES"
        }]
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Verification of Samples URL", async function () {
    const url = await util.browser.getCurrentUrl();
    await common.assertion.expectEqual(url, `${browser.config.baseUrl}#/controls`);
  });

});