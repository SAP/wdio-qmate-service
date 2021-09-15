"use strict";
const { handleCookiesConsent } = require("../../../reuseApi/tests/utils");

describe("webdriver.io page locator test", function () {

  this.beforeAll(async () => {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Button/sample/sap.m.sample.Button");
    await handleCookiesConsent();
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

  it("should access element by child properties", async function () {
    const backButtonProperties = {
      "childProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://nav-back"
      }
    };
    const backButton = await browser.uiControl(backButtonProperties);
    await expect(backButton).toBeDisplayed();
    await expect(backButton).toBeClickable();


    const allPropertiesNamesOnElementLevel = await backButton.getAllUI5Properties();
    console.log(allPropertiesNamesOnElementLevel);
    expect(allPropertiesNamesOnElementLevel).toBeInstanceOf(Array);
    expect(allPropertiesNamesOnElementLevel).toContain("type");
  });

  it("should access element(s) by child properties and index", async function () {
    const defaultButtonsProperties = {
      "childProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.ToolbarSpacer"
      }
    };
    const firstButton = await browser.uiControl(defaultButtonsProperties, 0);
    const firstButtonId = await firstButton.getProperty("id");

    const secondButton = await browser.uiControl(defaultButtonsProperties, 1);
    const secondButtonId = await secondButton.getProperty("id");
    expect(firstButtonId).not.toEqual(secondButtonId);
  });

  it("try access element by wrong child properties and catch error", async function () {
    const wrongProperties = {
      "childProperties": {
        "viewName": "sap.m..Button.Page",
        "metadata": "sap.m.ToolbarSpacer"
      }
    };
    await expect(browser.uiControl(wrongProperties)).rejects.toThrowError(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});
