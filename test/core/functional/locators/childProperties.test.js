"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("webdriver.io page locator test", function () {

  this.beforeAll(async () => {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Button/sample/sap.m.sample.Button");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("should access element by elementProperties, childProperties and inner childProperties", async function () {
    const backButtonProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "type": "Back"
      },
      "childProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://nav-back"
      }
    };
    const backButton = await browser.uiControl(backButtonProperties);
    await expect(backButton).toBeDisplayed();
    await expect(backButton).toBeClickable();
  });

  it("should access element only by child properties and fail (unhappy case)", async function () {
    const wrongSelectorWithoutElementProperties = {
      "childProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://nav-back"
      }
    };
    await expect(browser.uiControl(wrongSelectorWithoutElementProperties))
      .rejects.toThrowError(/No visible elements found/);
  });
});
