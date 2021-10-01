"use strict";
describe("element - getAttributeValue", function () {

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
    const attribute = "title";
    value = await ui5.element.getAttributeValue(selector, attribute, index, timeout);
  });

  it("Verification", async function () {
    await common.assertion.expectEqual(value, "Laptops");
  });
});

describe("element - getAttributeValue with wrong attribute", function () {

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
    const attribute = "vbcza";
    value = await ui5.element.getAttributeValue(selector, attribute, index, timeout);
  });

  it("Verification", async function () {
    await common.assertion.expectUnequal(value, "Laptops");
  });
});

describe("element - getAttributeValue with wrong selector", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "fdsadgmo.cart.view.Home",
        "metadata": "sadsagdsgStandardListItem",
        "bindingContextPath": "/*'LT')"
      }
    };
    const index = 0;
    const timeout = 30000;
    const attribute = "title";
    await expect(ui5.element.getAttributeValue(selector, attribute, index, timeout))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("element - getAttributeValue for boolean attribute", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.CheckBox/sample/sap.m.sample.CheckBox");
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.CheckBox.CheckBoxGroup",
        "metadata": "sap.m.CheckBox",
        "text": "Option b"
      }
    };
    const index = 0;
    const timeout = 30000;
    const attribute = "selected";
    // need to make sure that getAttributeValue returns a stringified boolean
    await expect(await ui5.element.getAttributeValue(selector, attribute, index, timeout)).toStrictEqual("false");
  });
});
