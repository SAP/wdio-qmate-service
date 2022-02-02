"use strict";

describe("browser - clearBrowser", function () {
  it("Preparation", async function () {
    await browser.navigateTo(browser.config.baseUrl);
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.m.Button",
        "text": [{
          "path": "i18n>COOKIE_SETTINGS_DIALOG_FUNCTIONAL_COOKIES_ACCEPT_ALL"
        }]
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution", async function () {
    await util.browser.clearBrowser(true, true, true);
  });

  it("Verification", async function () {
    await util.browser.refresh();
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.m.Button",
        "text": [{
          "path": "i18n>COOKIE_SETTINGS_DIALOG_FUNCTIONAL_COOKIES_ACCEPT_ALL"
        }]
      }
    };
    await ui5.element.getDisplayed(selector);
  });
});