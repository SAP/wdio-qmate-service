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

describe("table - openItemByIndex - smartTable - open first item", function () {

  it("Preparation", async function () {
    const url = "https://sapui5.hana.ondemand.com/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#";
    await common.navigation.navigateToUrl(url);
    await ui5.userInteraction.click(goButtonSelector);
  });

  it("Execution", async function () {
    await ui5.table.openItemByIndex(smartTableSelector, 0);
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

describe("table - openItemByIndex - smartTable - open third item", function () {

  it("Preparation", async function () {
    const url = "https://sapui5.hana.ondemand.com/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#";
    await common.navigation.navigateToUrl(url);
    await util.browser.refresh();
    await ui5.userInteraction.click(goButtonSelector);
  });

  it("Execution", async function () {
    await ui5.table.openItemByIndex(smartTableSelector, 2);
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

describe("table - openItemByIndex - smartTable - unhappy case - try to open not existing item", function () {

  it("Preparation", async function () {
    const url = "https://sapui5.hana.ondemand.com/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#";
    await common.navigation.navigateToUrl(url);
    await util.browser.refresh();
    await ui5.userInteraction.click(goButtonSelector);
  });

  it("Execution & Verification", async function () {
    await expect(ui5.table.openItemByIndex(smartTableSelector, 10)).rejects.toThrow(/No item found with index 10/);
  });
});