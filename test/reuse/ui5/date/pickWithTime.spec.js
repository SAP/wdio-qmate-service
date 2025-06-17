"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

const dateTimePicker = {
  "elementProperties": {
    "viewName": "sap.m.sample.DateTimePicker.Group",
    "metadata": "sap.m.DateTimePicker"
  },
  "ancestorProperties": {
    "metadata": "sap.m.Panel",
    "viewName": "sap.m.sample.DateTimePicker.Group",
    "headerText": "When DateTimePicker change events are fired the selected date and time is displayed in the Text control"
  }
};

const dateTimePickerUrl = "https://sapui5.hana.ondemand.com/#/entity/sap.m.DateTimePicker/sample/sap.m.sample.DateTimePicker";

describe("date - pickWithTime - Simple DateTimePicker when datePicker has not assigned any date", function () {
  let expectedDate;

  it("Preparation", async function () {
    await browser.url(dateTimePickerUrl);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution (tomorrow - 10:00:00)", async function () {
    expectedDate = await common.date.calculateWithTime("tomorrow", "10:00:00");
    await ui5.date.pickWithTime(dateTimePicker, expectedDate);
  });

  it("Verification (tomorrow - 10:00:00)", async function () {
    const value = await ui5.element.getValue(dateTimePicker);
    const actualDate = new Date(value);
    common.assertion.expectEqual(actualDate.toISOString(), expectedDate.toISOString());
  });
});

describe("date - pickWithTime - With initialFocusedDateValue when datePicker has not assigned any date", function () {
  let expectedDate;

  it("Preparation", async function () {
    await browser.url(dateTimePickerUrl);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution (nextMonth - 5 PM)", async function () {
    expectedDate = await common.date.calculateWithTime("nextMonth", "5 PM");
    await ui5.date.pickWithTime(dateTimePicker, expectedDate, 1);
  });

  it("Verification (nextMonth - 5 PM)", async function () {
    const value = await ui5.element.getValue(dateTimePicker, 1);
    const actualDate = new Date(value);
    common.assertion.expectEqual(actualDate.toISOString(), expectedDate.toISOString());
  });
});
