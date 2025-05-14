"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

let rows;
const tableSelector = {
  elementProperties: {
    viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
    metadata: "sap.ui.comp.smarttable.SmartTable",
    id: "__table0"
  }
};

describe("table - getRowsByValues - smartTable - single value as a String", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const customerNameValue = "HäuHoh Huch GmbH";
    rows = await ui5.table.getRowsSelectorsByValues(tableSelector, customerNameValue);
  });


  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ui.comp.navpopover.SmartLink",
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "text": [
          {
            "model": "",
            "path": "Kunnr",
            "value": "HAEU03D",
            "type": "string"
          },
          {
            "model": "",
            "path": "Name1",
            "value": "HäuHoh Huch GmbH",
            "type": "string"
          }
        ]
      },
      ancestorProperties: rows[0].elementProperties
    };
    await expect(ui5.element.getDisplayed(selector)).resolves.not.toThrow();
  });
});

describe("table - getRowsByValues - smartTable - single value as an Array", function () {

  it("Execution", async function () {
    const customerNameValue = ["ToMa SE"];
    rows = await ui5.table.getRowsSelectorsByValues(tableSelector, customerNameValue);
  });


  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.ui.comp.navpopover.SmartLink",
        "text": [
          {
            "model": "",
            "path": "Kunnr",
            "value": "EMPLOYEE1",
            "type": "string"
          },
          {
            "model": "",
            "path": "Name1",
            "value": "ToMa SE",
            "type": "string"
          }
        ]
      },
      ancestorProperties: rows[0].elementProperties
    };
    await expect(ui5.element.getDisplayed(selector)).resolves.not.toThrow();
  });

});

describe("table - getRowsByValues - smartTable - multiple values as an Array, receiving multiple columns", function () {

  it("Execution", async function () {
    const customerNameValue = ["Elena KG"];
    rows = await ui5.table.getRowsSelectorsByValues(tableSelector, customerNameValue);
  });


  it("Verification", async function () {
    const selector1 = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Text",
        "text": [
          {
            "model": "",
            "path": "Dmbtr",
            "value": "-1500.00",
            "type": "string"
          }
        ]
      },
      ancestorProperties: rows[0].elementProperties
    };
    const selector2 = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Text",
        "text": [
          {
            "model": "",
            "path": "Dmbtr",
            "value": "0.00",
            "type": "string"
          }
        ]
      },
      ancestorProperties: rows[1].elementProperties
    };
    await expect(ui5.element.getDisplayed(selector1)).resolves.not.toThrow();
    await expect(ui5.element.getDisplayed(selector2)).resolves.not.toThrow();
  });

});

describe("table - getRowsByValues - smartTable - unhappy case - multiple values as an array, receiving no row(empty array)", function () {
  it("Execution", async function () {
    const customerNameValue = ["Elena KG", "abcdef"];
    rows = await ui5.table.getRowsSelectorsByValues(tableSelector, customerNameValue);
  });


  it("Verification", async function () {
    await common.assertion.expectEqual(rows.length, 0);

  });

});