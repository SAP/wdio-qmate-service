"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const { handleCookiesConsent } = require("../../../helper/utils");
const { validateChecked } = require("./helper");

const tableSelector1 = {
  elementProperties: {
    viewName: "mycompany.myapp.MyWorklistApp.view.Worklist",
    metadata: "sap.m.Table",
    id: "container-MyWorklistApp---worklist--table"
  }
};

const checkBoxSelector1 = (product) => {
  return {
    elementProperties: {
      viewName: "mycompany.myapp.MyWorklistApp.view.Worklist",
      metadata: "sap.m.CheckBox",
      bindingContextPath: product
    }
  };
};

const tableSelector2 = {
  elementProperties: {
    viewName: "sap.ui.comp.sample.smarttable.SmartTable",
    metadata: "sap.ui.comp.smarttable.SmartTable",
    id: "__xmlview0--LineItemsSmartTable"
  }
};

const checkBoxSelector2 = "__xmlview0--LineItemsSmartTable-ui5table-rowsel6";

const tableSelector3 = {
  elementProperties: {
    viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
    metadata: "sap.ui.comp.smarttable.SmartTable",
    id: "ManageSalesOrderWithTableTabs::sap.suite.ui.generic.template.ListReport.view.ListReport::C_STTA_SalesOrder_WD_20--listReport-1"
  }
};

const checkBoxSelector3 = (product) => {
  return {
    elementProperties: {
      viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
      metadata: "sap.m.RadioButton",
      bindingContextPath: product
    }
  };
};

const tableSelector4 = {
  elementProperties: {
    metadata: "sap.ui.mdc.Table",
    id: "sampleComp-sap.ui.mdc.demokit.sample.table.TableTypes---sample--table"
  }
};

const checkBoxSelector4 = "sampleComp-sap.ui.mdc.demokit.sample.table.TableTypes---sample--table-innerTable-rowsel1";

describe("table - selectRowByValues - demo kit - passing value as string - ui5CheckBox", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark`);
  });

  it("Execution", async function () {
    await ui5.table.selectRowByValues(tableSelector1, "Exotic Liquids");
  });

  it("Verification", async function () {
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector1("/Products*15)"), "selected");
    common.assertion.expectEqual(isSelected, true);
  });
});

describe("table - selectRowByValues - demo kit - passing value as array of string - cssItem", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.table.selectRowByValues(tableSelector2, ["0001", "Metzgerei Mettmann", "Metzgerei Mettmann (JS_TEST)"]);
  });

  it("Verification", async function () {
    const element = await nonUi5.element.getById(checkBoxSelector2);
    const isSelected = await nonUi5.element.getAttributeValue(element, "aria-selected");
    common.assertion.expectEqual(isSelected, "true");
  });
});

describe("table - selectRowByValues - demo kit - passing value as array of string - ui5RadioButton with index - passing id", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/test-resources/sap/suite/ui/generic/template/demokit/demokit.html?responderOn=true&demoApp=sttasalesordertt#/?sap-iapp-state--history=1&sap-iapp-state=5`);
  });

  it("Execution", async function () {
    await ui5.table.selectRowByValues(tableSelector3.elementProperties.id, ["Custom Content"], 2);
  });

  it("Verification", async function () {
    const isSelected = await ui5.element.getPropertyValue(checkBoxSelector3("/C_STTA_SalesOrder_WD_20*SalesOrder='500000007'*"), "selected");
    common.assertion.expectEqual(isSelected, true);
  });
});

describe("table - selectRowByValues - demo kit - already selected row remains selected", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon_dark`);
    await ui5.table.selectRowByValues(tableSelector1, "Exotic Liquids");
    await validateChecked(checkBoxSelector1("/Products*15)"));
  });

  it("Execution", async function () {
    await ui5.table.selectRowByValues(tableSelector1, "Exotic Liquids");
  });

  it("Verification", async function () {
    await validateChecked(checkBoxSelector1("/Products*15)"));
  });
});

describe("table - selectRowByValues - demo kit - mdc table type - passing value as array of string - cssItem", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://ui5.sap.com/#/entity/sap.ui.mdc.Table/sample/sap.ui.mdc.demokit.sample.table.TableTypes");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.table.selectRowByValues(tableSelector4, ["K2", "1954"]);
  });

  it("Verification", async function () {
    const element = await nonUi5.element.getById(checkBoxSelector4);
    const isSelected = await nonUi5.element.getAttributeValue(element, "aria-selected");
    common.assertion.expectEqual(isSelected, "true");
  });
});