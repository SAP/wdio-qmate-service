"use strict";

describe("browser - getUI5Version", function () {

  let ui5VersionInfo;
  it("Preparation", async function () {
    await browser.navigateTo(browser.config.baseUrl);
    await utilities.function.executeOptional(async function () {
      const selector = {
        "elementProperties": {
          "viewName": "sap.ui.documentation.sdk.view.App",
          "metadata": "sap.m.Button",
          "text": [{
            "path": "i18n>COOKIE_SETTINGS_DIALOG_FUNCTIONAL_COOKIES_ACCEPT_ALL"
          }]
        }
      };
      await ui5.common.userInteraction.click(selector, 0, 15000);
    }, []);
  });

  it("Execution", async function () {
    //TODO fix endless loading 
    ui5VersionInfo = await util.browser.getUI5Version();
    console.log(ui5VersionInfo);
  });

  it("Verification", async function () {
    await expect(ui5VersionInfo).toBeDefined();
  });

});
