"use strict";
describe("element - getPropertyValue", function () {

  let value;

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };
    const index = 0;
    const timeout = 30000;
    const property = "title";
    value = await ui5.element.getPropertyValue(selector, property, index, timeout);
  });

  it("Verification", async function () {
    await common.assertion.expectEqual(value, "Laptops");
  });
});

describe("element - getPropertyValue - wrong property", function () {

  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.StandardListItem",
        "bindingContextPath": "/ProductCategories*'LT')"
      }
    };
    const index = 0;
    const timeout = 30000;
    const property = "vbcza";
    expect(ui5.element.getPropertyValue(selector, property, index, timeout))
      .rejects.toThrow("Function 'getPropertyValue' failed: Not existing property");
  });
});

describe("element - getPropertyValue - wrong selector", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "fdsadgmo.cart.view.Home",
        "metadata": "sadsagdsgStandardListItem",
        "bindingContextPath": "/*'LT')"
      }
    };
    const index = 0;
    const timeout = 30000;
    const property = "title";
    await expect(ui5.element.getPropertyValue(selector, property, index, timeout))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("element - getPropertyValue - boolean property", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.CheckBox/sample/sap.m.sample.CheckBox");
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.CheckBox.CheckBoxGroup",
        "metadata": "sap.m.CheckBox",
        "text": "Option b"
      }
    };
    const index = 0;
    const timeout = 30000;
    const property = "selected";
    // need to make sure that getPropertyValue returns a stringified boolean
    await expect(await ui5.element.getPropertyValue(selector, property, index, timeout)).toStrictEqual(false);
  });
});