"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("Test 'getUI5Property()' and 'getUI5Properties()' on both element and browser levels", function () {

  it("should access List Element properties on element and browser levels", async function () {
    await browser.url("#/categories");

    const listElementProperties = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'AC')"
      }
    };

    const element = await browser.uiControl(listElementProperties);

    checkMethodsAvailabilityOnBrowserAndElementLevels(element);


    await checkElementAndBrowserAccessAllProperties({
      requiredProperties: ["title", "tooltip", "visible"],
      element
    });

    // Test 'getUI5Property' method on both levels
    const titleValueOnElementLevel = await element.getUI5Property("title");
    await expect(browser.getUI5Property("title", element)).resolves.toEqual(titleValueOnElementLevel);

    const visibleValueOnElementLevel = await element.getUI5Property("visible");
    await expect(browser.getUI5Property("visible", element)).resolves.toEqual(visibleValueOnElementLevel);

    await expect(element).toBeDisplayedInViewport();
  });

  it("should access Checkbox properties on element and browser levels (and track checkbox state)", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.CheckBox/sample/sap.m.sample.CheckBoxTriState");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const mainCheckboxElementProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.CheckBoxTriState.CheckBoxTriState",
        "metadata": "sap.m.CheckBox",
        "text": "select / deselect all"
      }
    };
    const mainCheckboxElement = await browser.uiControl(mainCheckboxElementProperties);

    checkMethodsAvailabilityOnBrowserAndElementLevels(mainCheckboxElement);

    await checkElementAndBrowserAccessAllProperties({
      requiredProperties: ["text", "selected", "partiallySelected", "visible", "editable"],
      element: mainCheckboxElement
    });

    const titleValueOnElementLevel = await mainCheckboxElement.getUI5Property("text");
    expect(titleValueOnElementLevel).toEqual("select / deselect all");
    await expect(browser.getUI5Property("text", mainCheckboxElement)).resolves.toEqual(titleValueOnElementLevel);

    const visibleOnElementLevel = await mainCheckboxElement.getUI5Property("visible");
    expect(visibleOnElementLevel).toBe(true);
    await expect(browser.getUI5Property("visible", mainCheckboxElement)).resolves.toEqual(visibleOnElementLevel);

    const editableOnElementLevel = await mainCheckboxElement.getUI5Property("editable");
    expect(editableOnElementLevel).toBe(true);
    await expect(browser.getUI5Property("editable", mainCheckboxElement)).resolves.toEqual(editableOnElementLevel);

    const selectedOnElementLevel = await mainCheckboxElement.getUI5Property("selected");
    expect(selectedOnElementLevel).toBe(true);
    await expect(browser.getUI5Property("selected", mainCheckboxElement)).resolves.toEqual(selectedOnElementLevel);

    const partiallySelectedOnElementLevel = await mainCheckboxElement.getUI5Property("partiallySelected");
    expect(partiallySelectedOnElementLevel).toBe(true);
    await expect(browser.getUI5Property("partiallySelected", mainCheckboxElement)).resolves.toEqual(partiallySelectedOnElementLevel);

    // Select main and all child checkboxes
    await mainCheckboxElement.click();

    await expect(browser.getUI5Property("selected", mainCheckboxElement)).resolves.toBe(true);
    await expect(mainCheckboxElement.getUI5Property("selected")).resolves.toBe(true);

    await expect(mainCheckboxElement.getUI5Property("partiallySelected")).resolves.toBe(false);
    await expect(browser.getUI5Property("partiallySelected", mainCheckboxElement)).resolves.toBe(false);

    // Deselect main and all child checkboxes
    await mainCheckboxElement.click();

    await expect(mainCheckboxElement.getUI5Property("selected")).resolves.toBe(false);
    await expect(browser.getUI5Property("selected", mainCheckboxElement)).resolves.toBe(false);


    await expect(mainCheckboxElement.getUI5Property("partiallySelected")).resolves.toBe(true);
    await expect(browser.getUI5Property("partiallySelected", mainCheckboxElement)).resolves.toBe(true);
  });

  it("should access Search Field properties on element and browser levels", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const searchFieldProperties = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.SmartTable",
        "metadata": "sap.ui.comp.smartfilterbar.SFBSearchField"
      }
    };

    const searchField = await browser.uiControl(searchFieldProperties);

    checkMethodsAvailabilityOnBrowserAndElementLevels(searchField);

    await checkElementAndBrowserAccessAllProperties({
      requiredProperties: ["value", "placeholder", "showSearchButton"],
      element: searchField
    });

    await expect(searchField.getUI5Property("placeholder")).resolves.toBe("Search");
    await expect(browser.getUI5Property("placeholder", searchField)).resolves.toBe("Search");

    await expect(searchField.getUI5Property("value")).resolves.toBe("");
    await expect(browser.getUI5Property("value", searchField)).resolves.toBe("");
  });

  it("should access Disabled Button properties on element and browser levels", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Button/sample/sap.m.sample.Button");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const disabledButtonProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.Button.Page",
        "metadata": "sap.m.Button",
        "text": "Coming Soon"
      }
    };

    const disabledButton = await browser.uiControl(disabledButtonProperties);

    checkMethodsAvailabilityOnBrowserAndElementLevels(disabledButton);

    await checkElementAndBrowserAccessAllProperties({
      requiredProperties: ["iconFirst", "enabled"],
      element: disabledButton
    });

    await expect(disabledButton.getUI5Property("enabled")).resolves.toBe(false);
    await expect(browser.getUI5Property("enabled", disabledButton)).resolves.toBe(false);
    await expect(disabledButton).toBeDisabled();
  });

  it("should access Enabled Button properties on element and browser levels, try to access properties via wrong/empty name", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Button/sample/sap.m.sample.ButtonWithBadge");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");

    const buttonProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.ButtonWithBadge.Page",
        "metadata": "sap.m.Button"
      }
    };

    const button = await browser.uiControl(buttonProperties);
    checkMethodsAvailabilityOnBrowserAndElementLevels(button);

    await checkElementAndBrowserAccessAllProperties({
      requiredProperties: ["icon", "enabled", "text"],
      element: button
    });

    await expect(button).toBeEnabled();
    await expect(button.getUI5Property("enabled")).resolves.toBe(true);
    await expect(browser.getUI5Property("enabled", button)).resolves.toBe(true);

    await expect(button.getUI5Property("icon")).resolves.toBe("sap-icon://cart");
    await expect(browser.getUI5Property("icon", button)).resolves.toBe("sap-icon://cart");

    const checkboxToRemoveIconProperties = {
      "elementProperties": {
        "viewName": "sap.m.sample.ButtonWithBadge.Page",
        "metadata": "sap.m.CheckBox",
        "text": "Icon"
      }
    };

    const checkboxToRemoveIcon = await browser.uiControl(checkboxToRemoveIconProperties);
    await expect(checkboxToRemoveIcon).toBeClickable();
    await checkboxToRemoveIcon.click();

    await expect(button.getUI5Property("icon")).resolves.toBe("");
    await expect(browser.getUI5Property("icon", button)).resolves.toBe("");

    await expect(button.getUI5Property("wrong_property_name")).resolves.toBeNull();
    await expect(browser.getUI5Property("wrong_property_name", button)).resolves.toBeNull();
    await expect(button.getUI5Property("")).rejects.toThrow("javascript error: done is not a function");
  });
});

function checkMethodsAvailabilityOnBrowserAndElementLevels(element) {
  const example = {
    getAllUI5Properties: expect.any(Function),
    getUI5Property: expect.any(Function)
  };

  // Check that browser has all required methods
  expect(browser).toEqual(expect.objectContaining(example));
  expect(browser.uiControl).toBeTruthy();

  // Check that element has all required methods
  expect(element).toEqual(expect.objectContaining(example));
}

async function checkElementAndBrowserAccessAllProperties({
  requiredProperties,
  element
}) {
  const allPropertiesNamesOnElementLevel = await element.getAllUI5Properties();
  expect(allPropertiesNamesOnElementLevel).toContain(...requiredProperties);

  const allPropertiesNamesOnBrowserLevel = await browser.getAllUI5Properties(element);
  expect(allPropertiesNamesOnElementLevel).toEqual(allPropertiesNamesOnBrowserLevel);
}