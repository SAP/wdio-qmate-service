"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("table - sortColumnDescending - smartTable", function () {

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await ui5.table.sortColumnDescending("Name");
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Column",
        "tooltip": "Name"
      }
    };
    await ui5.assertion.expectAttributeToBe(selector, "sortIndicator", "Descending");
  });

});