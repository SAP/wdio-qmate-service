"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("date - pick - when datePicker has not assigned any date", function () {
  const dataInput = {
    "elementProperties": {
      "viewName": "sap.m.sample.DatePicker.Group",
      "metadata": "sap.m.DatePicker"
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
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution 1", async function () {
    const nextYear = await common.date.calculate("nextYear");
    await ui5.date.pick(dataInput, nextYear);
  });

  it("Verification 1", async function () {
    const value = await ui5.element.getValue(dataInput);
    const arrivedDate = new Date(value);
    const nextYear = await common.date.calculate("nextYear");
    common.assertion.expectEqual(arrivedDate.toDateString(), nextYear.toDateString());
  });

  it("Execution 2", async function () {
    const previousMonth = await common.date.calculate("previousMonth");
    await ui5.date.pick(dataInput, previousMonth);
  });

  it("Verification 2", async function () {
    const value = await ui5.element.getValue(dataInput);
    const arrivedDate = new Date(value);
    const previousMonth = await common.date.calculate("previousMonth");
    common.assertion.expectEqual(arrivedDate.toDateString(), previousMonth.toDateString());
  });
});

describe("date - pick - when datePicker already has date assigned and we change it", function () {
  const dataInput = {
    "elementProperties": {
      "viewName": "sap.m.sample.DatePicker.Group",
      "metadata": "sap.m.DatePicker"
    }
  };

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/#/entity/sap.m.DatePicker/sample/sap.m.sample.DatePicker");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const today = await common.date.calculate("today");
    await ui5.date.pick(dataInput, today, 2);
  });

  it("Verification", async function () {
    const value = await ui5.element.getValue(dataInput, 2);
    const arrivedDate = new Date(value);
    const today = await common.date.calculate("today");
    common.assertion.expectEqual(arrivedDate.toDateString(), today.toDateString());
  });
});

describe("date - pick - using selector for sap.ui.core.Icon", function () {
  const dataInput = {
    "elementProperties": {
      "viewName": "sap.m.sample.DatePicker.Group",
      "metadata": "sap.m.DatePicker"
    }
  };

  const dataInputIcon = {
    "elementProperties": {
      "viewName": "sap.m.sample.DatePicker.Group",
      "metadata": "sap.ui.core.Icon",
      "src": "sap-icon://appointment-2"
    },
    "ancestorProperties": {
      "metadata": "sap.m.DatePicker",
      "viewName": "sap.m.sample.DatePicker.Group"
    }
  };

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/#/entity/sap.m.DatePicker/sample/sap.m.sample.DatePicker");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const today = await common.date.calculate("today");
    await ui5.date.pick(dataInputIcon, today, 2);
  });

  it("Verification", async function () {
    const value = await ui5.element.getValue(dataInput, 2);
    const arrivedDate = new Date(value);
    const today = await common.date.calculate("today");
    common.assertion.expectEqual(arrivedDate.toDateString(), today.toDateString());
  });
});

describe("date - pick without datePiker (unhappy case)", function () {
  const date = new Date();
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
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.date.pick(dataInput, date))
      .rejects.toThrow(/No visible elements found/);
  });
});