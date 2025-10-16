const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("userInteraction - selectBox", function () {

  let selector;
  let actualValue;
  let expectedValue;
  let index;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Select/sample/sap.m.sample.Select");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "sap.m.Select",
        "items": [{
          "path": "/ProductCollection2"
        }]
      }
    };
    index = 0;
    actualValue = "Notebook Basic 19";
    await ui5.userInteraction.selectBox(selector, actualValue, index);
  });

  it("Verification", async function () {
    expectedValue = "HT-1003";
    index = 0;
    await ui5.assertion.expectAttributeToBe(selector, "selectedKey", expectedValue, index);
  });
});

describe("userInteraction - selectComboBox use wrong selector", function () {

  let selector;
  let actualValue;
  let index;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Select/sample/sap.m.sample.Select");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "sap.m.Select",
        "items": [{
          "path": "/Produection2"
        }]
      }
    };
    actualValue = "HT-1003";
    index = 0;
    await expect(ui5.userInteraction.selectBox(selector, actualValue, index))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("userInteraction - selectComboBox use wrong value", function () {

  let actualValue;
  let selector;
  let index;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Select/sample/sap.m.sample.Select");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "sap.m.Select",
        "items": [{
          "path": "/ProductCollection2"
        }]
      }
    };
    actualValue = "ABCDE";
    index = 0;
    await expect(ui5.userInteraction.selectBox(selector, actualValue, index))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("userInteraction - use 3rd selectBox on page", function () {

  let selector;
  let actualValue;
  let expectedValue;
  let index;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Select/sample/sap.m.sample.SelectValueState");
    await handleCookiesConsent();
    await util.browser.refresh();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.SelectValueState.Page",
        "metadata": "sap.m.Select",
        "items": [{
          "path": "/*"
        }]
      }
    };
    index = 2;
    actualValue = "Notebook Professional 11";
    await ui5.userInteraction.selectBox(selector, actualValue, index);
  });

  it("Verification", async function () {
    expectedValue = "HT-1008";
    index = 2;
    await ui5.assertion.expectAttributeToBe(selector, "selectedKey", expectedValue, index);
  });
});