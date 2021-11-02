"use strict";
const { handleCookiesConsent } = require("../../../../helper/utils");

const date = new Date();

describe("date - pickDate", function () {
  const dataInput = {
    "elementProperties": {
      "viewName": "sap.m.sample.DatePicker.Group",
      "metadata": "sap.m.DatePicker",
      "showFooter": "false"
    },
    "ancestorProperties": {
      "metadata": "sap.m.Panel",
      "viewName": "sap.m.sample.DatePicker.Group",
      "headerText": "When DatePickers change events are fired the selected date is displayed in the Text control"
    }
  };

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/#/entity/sap.m.DatePicker/sample/sap.m.sample.DatePicker");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await ui5.common.date.pickDate(dataInput, date);
  });

  it("Verification", async function () {
    const value = await ui5.common.locator.getValue(dataInput, "value");
    const arrivedDate = new Date(value);
    ui5.common.assertion.expectEqual(arrivedDate.toDateString(), date.toDateString());
  });
});

describe("date - pickDate without datePiker (unhappy case)", function () {
  const dataInput = {
    "elementProperties": {
      "viewName": "sap.m.sample.DatePicker.Group",
      "metadata": "sap.m.DatePicker",
      "showFooter": "false"
    },
    "ancestorProperties": {
      "metadata": "sap.m.Panel",
      "viewName": "sap.m.sample.DatePicker.Group",
      "headerText": "When DatePickers change events are fired the selected date is displayed in the Text control"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.common.date.pickDate(dataInput, date))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});