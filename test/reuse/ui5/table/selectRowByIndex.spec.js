"use strict";

describe("table - selectRowByIndex - demo kit - index 1", function () {
  let rowIndex = 0;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark");
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "mycompany.myapp.MyWorklistApp.view.Worklist",
        metadata: "sap.m.Table",
        id: "container-MyWorklistApp---worklist--table"
      }
    };
    await ui5.table.selectRowByIndex(selector, rowIndex);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "mycompany.myapp.MyWorklistApp.view.Worklist",
        metadata: "sap.m.CheckBox",
        bindingContextPath: "/Products*15)"
      }
    };
    const isSelected = await ui5.element.getPropertyValue(selector, "selected");
    await common.assertion.expectEqual(isSelected, true);
  });
});
