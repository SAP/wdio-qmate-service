"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("table - sortColumnAscending - smartTable", function () {

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await ui5.table.sortColumnAscending("Name");
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Column",
        "tooltip": "Name"
      }
    };
    await ui5.assertion.expectAttributeToBe(selector, "sortIndicator", "Ascending");
  });

});

describe("table - sortColumnAscending - smartTable with tableSelector", function () {

  const tableSelector = {
    "elementProperties": {
      "metadata": "sap.ui.comp.smarttable.SmartTable"
    }
  };

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await ui5.table.sortColumnAscending("Name", tableSelector);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Column",
        "tooltip": "Name"
      },
      "ancestorProperties": tableSelector
    };
    await ui5.assertion.expectAttributeToBe(selector, "sortIndicator", "Ascending");
  });

});

describe("table - sortColumnAscending - smartTable with index (legacy)", function () {

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const index = 0; // deprecated
    await ui5.table.sortColumnAscending("Name", index);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Column",
        "tooltip": "Name"
      }
    };
    await ui5.assertion.expectAttributeToBe(selector, "sortIndicator", "Ascending", 0);
  });

});

describe("table - sortColumnAscending - smartTable - ui5 version > 1.99.0", function () {

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.table.sortColumnAscending("Name");
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Column",
        "importance": "High"
      },
      "descendantProperties": {
        "metadata": "sap.m.Label",
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "text": "Name"
      }
    };
    await ui5.assertion.expectAttributeToBe(selector, "sortIndicator", "Ascending");
  });

});

describe("table - sortColumnAscending - smartTable with tableSelector - ui5 version > 1.99.0", function () {

  const tableSelector = {
    "elementProperties": {
      "metadata": "sap.ui.comp.smarttable.SmartTable"
    }
  };

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.table.sortColumnAscending("Name", tableSelector);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Column",
        "importance": "High"
      },
      "descendantProperties": {
        "metadata": "sap.m.Label",
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "text": "Name"
      },
      "ancestorProperties": tableSelector
    };
    await ui5.assertion.expectAttributeToBe(selector, "sortIndicator", "Ascending");
  });

});

describe("table - sortColumnAscending - smartTable with index (legacy) - ui5 version > 1.99.0", function () {

  it("Preparation", async function () {
    await browser.url("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const index = 0; // deprecated
    await ui5.table.sortColumnAscending("Name", index);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "metadata": "sap.m.Column",
        "importance": "High"
      },
      "descendantProperties": {
        "metadata": "sap.m.Label",
        "viewName": "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        "text": "Name"
      }
    };
    await ui5.assertion.expectAttributeToBe(selector, "sortIndicator", "Ascending", 0);
  });

});