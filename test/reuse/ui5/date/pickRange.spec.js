"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

const start = new Date(2020, 0, 17);
const end = new Date(2020, 1, 5);
const range = [start, end];

describe("date - pickRange - when DateRangeSelection do not have any value", function () {
  const dateRangeInput = {
    "elementProperties": {
      "viewName": "sap.m.sample.DateRangeSelectionValueState.DateRangeSelection",
      "metadata": "sap.m.DateRangeSelection"
    }
  };
  const getBorderOfRange = (initialBorder) => {
    let border = initialBorder.toDateString().slice(4).replace(/(?<=\d)\s/, ", ");
    if (/0.(?=,)/.test(border)) {
      const day = /\d(?=,)/.exec(border)[0];
      border = border.replace(/0.(?=,)/, day);
    }
    return border;
  };

  it("Preparation", async function () {
    // using UI5 version 1.132.1, since latest (1.134.0) version date range picker doesn't work
    await browser.url("https://sapui5.hana.ondemand.com/1.132.1/#/entity/sap.m.DateRangeSelection/sample/sap.m.sample.DateRangeSelectionValueState");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.date.pickRange(dateRangeInput, range);
  });

  it("Verification", async function () {
    const arrivedRange = await ui5.element.getValue(dateRangeInput);

    const startRange = getBorderOfRange(start);
    const endRange = getBorderOfRange(end);
    const rangeAsString = `${startRange} - ${endRange}`;

    common.assertion.expectEqual(arrivedRange, rangeAsString);
  });
});

describe("date - pickRange - with index as 2", function () {
  const dateRangeInput = {
    "elementProperties": {
      "viewName": "sap.m.sample.DateRangeSelectionValueState.DateRangeSelection",
      "metadata": "sap.m.DateRangeSelection"
    }
  };
  const getBorderOfRange = (initialBorder) => {
    let border = initialBorder.toDateString().slice(4).replace(/(?<=\d)\s/, ", ");
    if (/0.(?=,)/.test(border)) {
      const day = /\d(?=,)/.exec(border)[0];
      border = border.replace(/0.(?=,)/, day);
    }
    return border;
  };

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/1.132.1/#/entity/sap.m.DateRangeSelection/sample/sap.m.sample.DateRangeSelectionValueState");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.date.pickRange(dateRangeInput, range, 2);
  });

  it("Verification", async function () {
    const arrivedRange = await ui5.element.getValue(dateRangeInput, 2);

    const startRange = getBorderOfRange(start);
    const endRange = getBorderOfRange(end);
    const rangeAsString = `${startRange} - ${endRange}`;

    common.assertion.expectEqual(arrivedRange, rangeAsString);
  });
});

describe("date - pickRange - with icon as selector", function () {
  const dateRangeInput = {
    "elementProperties": {
      "viewName": "sap.m.sample.DateRangeSelectionValueState.DateRangeSelection",
      "metadata": "sap.m.DateRangeSelection"
    }
  };

  const dateRangeInputIcon = {
    "elementProperties": {
      "viewName": "sap.m.sample.DateRangeSelectionValueState.DateRangeSelection",
      "metadata": "sap.ui.core.Icon",
      "bindingContextPath": "/modelData/0"
    }
  };

  const getBorderOfRange = (initialBorder) => {
    let border = initialBorder.toDateString().slice(4).replace(/(?<=\d)\s/, ", ");
    if (/0.(?=,)/.test(border)) {
      const day = /\d(?=,)/.exec(border)[0];
      border = border.replace(/0.(?=,)/, day);
    }
    return border;
  };

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/1.132.1/#/entity/sap.m.DateRangeSelection/sample/sap.m.sample.DateRangeSelectionValueState");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.date.pickRange(dateRangeInputIcon, range);
  });

  it("Verification", async function () {
    const arrivedRange = await ui5.element.getValue(dateRangeInput);

    const startRange = getBorderOfRange(start);
    const endRange = getBorderOfRange(end);
    const rangeAsString = `${startRange} - ${endRange}`;

    common.assertion.expectEqual(arrivedRange, rangeAsString);
  });
});

describe("date - pickRange without datePiker (unhappy case)", function () {
  const dateRangeInput = {
    "elementProperties": {
      "viewName": "sap.m.sample.DateRangeSelectionValueState.DateRangeSelection",
      "metadata": "sap.m.DateRangeSelection"
    }
  };

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
  });

  it("Execution & Verification", async function () {
    await expect(ui5.date.pickRange(dateRangeInput, range))
      .rejects.toThrow(/No visible elements found/);
  });
});