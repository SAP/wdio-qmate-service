"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const { handleCookiesConsent } = require("../../../helper/utils.js");
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
const mTableSelector = {
  "elementProperties": {
    "metadata": "sap.m.Table",
    "id": "*--productsTable"
  }
};

describe("table - openItemByValues - smartTable - single value as a String", function () {

  it("Preparation", async function () {
    const url = `${BASE_URL}/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#`;
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
    const url = `${BASE_URL}/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#`;
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
    const url = `${BASE_URL}/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#`;
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

describe("table - openItemByValues - mTable - when no arrow icon", function () {

  it("Preparation", async function () {
    const url = `${BASE_URL}/#/entity/sap.m.Table/sample/sap.m.sample.TableNavigated`;
    await common.navigation.navigateToUrl(url);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.table.openItemByValues(mTableSelector, "Notebook Basic 15");
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "metadata": "sap.m.ColumnListItem",
        "id": "*productsTable-0"
      }
    };
    const navigationState = await ui5.element.getPropertyValue(selector, "navigated");
    expect(navigationState).toEqual(true);
  });
});