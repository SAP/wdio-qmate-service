/* eslint-disable no-console */
"use strict";

describe("browser - compareUI5Versions", function () {

  let isGreaterOrEqual;
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

  describe("major version", function () {
    it("Compare greater than", async function () {
      isGreaterOrEqual = await util.browser.compareUI5Versions("1.1.1", "2.0.0");
      await expect(isGreaterOrEqual).toBeTruthy();
    });
    it("Compare smaller than", async function () {
      isGreaterOrEqual = await util.browser.compareUI5Versions("2.0.0", "1.1.1");
      await expect(isGreaterOrEqual).toBeFalsy();
    });
  });

  describe("minor version", function () {
    it("Compare greater than", async function () {
      isGreaterOrEqual = await util.browser.compareUI5Versions("1.1.1", "1.2.0");
      await expect(isGreaterOrEqual).toBeTruthy();
    });
    it("Compare smaller than", async function () {
      isGreaterOrEqual = await util.browser.compareUI5Versions("1.2.0", "1.1.1");
      await expect(isGreaterOrEqual).toBeFalsy();
    });
  });

  describe("lowest version", function () {
    it("Compare greater than", async function () {
      isGreaterOrEqual = await util.browser.compareUI5Versions("1.1.1", "1.1.2");
      await expect(isGreaterOrEqual).toBeTruthy();
    });
    it("Compare smaller than", async function () {
      isGreaterOrEqual = await util.browser.compareUI5Versions("1.1.2", "1.1.1");
      await expect(isGreaterOrEqual).toBeFalsy();
    });
    it("Compare equal than", async function () {
      isGreaterOrEqual = await util.browser.compareUI5Versions("1.1.1", "1.1.1");
      await expect(isGreaterOrEqual).toBeTruthy();
    });
    it("compare against current version", async function () {
      const currentUI5Version = (await util.browser.getUI5Version()).version;
      isGreaterOrEqual = await util.browser.compareUI5Versions(currentUI5Version);
      await expect(isGreaterOrEqual).toBeTruthy();
    });
  });

});
