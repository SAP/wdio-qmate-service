"use strict";

const browser = require("../../../../lib/reuse/modules/util/browser");
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("browser - back", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.m.IconTabFilter",
        "text": [{
          "path": "i18n>APP_TABHEADER_ITEM_DOCUMENTATION"
        }]
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution & Verification", async function () {
    await util.browser.back();
    const url = await util.browser.getCurrentUrl();
    util.console.log(`Current url is : ${url}`);
    const baseUrl = await util.browser.getBaseUrl();
    common.assertion.expectEqual(baseUrl, url);
  });

});