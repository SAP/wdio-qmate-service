"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

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
    viewName: "sap.ui.table.sample.TreeTable.BasicODataTreeBinding.View",
    metadata: "sap.ui.table.TreeTable"
  }
};

let actRowSelector;

describe("table - getSelectorForRowByIndex - sap.ui.comp.smarttable.SmartTable - get first row", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const index = 0;
    actRowSelector = await ui5.table.getSelectorForRowByIndex(smartTableSelector, index);
  });

  it("Verification", async function () {
    const expRowSelector = {
      elementProperties: {
        metadata: "sap.m.ColumnListItem",
        bindingContextPath: "/LineItemsSet('1')"
      }
    };
    const expElement = await ui5.element.getId(expRowSelector);
    const actElement = await ui5.element.getId(actRowSelector);

    // Compare the element IDs since the function does construct the smartTableSelector using ID, which is unstable, hence can't be used for direct smartTableSelector comparison
    common.assertion.expectEqual(expElement, actElement);
  });
});

describe("table - getSelectorForRowByIndex - sap.ui.comp.smarttable.SmartTable - get fifth row", function () {
  // it("Preparation", async function () {
  //   await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
  //   await handleCookiesConsent();
  //   await util.browser.switchToIframe("[id='sampleFrame']");
  // });

  it("Execution", async function () {
    const index = 4;
    actRowSelector = await ui5.table.getSelectorForRowByIndex(smartTableSelector, index);
  });

  it("Verification", async function () {
    const expRowSelector = {
      elementProperties: {
        metadata: "sap.m.ColumnListItem",
        bindingContextPath: "/LineItemsSet('5')"
      }
    };
    const expElement = await ui5.element.getId(expRowSelector);
    const actElement = await ui5.element.getId(actRowSelector);

    // Compare the element IDs since the function does construct the smartTableSelector using ID, which is unstable, hence can't be used for direct smartTableSelector comparison
    common.assertion.expectEqual(expElement, actElement);
  });
});

describe("table - getSelectorForRowByIndex - sap.ui.comp.smarttable.SmartTable - unhappy case - row with index doesn't exist", function () {
  // it("Preparation", async function () {
  //   await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
  //   await handleCookiesConsent();
  //   await util.browser.switchToIframe("[id='sampleFrame']");
  // });

  it("Execution && Verification", async function () {
    const index = 550;
    await expect(ui5.table.getSelectorForRowByIndex(smartTableSelector, index)).rejects.toThrow(/No item found with index/);
  });
});


describe("table - getSelectorForRowByIndex - sap.ui.table.Table - get first row", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.table.Table/sample/sap.ui.table.sample.Basic");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const index = 0;
    actRowSelector = await ui5.table.getSelectorForRowByIndex(uiTableSelector, index);
  });


  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.table.sample.Basic.View",
        "metadata": "sap.ui.unified.Currency",
        "value": "956"
      },
      "ancestorProperties": actRowSelector.elementProperties
    };
    await expect(ui5.element.getDisplayed(selector)).resolves.not.toThrow();
  });

  describe("table - getSelectorForRowByIndex - sap.ui.table.TreeTable - get first row", function () {

    it("Preparation", async function () {
      await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.table.TreeTable/sample/sap.ui.table.sample.TreeTable.BasicODataTreeBinding");
      await handleCookiesConsent();
      await util.browser.switchToIframe("[id='sampleFrame']");
    });

    it("Execution", async function () {
      const index = 0;
      actRowSelector = await ui5.table.getSelectorForRowByIndex(treeTableSelector, index);
    });


    it("Verification", async function () {
      const selector = {
        elementProperties: {
          viewName: "sap.ui.table.sample.TreeTable.BasicODataTreeBinding.View",
          metadata: "sap.m.Text",
          bindingContextPath: "/Nodes*1)",
          text: [{
            path: "Description"
          }]
        },
        ancestorProperties: actRowSelector.elementProperties
      };
      await expect(ui5.element.getDisplayed(selector)).resolves.not.toThrow();
    });


  });

});