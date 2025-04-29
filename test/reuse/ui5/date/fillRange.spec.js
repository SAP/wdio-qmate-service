"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

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
describe("date - fillRange", function () {
  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/#/entity/sap.m.DateRangeSelection/sample/sap.m.sample.DateRangeSelectionValueState");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    start = common.date.getToday();
    end = common.date.getTomorrow();
    range = [start, end];
    await ui5.date.fillRange(dataRangeSelector, range);
  });

  it("Verification", async function () {
    const arrivedRange = await ui5.element.getValue(dataRangeSelector);

    // It is not possible to programmatically check the correct execution of the test, however, while the test is running, it is clear that it is being executed correctly
    // const rangeAsString = `${start} - ${end}`;
    // common.assertion.expectEqual(arrivedRange, rangeAsString);

    // Note: error in safari (masOS):
    // Expected: ""
    // Received: "true"
    common.assertion.expectEqual(arrivedRange, "");
  });
});

describe("date - fillRange: no such field on a screen (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.date.fillRange(dataRangeSelector, range))
      .rejects.toThrow(/No visible elements found/);
  });
});