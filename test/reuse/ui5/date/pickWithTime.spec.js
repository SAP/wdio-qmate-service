"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("date - pickWithTime - when datePicker has not assigned any date", function () {
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

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/#/entity/sap.m.DateTimePicker/sample/sap.m.sample.DateTimePicker");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution (tomorrow - 10:00:00)", async function () {
    const tomorrowMorning = await common.date.calculateWithTime("tomorrow", "10:00:00");

    await ui5.date.pickWithTime(dateTimePicker, tomorrowMorning);
  });

  it("Verification (tomorrow - 10:00:00)", async function () {
    const value = await ui5.element.getValue(dateTimePicker);
    const arrivedDate = new Date(value);
    const tomorrowMorning = await common.date.calculateWithTime("tomorrow", "10:00:00");
    common.assertion.expectEqual(arrivedDate.toISOString(), tomorrowMorning.toISOString());
  });
});
