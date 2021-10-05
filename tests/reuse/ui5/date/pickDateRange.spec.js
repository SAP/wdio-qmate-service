"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

const dataInput = {
  "elementProperties": {
    "viewName": "sap.m.sample.DateRangeSelectionValueState.DateRangeSelection",
    "metadata": "sap.m.DateRangeSelection",
    "bindingContextPath": "/modelData/0"
  }
};

const dataInputIcon = {
  "elementProperties": {
    "viewName": "sap.m.sample.DateRangeSelectionValueState.DateRangeSelection",
    "metadata": "sap.ui.core.Icon",
    "bindingContextPath": "/modelData/0"
  }
};

const start = new Date(2020, 0, 17);
const end = new Date(2020, 1, 5);
const range = [start, end];

describe("date - pickDateRange", function () {
  const getBorderOfRange = (initialBorder) => {
    let border = initialBorder.toDateString().slice(4).replace(/(?<=\d)\s/, ", ");
    if (/0.(?=,)/.test(border)) {
      const day = /\d(?=,)/.exec(border)[0];
      border = border.replace(/0.(?=,)/, day);
    }
    return border;
  };

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/#/entity/sap.m.DateRangeSelection/sample/sap.m.sample.DateRangeSelectionValueState");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await ui5.date.pickDateRange(dataInputIcon, range);
  });

  it("Verification", async function () {
    const arrivedRange = await ui5.element.getValue(dataInput);

    const startRange = getBorderOfRange(start);
    const endRange = getBorderOfRange(end);
    const rangeAsString = `${startRange} - ${endRange}`;

    common.assertion.expectEqual(arrivedRange, rangeAsString);
  });
});

describe("date - pickDateRange without datePiker (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.date.pickDateRange(dataInputIcon, range))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});