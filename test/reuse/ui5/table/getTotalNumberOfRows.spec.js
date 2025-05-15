"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("table - getTotalNumberOfRows - demo kit smartTable", function () {
  let actNumberOfTableRows;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.SmartTable",
        metadata: "sap.ui.comp.smarttable.SmartTable",
        id: "__xmlview0--LineItemsSmartTable"
      }
    };
    await ui5.element.waitForAll(selector);
    actNumberOfTableRows = await ui5.table.getTotalNumberOfRows(selector);
  });

  it("Verification", async function () {
    const expNumberOfTableRows = 54;
    await common.assertion.expectEqual(actNumberOfTableRows, expNumberOfTableRows);
  });
});

describe("table - getTotalNumberOfRows - demo kit smartTable - 0 rows", function () {
  let actNumberOfTableRows;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.SmartTable",
        metadata: "sap.ui.comp.smartfilterbar.SFBMultiInput",
        value: [
          {
            path: "fi1t3rM0d31>/Gjahr/value"
          }
        ]
      }
    };
    const invalidFiscalYear = "2000";
    await ui5.userInteraction.clearAndFill(selector, invalidFiscalYear);
    await common.userInteraction.pressEnter();
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.SmartTable",
        metadata: "sap.ui.comp.smarttable.SmartTable",
        id: "__xmlview0--LineItemsSmartTable"
      }
    };
    await ui5.element.waitForAll(selector);
    actNumberOfTableRows = await ui5.table.getTotalNumberOfRows(selector);
  });

  it("Verification", async function () {
    const expNumberOfTableRows = 0;
    await common.assertion.expectEqual(actNumberOfTableRows, expNumberOfTableRows);
  });
});


// Only for local testing -> Replace the placeholder with the correct URL, password and user name

// describe("table - getTotalNumberOfRows - table", function () {
//   let actNumberOfTableRows;

//   it("Preparation", async function () {
//     await common.navigation.navigateToUrl("<test_system_url>/ui#ReportingTask-run&/?sap-iapp-state=ASQ7LUYSPNTEJR8D5BOKD7T4DNSJVXBD4GKZLB0Z");
//     await ui5.session.login("<user_name>", "<password>");
//   });

//   it("Execution", async function () {
//     const selector = {
//       elementProperties: {
//         viewName: "gs.fin.runstatutoryreports.s1.view.ReportList",
//         metadata: "sap.ui.comp.smarttable.SmartTable",
//         id: "application-ReportingTask-run-component---ReportList--ReportingTable"
//       }
//     };
//     await ui5.element.waitForAll(selector);
//     actNumberOfTableRows = await ui5.table.getTotalNumberOfRows(selector);
//   });

//   it("Verification", async function () {
//     const expNumberOfTableRows = 5;
//     await common.assertion.expectEqual(actNumberOfTableRows, expNumberOfTableRows);
//   });
// });
