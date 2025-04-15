const {
  handleCookiesConsent
} = require("../../../helper/utils");

const valuehelpSelector = {
  "elementProperties": {
    "viewName": "sap.m.sample.InputAssisted.V",
    "metadata": "sap.m.Input"
  }
};

const verificationSearchField = {
  "elementProperties": {
    "viewName": "sap.m.sample.InputAssisted.V",
    "metadata": "sap.m.SearchField"
  }
};

const index = 0;
const timeout = 30000;

describe("userInteraction - openF4Help - use valuehelp icon button", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputAssisted");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const useF4Key = false;
    await ui5.userInteraction.openF4Help(valuehelpSelector, index, timeout, useF4Key);
  });

  it("Verification", async function () {
    await ui5.assertion.expectToBeVisible(verificationSearchField);
    await common.userInteraction.pressEnter();
  });
});

describe("userInteraction - openF4Help - use F4 Key press", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputAssisted");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const useF4Key = true;
    await ui5.userInteraction.openF4Help(valuehelpSelector, index, timeout, useF4Key);
  });

  it("Verification", async function () {
    await ui5.assertion.expectToBeVisible(verificationSearchField);
    await common.userInteraction.pressEnter();
  });
});