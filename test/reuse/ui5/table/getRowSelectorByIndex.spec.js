"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

let rows;

describe("table - getRowSelectorByIndex - smartTable - get first row", function () {

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
    const index = 0;
    rows = await ui5.table.getRowSelectorByIndex(selector, index);
  });


  it("Verification", async function () {
    const expColumnListItemId = "__item1-__clone0";
    await common.assertion.expectEqual(rows.elementProperties.id, expColumnListItemId);
  });
});

describe("table - getRowSelectorByIndex - smartTable - unhappy case - row with index doesn't exist", function () {
  it("Execution && Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        metadata: "sap.ui.comp.smarttable.SmartTable",
        id: "__table0"
      }
    };
    const index = 550;
    await expect(ui5.table.getRowSelectorByIndex(selector, index)).rejects.toThrow(/No item found with index/);
  });


});