"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const { handleCookiesConsent } = require("../../../helper/utils");

let rowSelectors;
const smartTableSelector = {
  elementProperties: {
    viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
    metadata: "sap.ui.comp.smarttable.SmartTable",
    id: "__table0"
  }
};

const uiTableSelector = {
  elementProperties: {
    viewName: "sap.ui.table.sample.Basic.View",
    metadata: "sap.ui.table.Table"
  }
};

const treeTableSelector = {
  elementProperties: {
    viewName: "sap.ui.table.sample.TreeTable.HierarchyMaintenanceJSONTreeBinding.View",
    metadata: "sap.ui.table.TreeTable"
  }
};

const mdcTableSelector = {
  elementProperties: {
    metadata: "sap.ui.mdc.Table",
    id: "sampleComp-sap.ui.mdc.demokit.sample.table.TableJson---sample--table"
  }
};

describe("table - getSelectorsForRowsByValues - sap.ui.comp.smarttable.SmartTable - single value as a String", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const customerNameValue = "HäuHoh Huch GmbH";
    rowSelectors = await ui5.table.getSelectorsForRowsByValues(smartTableSelector, customerNameValue);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        metadata: "sap.ui.comp.navpopover.SmartLink",
        viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        text: [
          {
            model: "",
            path: "Kunnr",
            value: "HAEU03D",
            type: "string"
          },
          {
            model: "",
            path: "Name1",
            value: "HäuHoh Huch GmbH",
            type: "string"
          }
        ]
      },
      ancestorProperties: rowSelectors[0].elementProperties
    };
    await expect(ui5.element.getDisplayed(selector)).resolves.not.toThrow();
  });
});

describe("table - getSelectorsForRowsByValues - sap.ui.comp.smarttable.SmartTable - single value as an Array", function () {
  // it("Preparation", async function () {
  //   await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable`);
  //   await handleCookiesConsent();
  //   await util.browser.switchToIframe("[id='sampleFrame']");
  // });

  it("Execution", async function () {
    const customerNameValue = ["ToMa SE"];
    rowSelectors = await ui5.table.getSelectorsForRowsByValues(smartTableSelector, customerNameValue);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        metadata: "sap.ui.comp.navpopover.SmartLink",
        text: [
          {
            model: "",
            path: "Kunnr",
            value: "EMPLOYEE1",
            type: "string"
          },
          {
            model: "",
            path: "Name1",
            value: "ToMa SE",
            type: "string"
          }
        ]
      },
      ancestorProperties: rowSelectors[0].elementProperties
    };
    await expect(ui5.element.getDisplayed(selector)).resolves.not.toThrow();
  });
});

describe("table - getSelectorsForRowsByValues - sap.ui.comp.smarttable.SmartTable - multiple values as an Array, receiving multiple columns", function () {
  // it("Preparation", async function () {
  //   await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable`);
  //   await handleCookiesConsent();
  //   await util.browser.switchToIframe("[id='sampleFrame']");
  // });

  it("Execution", async function () {
    const customerNameValue = ["Elena KG"];
    rowSelectors = await ui5.table.getSelectorsForRowsByValues(smartTableSelector, customerNameValue);
  });

  it("Verification", async function () {
    const selector1 = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        metadata: "sap.m.Text",
        text: [
          {
            model: "",
            path: "Dmbtr",
            value: "-1500.00",
            type: "string"
          }
        ]
      },
      ancestorProperties: rowSelectors[0].elementProperties
    };
    const selector2 = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        metadata: "sap.m.Text",
        text: [
          {
            model: "",
            path: "Dmbtr",
            value: "0.00",
            type: "string"
          }
        ]
      },
      ancestorProperties: rowSelectors[1].elementProperties
    };
    await expect(ui5.element.getDisplayed(selector1)).resolves.not.toThrow();
    await expect(ui5.element.getDisplayed(selector2)).resolves.not.toThrow();
  });
});

describe("table - getSelectorsForRowsByValues - sap.ui.comp.smarttable.SmartTable - unhappy case - multiple values as an array, receiving no row (empty array)", function () {
  // it("Preparation", async function () {
  //   await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable`);
  //   await handleCookiesConsent();
  //   await util.browser.switchToIframe("[id='sampleFrame']");
  // });

  it("Execution", async function () {
    const customerNameValue = ["Elena KG", "abcdef"];
    rowSelectors = await ui5.table.getSelectorsForRowsByValues(smartTableSelector, customerNameValue);
  });

  it("Verification", async function () {
    common.assertion.expectEqual(rowSelectors.length, 0);
  });
});

describe("table - getSelectorsForRowsByValues - sap.ui.table.Table - single value as an Array", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.table.Table/sample/sap.ui.table.sample.Basic`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const productName = ["Notebook Basic 15"];
    rowSelectors = await ui5.table.getSelectorsForRowsByValues(uiTableSelector, productName);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.table.sample.Basic.View",
        "metadata": "sap.ui.unified.Currency",
        "value": "956"
      },
      "ancestorProperties": rowSelectors[0].elementProperties
    };
    await expect(ui5.element.getDisplayed(selector)).resolves.not.toThrow();
  });
});

describe("table - getSelectorsForRowsByValues - sap.ui.table.TreeTable - single value as an Array", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.table.TreeTable/sample/sap.ui.table.sample.TreeTable.HierarchyMaintenanceJSONTreeBinding`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const categoryName = ["Men"];
    rowSelectors = await ui5.table.getSelectorsForRowsByValues(treeTableSelector, categoryName);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.table.sample.TreeTable.HierarchyMaintenanceJSONTreeBinding.View",
        metadata: "sap.m.Text",
        text: "Men"
      },
      ancestorProperties: rowSelectors[0].elementProperties
    };
    await expect(ui5.element.getDisplayed(selector)).resolves.not.toThrow();
  });

});

describe("table - getSelectorsForRowsByValues - sap.ui.mdc.Table - single value as an Array", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.mdc.Table/sample/sap.ui.mdc.demokit.sample.table.TableJson`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const name = "Mount Everest";
    rowSelectors = await ui5.table.getSelectorsForRowsByValues(mdcTableSelector, [name]);
  });


  it("Verification", async function () {
    const expectedRowSelector = {
      elementProperties: {
        metadata: "sap.m.ColumnListItem",
        id: "sampleComp-sap.ui.mdc.demokit.sample.table.TableJson---sample--table-innerTableRow-__clone5"
      }
    };
    await common.assertion.expectEqual(rowSelectors[0], expectedRowSelector);
  });
});

describe("table - getSelectorsForRowsByValues - sap.ui.mdc.Table - multiple values as an Array", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.mdc.Table/sample/sap.ui.mdc.demokit.sample.table.TableJson`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const values = ["Mount Everest", "1954"];
    rowSelectors = await ui5.table.getSelectorsForRowsByValues(mdcTableSelector, values, true, "exact");
  });


  it("Verification", async function () {
    const expectedRowSelectors = [
      {
        elementProperties: {
          metadata: "sap.m.ColumnListItem",
          id: "sampleComp-sap.ui.mdc.demokit.sample.table.TableJson---sample--table-innerTableRow-__clone6"
        }
      },
      {
        elementProperties: {
          metadata: "sap.m.ColumnListItem",
          id: "sampleComp-sap.ui.mdc.demokit.sample.table.TableJson---sample--table-innerTableRow-__clone10"
        }
      }
    ];
    await common.assertion.expectEqual(rowSelectors, expectedRowSelectors);
  });
});

describe("table - getSelectorsForRowsByValues - sap.ui.mdc.Table - unhappy case - row with values doesn't exist", function () {
  it("Execution && Verification", async function () {
    const values = ["Mount Everest", "NOT_EXISTS_!@#$%^&*()"];
    rowSelectors = await ui5.table.getSelectorsForRowsByValues(mdcTableSelector, values);
    await common.assertion.expectEqual(rowSelectors, []);
  });
});