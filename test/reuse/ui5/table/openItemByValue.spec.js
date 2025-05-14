// "use strict";
// const {
//   handleCookiesConsent
// } = require("../../../helper/utils");

// describe("table - openItemByValue - smartTable", function () {

//   it("Preparation", async function () {
//     await browser.url("https://sapui5.hana.ondemand.com/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products.sepmra/test/index.html?sap-ui-theme=sap_horizon_dark#masterDetail-display");
//     await handleCookiesConsent();
//     await util.browser.switchToIframe("[id='sampleFrame']");
//   });

//   it("Preperation - click 'Go'", async function () {
//     const selector = {
//       "elementProperties": {
//         "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
//         "metadata": "sap.m.Button",
//         "text": [{
//           "path": "i18n>BUTTON_GO"
//         }]
//       }
//     };
//     await ui5.userInteraction.click(selector);
//   });

//   it("Execution", async function () {
//     await ui5.table.openItemByValue(5);
//   });
//   it("Verification", async function () {
//   });
// });
