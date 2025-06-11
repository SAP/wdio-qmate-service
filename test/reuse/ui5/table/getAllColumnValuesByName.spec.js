"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

let rowSelectors;
const smartTableSelector = {
  elementProperties: {
    viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
    metadata: "sap.ui.comp.smarttable.SmartTable",
    id: "__table0"
  }
};

const uiTableSelector = {
  elementProperties: {
    viewName: "sap.ui.table.sample.Basic.View",
    metadata: "sap.ui.table.Table"
  }
};

describe("table - getSelectorsForRowsByValues - sap.ui.comp.smarttable.SmartTable - single value as a String", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const values = await ui5.table.getAllColumnValuesByName(smartTableSelector, "Customer");
  });



});