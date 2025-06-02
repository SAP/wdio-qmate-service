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
  });

  it("Execution", async function () {
    await ui5.table.openItemByValues(smartTableSelector, "500000001");
  });

  it("Verification", async function () {
    const pageTitle = "500000001";
    const selector = {

      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ObjectPage.view.Details",
        "metadata": "sap.uxap.ObjectPageHeader",
        "id": "*objectPageHeader"
      }
    };
    const objectTitleValue = await ui5.element.getPropertyValue(selector, "objectTitle");
    expect(objectTitleValue).toEqual(pageTitle);
  });
});

describe("table - openItemByValues - smartTable - single value as an Array - 3 matches - open first one", function () {

  it("Preparation", async function () {
    const url = "https://sapui5.hana.ondemand.com/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#";
    await common.navigation.navigateToUrl(url);
    await util.browser.refresh();
    await ui5.userInteraction.click(goButtonSelector);
  });

  it("Execution - 3 matches - should open first one", async function () {
    await ui5.table.openItemByValues(smartTableSelector, ["HT-1003"]);
  });

  it("Verification", async function () {
    const pageTitle = "500000001";
    const selector = {

      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ObjectPage.view.Details",
        "metadata": "sap.uxap.ObjectPageHeader",
        "id": "*objectPageHeader"
      }
    };
    const objectTitleValue = await ui5.element.getPropertyValue(selector, "objectTitle");
    expect(objectTitleValue).toEqual(pageTitle);
  });


});

describe("table - openItemByValues - smartTable - multiple values as an Array - one match", function () {

  it("Preparation", async function () {
    const url = "https://sapui5.hana.ondemand.com/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#";
    await common.navigation.navigateToUrl(url);
    await util.browser.refresh();
    await ui5.userInteraction.click(goButtonSelector);
  });

  it("Execution - 3 matches - should open first one", async function () {
    await ui5.table.openItemByValues(smartTableSelector, ["HT-1003", "100000008"]);
  });

  it("Verification", async function () {
    const pageTitle = "500000007";
    const selector = {

      "elementProperties": {
        "viewName": "sap.suite.ui.generic.template.ObjectPage.view.Details",
        "metadata": "sap.uxap.ObjectPageHeader",
        "id": "*objectPageHeader"
      }
    };
    const objectTitleValue = await ui5.element.getPropertyValue(selector, "objectTitle");
    expect(objectTitleValue).toEqual(pageTitle);
  });


});