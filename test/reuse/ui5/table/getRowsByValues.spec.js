"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

let rows;

describe("table - getRowsByValues - smartTable - single value as a String", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        metadata: "sap.ui.comp.smarttable.SmartTable",
        id: "__table0"
      }
    };
    const customerNameValue = "HäuHoh Huch GmbH";
    rows = await ui5.table.getRowsSelectorsByValues(selector, customerNameValue);
  });


  it("Verification", async function () {
    const expColumnListItemId = "__item1-__clone14";
    await common.assertion.expectEqual(rows[0].elementProperties.id, expColumnListItemId);
  });
});

describe("table - getRowsByValues - smartTable - single value as an Array", function () {

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        metadata: "sap.ui.comp.smarttable.SmartTable",
        id: "__table0"
      }
    };
    const customerNameValue = ["ToMa SE"];
    rows = await ui5.table.getRowsSelectorsByValues(selector, customerNameValue);
  });


  it("Verification", async function () {
    const expColumnListItemId = "__item1-__clone15";
    await common.assertion.expectEqual(rows[0].elementProperties.id, expColumnListItemId);
  });

});

describe("table - getRowsByValues - smartTable - multiple values as an Array, receiving multiple columns", function () {

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        metadata: "sap.ui.comp.smarttable.SmartTable",
        id: "__table0"
      }
    };
    const customerNameValue = ["Elena KG"];
    rows = await ui5.table.getRowsSelectorsByValues(selector, customerNameValue);
  });


  it("Verification", async function () {
    const expColumnListItemId = ["__item1-__clone17", "__item1-__clone18"];
    await common.assertion.expectEqual(rows[0].elementProperties.id, expColumnListItemId[0]);
    await common.assertion.expectEqual(rows[1].elementProperties.id, expColumnListItemId[1]);
  });

});

describe("table - getRowsByValues - smartTable - unhappy case - multiple values as an array, receiving no row(empty array)", function () {
  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        metadata: "sap.ui.comp.smarttable.SmartTable",
        id: "__table0"
      }
    };
    const customerNameValue = ["Elena KG", "abcdef"];
    rows = await ui5.table.getRowsSelectorsByValues(selector, customerNameValue);
  });


  it("Verification", async function () {
    await common.assertion.expectEqual(rows.length, 0);

  });

});