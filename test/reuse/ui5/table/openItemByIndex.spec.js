"use strict";
// const {
//   handleCookiesConsent
// } = require("../../../helper/utils");

describe("table - openItemByIndex - smartTable", function () {

  it("Preparation", async function () {
    const url = "https://sapui5.hana.ondemand.com/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products.sepmra/test/index.html?sap-ui-theme=sap_horizon_dark#masterDetail-display";
    await common.navigation.navigateToUrl(url);
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ListReport.view.ListReport",
        "metadata": "sap.ui.comp.smarttable.SmartTable",
        "id": "*listReport"
      }
    };
    await ui5.table.openItemByIndex(selector, 5);
  });

  it("Verification", async function () {
    const pageTitle = "Notebook Basic 15";
    const selector = {
      elementProperties: {
        viewName: "sap.suite.ui.generic.template.ObjectPage.view.Details",
        metadata: "sap.m.Title",
        text: pageTitle
      }
    };
    await expect(ui5.element.getDisplayed(selector)).resolves.not.toThrow();
  });
});
