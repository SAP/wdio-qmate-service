"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.js");
const { handleCookiesConsent } = require("../../../helper/utils");

describe("webdriver.io page locator test", function () {
  it("should access element by elementProperties, parentProperties and inner parentProperties", async function () {
    await browser.navigateTo(
      `${BASE_URL}/#/entity/sap.m.Button/sample/sap.m.sample.Button`
    );
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const backButtonProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://nav-back"
      },
      "parentProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "type": "Back"
      }
    };

    const backButton = await browser.uiControl(backButtonProperties);
    await expect(backButton).toBeDisplayed();
    await expect(backButton).toBeClickable();
  });


  it("try access element by elementProperties and wrong parent properties and catch error", async function () {
    await browser.url("#/categories");
    const wrongProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://nav-back"
      },
      "parentProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "m.Button",
        "type": "Back"
      }
    };
    await expect(browser.uiControl(wrongProperties))
      .rejects.toThrowError(/No visible elements found/);
  });
});
