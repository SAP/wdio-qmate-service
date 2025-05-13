"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

let rows;

describe("table - getRowsByValues - smartTable - single value as a String", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable.mtable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution - get row with specific customer name", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smarttable.mtable.SmartTable",
        metadata: "sap.ui.comp.smarttable.SmartTable",
        id: "__table0"
      }
    };
    const customerNameValue = "HäuHoh Huch GmbH";
    rows = await ui5.table.getRowsSelectorsByValues(selector, customerNameValue);
  });


  it("Verification", async function () {
    const expColumnListItemId = "__item1-__clone14";
    await common.assertion.expectEqual(rows[0].elementProperties.id, expColumnListItemId);
  });

  describe("table - getRowsByValues - smartTable - single value as an Array", function () {

    it("Preparation", async function () {
      // TODO: 

    });


    it("Step 00: Execution ", async function () {
      // TODO: 

    });


    it("Step 00: Verification", async function () {
      // TODO: 

    });

  });

  describe("table - getRowsByValues - smartTable - multiple values as an Array", function () {

    it("Preparation", async function () {
      // TODO: 

    });


    it("Step 00: Execution ", async function () {
      // TODO: 

    });


    it("Step 00: Verification", async function () {
      // TODO: 

    });

  });

  describe("table - getRowsByValues - smartTable - unhappy case - multiple values as string", function () {

  });

  it("Preparation", async function () {
    // TODO: 

  });


  it("Step 00: Execution ", async function () {
    // TODO: 

  });


  it("Step 00: Verification", async function () {
    // TODO: 

  });

});