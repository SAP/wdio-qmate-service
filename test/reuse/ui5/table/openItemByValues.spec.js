"use strict";
const smartTableSelector = {
  "elementProperties": {
    "viewName": "sap.suite.ui.generic.template.ListReport.view.ListReport",
    "metadata": "sap.ui.comp.smarttable.SmartTable",
    "id": "*listReport-1"
  }
};
const goButtonSelector = {
  "elementProperties": {
    "viewName": "sap.suite.ui.generic.template.ListReport.view.ListReport",
    "metadata": "sap.m.Button",
    "id": "*listReportFilter-btnGo"
  }
};

describe("table - openItemByValues - smartTable - single value as a String", function () {

  it("Preparation", async function () {
    const url = "https://sapui5.hana.ondemand.com/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#";
    await common.navigation.navigateToUrl(url);
    await ui5.userInteraction.click(goButtonSelector);


    it("Execution", async function () {
      await ui5.table.openItemByValues(smartTableSelector, "Panorama Studios");
    });

    it("Verification", async function () {
      const pageTitle = "Uncle Bob's Organic Dried Pears";
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
});