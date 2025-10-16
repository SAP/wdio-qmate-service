"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("table - getTotalNumberOfRowsByValues - demo kit smartTable - 1 match", function () {
  let actNumberOfTableRows;

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
    await ui5.element.waitForAll(selector);
    const value = "Metzgerei Mettmann";
    actNumberOfTableRows = await ui5.table.getTotalNumberOfRowsByValues(selector, value);
  });

  it("Verification", async function () {
    const expNumberOfTableRows = 1;
    await common.assertion.expectEqual(actNumberOfTableRows, expNumberOfTableRows);
  });
});

describe("table - getTotalNumberOfRowsByValues - 2 matches", function () {
  let actNumberOfTableRows;

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
    await ui5.element.waitForAll(selector);
    const value = "Elena KG";
    actNumberOfTableRows = await ui5.table.getTotalNumberOfRowsByValues(selector, value);
  });

  it("Verification", async function () {
    const expNumberOfTableRows = 2;
    await common.assertion.expectEqual(actNumberOfTableRows, expNumberOfTableRows);
  });
});

describe("table - getTotalNumberOfRowsByValues - 1 match by two values", function () {

  let actNumberOfTableRows;

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
    await ui5.element.waitForAll(selector);
    const values = ["Example Corp.", "16.68"];
    actNumberOfTableRows = await ui5.table.getTotalNumberOfRowsByValues(selector, values);
  });

  it("Verification", async function () {
    const expNumberOfTableRows = 1;
    await common.assertion.expectEqual(actNumberOfTableRows, expNumberOfTableRows);
  });
});

describe("table - getTotalNumberOfRowsByValues - unhappy case- 0 matches", function () {
  let actNumberOfTableRows;

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
    await ui5.element.waitForAll(selector);
    const value = "abcdefghijklmnop";
    actNumberOfTableRows = await ui5.table.getTotalNumberOfRowsByValues(selector, value);
  });

  it("Verification", async function () {
    const expNumberOfTableRows = 0;
    await common.assertion.expectEqual(actNumberOfTableRows, expNumberOfTableRows);
  });

});

describe("table - getTotalNumberOfRowsByValues - sap.ui.table.TreeTable - single value as an Array", function () {
  let rowCount;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.table.TreeTable/sample/sap.ui.table.sample.TreeTable.HierarchyMaintenanceJSONTreeBinding");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const treeTableSelector = {
      elementProperties: {
        viewName: "sap.ui.table.sample.TreeTable.HierarchyMaintenanceJSONTreeBinding.View",
        metadata: "sap.ui.table.TreeTable"
      }
    };
    const categoryName = ["Men"];
    rowCount = await ui5.table.getTotalNumberOfRowsByValues(treeTableSelector, categoryName);
  });

  it("Verification", async function () {
    await expect(rowCount).toBe(1);
  });
});