"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("element - waitForAll", function () {

  const selector = {
    "elementProperties": {
      "viewName": "sap.tnt.sample.NavigationList.V",
      "metadata": "sap.tnt.NavigationListItem"
    }
  };
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.tnt.NavigationList/sample/sap.tnt.sample.NavigationList");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.element.waitForAll(selector, 30000);
  });

  it("Verification", async function () {
    await ui5.assertion.expectToBeVisible(selector);
  });
});

describe("element - waitForAll - error case", function () {

  const selector = {
    "elementProperties": {
      "viewName": "sap.tnt.sample.NavigationList.V",
      "metadata": "sap.tnt.NavigationListItem",
      "text": "No such element"
    }
  };
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.tnt.NavigationList/sample/sap.tnt.sample.NavigationList");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution and Verification", async function () {
    await expect(ui5.element.waitForAll(selector, 4000))
      .rejects.toThrow("Function 'waitForAll' failed with:");
  });
});