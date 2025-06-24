"use strict";
const { validateChecked } = require("./helper");

const tableSelector = {
  elementProperties: {
    viewName: "mycompany.myapp.MyWorklistApp.view.Worklist",
    metadata: "sap.m.Table",
    id: "container-MyWorklistApp---worklist--table"
  }
};

const checkBoxSelector = (product) => {
  return {
    elementProperties: {
      viewName: "mycompany.myapp.MyWorklistApp.view.Worklist",
      metadata: "sap.m.CheckBox",
      bindingContextPath: product
    }
  };
};

describe("table - selectRowByIndex - demo kit - index", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark");
  });

  it("Execution (Index 0)", async function () {
    const rowIndex = 0;
    await ui5.table.selectRowByIndex(tableSelector, rowIndex);
  });

  it("Verification (Index 0)", async function () {
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector("/Products*15)"), "selected");
    await common.assertion.expectEqual(isSelected, true);
  });

  it("Execution (Index 4)", async function () {
    const rowIndex = 4;
    await ui5.table.selectRowByIndex(tableSelector, rowIndex);
  });

  it("Verification (Index 4)", async function () {
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector("/Products*2)"), "selected");
    await common.assertion.expectEqual(isSelected, true);
  });
});

describe("table - selectRowByIndex - demo kit - already selected row remains selected", function () {
  const rowIndex = 0;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark");
    await ui5.table.selectRowByIndex(tableSelector, rowIndex);
    await validateChecked(checkBoxSelector("/Products*15)"));
  });

  it("Execution", async function () {
    await ui5.table.selectRowByIndex(tableSelector, rowIndex);
  });

  it("Verification", async function () {
    await validateChecked(checkBoxSelector("/Products*15)"));
  });
});

describe("table - selectRowByIndex - demo kit - passing id", function () {
  const rowIndex = 0;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark");
  });

  it("Execution", async function () {
    await ui5.table.selectRowByIndex(tableSelector.elementProperties.id, rowIndex);
  });

  it("Verification", async function () {
    await validateChecked(checkBoxSelector("/Products*15)"));
  });
});
