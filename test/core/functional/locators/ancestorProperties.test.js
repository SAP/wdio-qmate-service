"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const { handleCookiesConsent } = require("../../../helper/utils");

describe("webdriver.io page locator test", function () {
  it("should access same element by elementProperties, ancestorProperties and nested ancestorProperties", async function () {
    await browser.navigateTo(
      `${BASE_URL}/#/entity/sap.m.Button/sample/sap.m.sample.Button`
    );
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const rejectButtonProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "text": "Reject"
      },
      "ancestorProperties": {
        "metadata": "sap.m.FlexItemData",
        "viewName": "sap.m.sample.Button.Page"
      }
    };
    const rejectButton = await browser.uiControl(rejectButtonProperties);

    await expect(rejectButton).toBeDisplayedInViewport();
    await expect(rejectButton).toBeClickable();

    // Use nested ancestorProperties
    const rejectButtonWithNestedAncestorProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "text": "Reject",
        "ancestorProperties": {
          "metadata": "sap.m.FlexItemData",
          "viewName": "sap.m.sample.Button.Page"
        }
      }
    };

    const sameRejectButton = await browser.uiControl(
      rejectButtonWithNestedAncestorProperties
    );

    await expect(sameRejectButton).toBeDisplayedInViewport();
    await expect(sameRejectButton).toBeClickable();

    // Compare property id to check that it is the same element
    const rejectButtonId = await rejectButton.getProperty("id");
    await expect(sameRejectButton.getProperty("id")).resolves.toEqual(rejectButtonId);
  });

  it("should access element(s) by ancestor properties and index", async function () {
    await browser.navigateTo(`${BASE_URL}#/entity/sap.m.Button/sample/sap.m.sample.Button`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const defaultButtonsProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "text": "Default"
      },
      "ancestorProperties": {
        "metadata": "sap.m.Toolbar",
        "viewName": "sap.m.sample.Button.Page"
      }
    };

    const buttons = await browser.uiControls(defaultButtonsProperties);
    expect(buttons.length).toBeGreaterThanOrEqual(2);

    const firstButtonWithoutIndex = await browser.uiControl(defaultButtonsProperties);
    const firstButton = await browser.uiControl(defaultButtonsProperties, 0);
    const firstButtonId = await firstButton.getProperty("id");

    // Compare Ids to check that these elements are the same element (with 0-index and without index)
    await expect(firstButtonWithoutIndex.getProperty("id")).resolves.toEqual(firstButtonId);

    const secondButton = await browser.uiControl(defaultButtonsProperties, 1);

    // Compare Ids to check that these are two different buttons
    await expect(secondButton.getProperty("id")).resolves.not.toEqual(firstButtonId);
  });

  it("should try access element only by ancestor properties and fail (unhappy case)", async function () {
    await browser.navigateTo(
      `${BASE_URL}/#/entity/sap.m.Button/sample/sap.m.sample.Button`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const wrongSelectorWithoutElementProperties = {
      "ancestorProperties": {
        "metadata": "sap.tnt.NavigationList",
        "viewName": "sap.tnt.sample.SideNavigation.V",
        "selectedKey": "subItem_non"
      }
    };
    await expect(browser.uiControl(wrongSelectorWithoutElementProperties))
      .rejects.toThrowError(/No visible elements found/);
  });

  it("should access element by elementProperties and multiple ancestorProperties as array - AND (happy case)", async function () {
    await browser.navigateTo(`${BASE_URL}/#/entity/sap.m.Button/sample/sap.m.sample.Button`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    // The Reject button lives inside both a sap.m.Toolbar and a sap.m.Page - both ancestors must exist
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "text": "Reject"
      },
      "ancestorProperties": [
        { "viewName": "sap.m.sample.Button.Page", "metadata": "sap.m.Toolbar" },
        { "viewName": "sap.m.sample.Button.Page", "metadata": "sap.m.Page" }
      ]
    };
    const elem = await browser.uiControl(selector);
    await expect(elem).toBeDisplayed();
    await expect(elem).toBeClickable();
  });

  it("should fail when one entry of ancestorProperties array does not match - AND (unhappy case)", async function () {
    await browser.navigateTo(`${BASE_URL}/#/entity/sap.m.Button/sample/sap.m.sample.Button`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    // Second entry has a non-existent ancestor - AND logic means the whole selector fails
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "text": "Reject"
      },
      "ancestorProperties": [
        { "viewName": "sap.m.sample.Button.Page", "metadata": "sap.m.Toolbar" },
        { "metadata": "sap.m.Table" }
      ]
    };
    await expect(browser.uiControl(selector, 0, 1000))
      .rejects.toThrowError(/No visible elements found/);
  });

  it("should return multiple elements when multiple elements each satisfy array ancestorProperties - AND (multiple results)", async function () {
    await browser.navigateTo(`${BASE_URL}/#/entity/sap.m.Button/sample/sap.m.sample.Button`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    // All buttons inside a Toolbar are also inside a Page - both ancestor conditions satisfied by multiple buttons
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button"
      },
      "ancestorProperties": [
        { "viewName": "sap.m.sample.Button.Page", "metadata": "sap.m.Toolbar" },
        { "viewName": "sap.m.sample.Button.Page", "metadata": "sap.m.Page" }
      ]
    };
    const elems = await browser.uiControls(selector);
    expect(elems.length).toBeGreaterThan(1);
  });
});