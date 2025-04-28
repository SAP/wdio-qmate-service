"use strict";

const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("element - getByParent - simple case", function () {

  let elem;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const elementSelector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Text",
        "text": [{
          "path": "Dmbtr"
        }, {
          "path": "Hwaer"
        }, {
          "path": "/##@@requestCurrencyCodes"
        }]
      }
    };
    const parentSelector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.ColumnListItem",
        "bindingContextPath": "/LineItemsSet*'5')"
      }
    };
    elem = await ui5.element.getByParent(elementSelector, parentSelector);
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectValueToBe(elem, "1,418,880.43");
  });

});

describe("element - getByParent - with ignored nested selectors", function () {

  let elem;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const elementSelector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Text",
        "text": [{
          "path": "Dmbtr"
        }, {
          "path": "Hwaer"
        }, {
          "path": "/##@@requestCurrencyCodes"
        }]
      },
      "ancestorProperties": {
        "viewName": "ABC",
        "metadata": "DEF"
      }
    };
    const parentSelector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.ColumnListItem",
        "bindingContextPath": "/LineItemsSet*'5')"
      },
      "descendantProperties": {
        "viewName": "ABC",
        "metadata": "DEF"
      }
    };
    elem = await ui5.element.getByParent(elementSelector, parentSelector);
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectValueToBe(elem, "1,418,880.43");
  });

});

describe("element - getByParent - with inner nested selectors and index", function () {

  let elem;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const elementSelector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Text",
        "text": [{
          "path": "Dmbtr"
        }, {
          "path": "Hwaer"
        }, {
          "path": "/##@@requestCurrencyCodes"
        }]
      }
    };
    const parentSelector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.ColumnListItem",
        "descendantProperties": {
          "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
          "metadata": "sap.m.Text",
          "text": "Yes"
        }
      }
    };
    elem = await ui5.element.getByParent(elementSelector, parentSelector, 3);
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectValueToBe(elem, "1,418,880.43");
  });

});