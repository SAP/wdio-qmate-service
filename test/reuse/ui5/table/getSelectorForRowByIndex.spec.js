"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

const selector = {
  elementProperties: {
    viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
    metadata: "sap.ui.comp.smarttable.SmartTable",
    id: "__table0"
  }
};
let actRowSelector;

describe("table - getSelectorForRowByIndex - smartTable - get first row", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const index = 0;
    actRowSelector = await ui5.table.getSelectorForRowByIndex(selector, index);
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

    // Compare the element IDs since the function does construct the selector using ID, which is unstable, hence can't be used for direct selector comparison
    common.assertion.expectEqual(expElement, actElement);
  });
});

describe("table - getSelectorForRowByIndex - smartTable - get fifth row", function () {
  // it("Preparation", async function () {
  //   await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
  //   await handleCookiesConsent();
  //   await util.browser.switchToIframe("[id='sampleFrame']");
  // });

  it("Execution", async function () {
    const index = 4;
    actRowSelector = await ui5.table.getSelectorForRowByIndex(selector, index);
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

    // Compare the element IDs since the function does construct the selector using ID, which is unstable, hence can't be used for direct selector comparison
    common.assertion.expectEqual(expElement, actElement);
  });
});

describe("table - getSelectorForRowByIndex - smartTable - unhappy case - row with index doesn't exist", function () {
  // it("Preparation", async function () {
  //   await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
  //   await handleCookiesConsent();
  //   await util.browser.switchToIframe("[id='sampleFrame']");
  // });

  it("Execution && Verification", async function () {
    const index = 550;
    await expect(ui5.table.getSelectorForRowByIndex(selector, index)).rejects.toThrow(/No item found with index/);
  });
});
