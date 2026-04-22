"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const { handleCookiesConsent } = require("../../../helper/utils");

describe("webdriver.io page locator test", function () {

  this.beforeAll(async () => {
    await browser.navigateTo(`${BASE_URL}/#/entity/sap.m.Button/sample/sap.m.sample.Button`);
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

  it("should access element by elementProperties and multiple childProperties as array - AND (happy case)", async function () {
    // The toolbar has both a Default button and a Reject button as direct children - both must match
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Toolbar"
      },
      "childProperties": [
        { "viewName": "sap.m.sample.Button.Page", "metadata": "sap.m.Button", "text": "Default" },
        { "viewName": "sap.m.sample.Button.Page", "metadata": "sap.m.Button", "text": "Reject" }
      ]
    };
    const elem = await browser.uiControl(selector);
    await expect(elem).toBeDisplayed();
  });

  it("should fail when one entry of childProperties array does not match - AND (unhappy case)", async function () {
    // Second entry has a non-existent child - AND logic means the whole selector fails
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Toolbar"
      },
      "childProperties": [
        { "viewName": "sap.m.sample.Button.Page", "metadata": "sap.m.Button", "text": "Default" },
        { "viewName": "sap.m.sample.Button.Page", "metadata": "sap.m.Button", "text": "this-button-does-not-exist" }
      ]
    };
    await expect(browser.uiControl(selector, 0, 1000))
      .rejects.toThrowError(/No visible elements found/);
  });

  it("should return multiple elements when multiple parents each satisfy array childProperties - AND (multiple results)", async function () {
    // Multiple Toolbars on the page each have both a Button and a ToolbarSpacer as direct children
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Toolbar"
      },
      "childProperties": [
        { "viewName": "sap.m.sample.Button.Page", "metadata": "sap.m.Button" },
        { "metadata": "sap.m.ToolbarSpacer" }
      ]
    };
    const elems = await browser.uiControls(selector);
    expect(elems.length).toBeGreaterThan(1);
  });
});
