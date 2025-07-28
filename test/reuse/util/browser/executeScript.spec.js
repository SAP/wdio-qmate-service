"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("browser - executeScript", function () {

  const aboutDialogSelector = {
    "elementProperties": {
      "viewName": "sap.ui.documentation.sdk.view.App",
      "metadata": "sap.m.Image",
      "id": "aboutDialogFragment--aboutLogoSAP"
    }
  };

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
        "metadata": "sap.m.MenuItem",
        "icon": "sap-icon://hint"
      }
    };
    await ui5.userInteraction.click(selector);
    await ui5.element.getDisplayed(aboutDialogSelector);
    await util.browser.executeScript("document.location.reload()");
  });

  it("Verification", async function () {
    await expect(ui5.element.getDisplayed(aboutDialogSelector, 0, 3000))
      .rejects.toThrow(/No visible elements found with selector/);
  });
});