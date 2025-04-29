"use strict";

const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("element - getByChild - simple case", function () {

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
        "metadata": "sap.m.ColumnListItem",
      }
    };
    const childSelector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Text",
        "bindingContextPath": "/LineItemsSet*'5')",
        "text": [{
          "path": "Dmbtr"
        }, {
          "path": "Hwaer"
        }, {
          "path": "/##@@requestCurrencyCodes"
        }]
      }
    };
    elem = await ui5.element.getByChild(elementSelector, childSelector);
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectAttributeToContain(elem, "clone4", "id");
  });

});

describe("element - getByChild - with ignored nested selectors", function () {

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
        "metadata": "sap.m.ColumnListItem",
        "bindingContextPath": "/LineItemsSet*'5')"
      },
      "descendantProperties": {
        "viewName": "ABC",
        "metadata": "DEF"
      }
    };
    const childSelector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Text",
        "bindingContextPath": "/LineItemsSet*'5')",
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
    elem = await ui5.element.getByChild(elementSelector, childSelector);
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectAttributeToContain(elem, "clone", "id");
  });

});

describe("element - getByChild - with inner nested selectors and index", function () {

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
        "metadata": "sap.m.ColumnListItem"
      }
    };
    const childSelector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Text",
        "text": "Yes"
      }
    };
    elem = await ui5.element.getByChild(elementSelector, childSelector, 3);
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectAttributeToContain(elem, "clone4", "id");
  });

});