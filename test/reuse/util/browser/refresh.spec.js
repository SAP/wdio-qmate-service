"use strict";




describe("browser - refresh", function () {
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
        "id": "*aboutMenuItem-unifiedmenu"
      }
    };
    await ui5.userInteraction.click(selector);
    await util.browser.refresh();
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