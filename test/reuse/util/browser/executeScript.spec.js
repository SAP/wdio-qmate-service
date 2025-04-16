"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("browser - executeScript", function () {
  it("Preparation", async function () {
    await browser.navigateTo(browser.config.baseUrl);
    await handleCookiesConsent();
  });
  it("Execution", async function () {
    let selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.ui.core.Icon",
        "id": "*aboutMenuButton-internalBtn-img"
      }
    };
    await ui5.userInteraction.click(selector);
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.ui.unified.MenuItem",
        "icon": "sap-icon://hint",
        "id": "__item10-unifiedmenu"
      }
    };
    await ui5.userInteraction.click(selector);
    await util.browser.executeScript("document.location.reload()");
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.m.Image",
        "id": "aboutDialogFragment--aboutLogoSAP"
      }
    };
    await expect(ui5.element.getDisplayed(selector, 0, 3000))
      .rejects.toThrow(/No visible elements found with selector/);

  });
});