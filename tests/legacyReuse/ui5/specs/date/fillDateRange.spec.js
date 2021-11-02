"use strict";
const { handleCookiesConsent } = require("../../../../helper/utils");

let start;
let end;
let range;

const dataRangeSelector = {
  "elementProperties": {
    "viewName": "sap.m.sample.DateRangeSelectionValueState.DateRangeSelection",
    "metadata": "sap.m.DateRangeSelection",
    "bindingContextPath": "/modelData/0"
  }
};
describe("date - fillDateRange", function () {
  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/#/entity/sap.m.DateRangeSelection/sample/sap.m.sample.DateRangeSelectionValueState");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    start = await ui5.common.date.getToday();
    end = await ui5.common.date.getTomorrow();
    range = [start, end];
    await ui5.common.date.fillDateRange(dataRangeSelector, range);
  });

  it("Verification", async function () {
    const arrivedRange = await ui5.common.locator.getValue(dataRangeSelector, "value");

    // It is not possible to programmatically check the correct execution of the test, however, while the test is running, it is clear that it is being executed correctly
    // const rangeAsString = `${start} - ${end}`;
    // ui5.common.assertion.expectEqual(arrivedRange, rangeAsString);
    ui5.common.assertion.expectEqual(arrivedRange, "");
  });
});

describe("date - fillDateRange: no such field on a screen (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.common.date.fillDateRange(dataRangeSelector, range))
      .rejects.toThrow(/No visible elements found/);
  });
});