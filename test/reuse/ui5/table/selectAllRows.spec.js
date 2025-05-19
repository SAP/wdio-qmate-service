"use strict";

const tableSelector = {
  elementProperties: {
    viewName: "mycompany.myapp.MyWorklistApp.view.Worklist",
    metadata: "sap.m.Table",
    id: "container-MyWorklistApp---worklist--table"
  }
};

const checkBoxSelector = {
  elementProperties: {
    viewName: "mycompany.myapp.MyWorklistApp.view.Worklist",
    metadata: "sap.m.CheckBox",
    id: "*table-sa"
  }
};

describe("table - selectAllRows - demo kit - passing selector", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark");
  });

  it("Execution", async function () {
    await ui5.table.selectAllRows(tableSelector);
  });

  it("Verification", async function () {
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector, "selected");
    await common.assertion.expectEqual(isSelected, true);
  });
});

describe("table - selectAllRows - demo kit - passing id", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark");
  });

  it("Execution", async function () {
    const tableSelectorId = tableSelector.elementProperties.id;
    await ui5.table.selectAllRows(tableSelectorId);
  });

  it("Verification", async function () {
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector, "selected");
    await common.assertion.expectEqual(isSelected, true);
  });
});

describe("table - selectAllRows - demo kit - select all checkbox already selected", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark");
    await ui5.table.selectAllRows(tableSelector);
  });

  it("Execution", async function () {
    await ui5.table.selectAllRows(tableSelector);
  });

  it("Verification", async function () {
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector, "selected");
    await common.assertion.expectEqual(isSelected, true);
  });
});
