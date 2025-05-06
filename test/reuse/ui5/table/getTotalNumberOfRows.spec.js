"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("table - getTotalNumberOfRows - demo kit table", function () {
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

// describe("table - getTotalNumberOfRows - actual table ref", function () {
//   let actNumberOfTableRows;

//   it("Preparation", async function () {
//     await common.navigation.navigateToUrl("<system_url>/ui#ReportingTask-run");
//     await ui5.session.login("<username>", "<password>");
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
