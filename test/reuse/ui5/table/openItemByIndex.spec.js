"use strict";
// const {
//   handleCookiesConsent
// } = require("../../../helper/utils");

describe("table - openItemByIndex - smartTable", function () {

  it("Preparation", async function () {
    const url = "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark";
    await common.navigation.navigateToUrl(url);
    // await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "mycompany.myapp.MyWorklistApp.view.Worklist",
        "metadata": "sap.m.Table",
        "id": "*table"
      }
    };
    await ui5.table.openItemByIndex(selector, 5);
  });

  it("Verification", async function () {
    const pageTitle = "Chef Anton's Cajun Seasoning";
    const selector = {
      "elementProperties": {
        "viewName": "mycompany.myapp.MyWorklistApp.view.Object",
        "metadata": "sap.m.Title",
        "text": pageTitle
      }
    };
    await expect(ui5.element.getDisplayed(selector)).resolves.not.toThrow();
  });
});
