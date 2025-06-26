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
    expectedDate.setMilliseconds(0);
    await ui5.date.pickWithTime(dateTimePicker, expectedDate);
  });

  it("Verification (tomorrow - 10:00:00)", async function () {
    const value = await ui5.element.getValue(dateTimePicker);
    const actualDate = new Date(value);
    actualDate.setMilliseconds(0);
    common.assertion.expectEqual(actualDate.toISOString(), expectedDate.toISOString());
  });
});

describe("date - pickWithTime - Simple DateTimePicker when datePicker has not assigned any date - current time", function () {
  let expectedDate;

  it("Preparation", async function () {
    await browser.url(dateTimePickerUrl);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution (current date and time)", async function () {
    expectedDate = await common.date.getCurrentDateAndTime();
    expectedDate.setMilliseconds(0);
    await ui5.date.pickWithTime(dateTimePicker, expectedDate);
  });

  it("Verification (current date and time)", async function () {
    const value = await ui5.element.getValue(dateTimePicker);
    const actualDate = new Date(value);
    actualDate.setMilliseconds(0);
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
    expectedDate.setMilliseconds(0);
    await ui5.date.pickWithTime(dateTimePicker, expectedDate, 1);
  });

  it("Verification (nextMonth - 5 PM)", async function () {
    const value = await ui5.element.getValue(dateTimePicker, 1);
    const actualDate = new Date(value);
    actualDate.setMilliseconds(0);
    common.assertion.expectEqual(actualDate.toISOString(), expectedDate.toISOString());
  });
});

describe("date - pickWithTime - With initialFocusedDateValue when datePicker has not assigned any date - startOfDay", function () {
  let expectedDate;

  it("Preparation", async function () {
    await browser.url(dateTimePickerUrl);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution (nextMonth - startOfDay)", async function () {
    expectedDate = await common.date.calculateWithTime("nextMonth", "startOfDay");
    expectedDate.setMilliseconds(0);
    await ui5.date.pickWithTime(dateTimePicker, expectedDate, 1);
  });

  it("Verification (nextMonth - startOfDay)", async function () {
    const value = await ui5.element.getValue(dateTimePicker, 1);
    const actualDate = new Date(value);
    actualDate.setMilliseconds(0);
    common.assertion.expectEqual(actualDate.toISOString(), expectedDate.toISOString());
  });
});

describe("date - pickWithTime - with given Value when datePicker has a date assigned", function () {
  let expectedDate;

  it("Preparation", async function () {
    await browser.url(dateTimePickerUrl);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution (today - no time provided)", async function () {
    expectedDate = await common.date.calculateWithTime("today");
    await ui5.date.pickWithTime(dateTimePicker, expectedDate, 2);
  });

  it("Verification (today - no time provided)", async function () {
    const value = await ui5.element.getValue(dateTimePicker, 2);
    const adjustedValue = value.replace("GMTZ", "UTC"); // Adjust for pipeline timezone differences
    const actualDate = new Date(adjustedValue);
    common.assertion.expectEqual(actualDate.toISOString(), expectedDate.toISOString());
  });
});

describe("date - pickWithTime - clock without seconds picker", function () {
  let expectedDate;

  it("Preparation", async function () {
    await browser.url(dateTimePickerUrl);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution (previousMonth - 11:30 AM)", async function () {
    expectedDate = await common.date.calculateWithTime("previousMonth", "11:30 AM");
    expectedDate.setMilliseconds(0);
    await ui5.date.pickWithTime(dateTimePicker, expectedDate, 3);
  });

  it("Verification (previousMonth - 11:30 AM)", async function () {
    const value = await ui5.element.getValue(dateTimePicker, 3);
    const actualDate = new Date(value);
    actualDate.setMilliseconds(0);
    common.assertion.expectEqual(actualDate.toISOString(), expectedDate.toISOString());
  });
});
