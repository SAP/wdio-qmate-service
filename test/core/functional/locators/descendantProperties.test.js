"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("webdriver.io page locator test", function () {

  it("should access element by elementProperties, descendantProperties and inner descendantProperties", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Button/sample/sap.m.sample.Button");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const backButtonProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "type": "Back"
      },
      "descendantProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.ui.core.Icon",
        "src": "sap-icon://nav-back"
      }
    };

    const backButton = await browser.uiControl(backButtonProperties);
    await expect(backButton).toBeDisplayed();
    await expect(backButton).toBeClickable();

    // Use nested ancestorProperties
    const backButtonWithNestedDescendantProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "type": "Back",
        "descendantProperties": {
          "viewName": "sap.m.sample.Button.Page",
          "metadata": "sap.ui.core.Icon",
          "src": "sap-icon://nav-back"
        }
      }
    };

    const sameBackButton = await browser.uiControl(backButtonWithNestedDescendantProperties);
    await expect(sameBackButton).toBeDisplayed();
    await expect(sameBackButton).toBeClickable();

    // Compare IDs to be sure that both elements are the same reject button;
    const backButtonId = await backButton.getProperty("id");
    const sameBackButtonId = await sameBackButton.getProperty("id");

    expect(backButtonId).toEqual(sameBackButtonId);
  });

  it("should access element(s) by descendantProperties", async function () {
    await browser.url("#/categories");
    const ui5ControlProperties = {
      "descendantProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.List",
        "id": "*categoryList"
      }
    };

    // Code before fixes:
    // const elems = await browser.uiControls(ui5ControlProperties);
    // expect(elems).toBeInstanceOf(Array);
    // expect(elems).toBeElementsArrayOfSize({ gte: 1 });

    // Code after fixes:
    await expect(browser.uiControls(ui5ControlProperties, 1, 1000))
      .rejects.toThrowError(/No visible elements found/);
  });

  it("should access element by element properties and descendant properties", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Button/sample/sap.m.sample.Button");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const ui5ControlProperties = {
      "elementProperties": {
        "metadata": "sap.m.FlexItemData",
        "viewName": "sap.m.sample.Button.Page"
      },
      "descendantProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "text": "Default"
      }
    };
    const elem = await browser.uiControl(ui5ControlProperties);

    await expect(elem).toBeDisplayedInViewport();
    expect(elem).toBeInstanceOf(Object);
    expect(elem).toHaveAttribute("elementId");
  });

  it("try access element by wrong descendant properties and catch error", async function () {
    await browser.url("#/categories");
    const wrongProperties = {
      "descendantProperties": {
        "viewName": "sapcart.view.App",
        "metadata": "sap.ui.core.mvc.XMLView",
        "displayBlock": "true"
      }
    };
    await expect(browser.uiControl(wrongProperties, 1, 1000))
      .rejects.toThrowError(/No visible elements found/);
  });

});
