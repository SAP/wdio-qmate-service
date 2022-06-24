"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("table - clickSettingsButton - smartTable", function () {

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await ui5.table.clickSettingsButton();
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Dialog",
        "title": "View Settings"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });

});

describe("table - clickSettingsButton - smartTable with tableSelector", function () {

  const tableSelector = {
    "elementProperties": {
      "metadata": "sap.ui.comp.smarttable.SmartTable"
    }
  };

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await ui5.table.clickSettingsButton(tableSelector);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Dialog",
        "title": "View Settings"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });

});