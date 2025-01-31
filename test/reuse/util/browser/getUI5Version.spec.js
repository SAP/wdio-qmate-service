/* eslint-disable no-console */
"use strict";

describe("browser - getUI5Version", function () {

  let ui5VersionInfo;
  it("Preparation", async function () {
    await browser.navigateTo(browser.config.baseUrl);
    await util.function.executeOptional(async function () {
      const selector = {
        "elementProperties": {
          "viewName": "sap.ui.documentation.sdk.view.App",
          "metadata": "sap.m.Button",
          "text": [{
            "path": "i18n>COOKIE_SETTINGS_DIALOG_FUNCTIONAL_COOKIES_ACCEPT_ALL"
          }]
        }
      };
      await ui5.userInteraction.click(selector, 0, 15000);
    }, []);
  });

  it("Execution", async function () {
    ui5VersionInfo = await util.browser.getUI5Version();
    console.log(ui5VersionInfo);
  });

  it("Verification", async function () {
    await expect(ui5VersionInfo).toBeDefined();
    await expect(await ui5VersionInfo.isAtLeast('0.0.0')).toBeTruthy();
    await expect(await ui5VersionInfo.isAtLeast(ui5VersionInfo.version)).toBeTruthy();
    await expect(await ui5VersionInfo.isAtLeast('99.99.99')).toBeFalsy();
  });

});
