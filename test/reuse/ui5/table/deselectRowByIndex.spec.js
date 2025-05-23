"use strict";

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

const rowIndex1 = 0;
const rowIndex2 = 4;

describe("table - deselectRowByIndex - demo kit - index", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark");
    await ui5.table.selectRowByIndex(tableSelector, rowIndex1);
    await ui5.table.selectRowByIndex(tableSelector, rowIndex2);
  });

  it("Execution (Index 0)", async function () {
    await ui5.table.deselectRowByIndex(tableSelector, rowIndex1);
  });

  it("Verification (Index 0)", async function () {
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector("/Products*15)"), "selected");
    await common.assertion.expectEqual(isSelected, false);
  });

  it("Execution (Index 4)", async function () {
    await ui5.table.deselectRowByIndex(tableSelector, rowIndex2);
  });

  it("Verification (Index 4)", async function () {
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector("/Products*2)"), "selected");
    await common.assertion.expectEqual(isSelected, false);
  });
});

describe("table - deselectRowByIndex - demo kit - already deselected row remains deselected", function () {
  async function validateUnchecked() {
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector("/Products*15)"), "selected");
    await common.assertion.expectEqual(isSelected, false);
  }

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark");
    await validateUnchecked();
  });

  it("Execution", async function () {
    await ui5.table.deselectRowByIndex(tableSelector, rowIndex1);
  });

  it("Verification", async function () {
    await validateUnchecked();
  });
});

describe("table - deselectRowByIndex - demo kit - passing id", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark");
    await ui5.table.selectRowByIndex(tableSelector.elementProperties.id, rowIndex1);
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector("/Products*15)"), "selected");
    await common.assertion.expectEqual(isSelected, true);
  });

  it("Execution", async function () {
    await ui5.table.deselectRowByIndex(tableSelector.elementProperties.id, rowIndex1);
  });

  it("Verification", async function () {
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector("/Products*15)"), "selected");
    await common.assertion.expectEqual(isSelected, false);
  });
});
