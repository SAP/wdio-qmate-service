const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("userInteraction - selectComboBox", function () {

  let selector;
  let actualValue;
  let expectedValue;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.ComboBox/sample/sap.m.sample.ComboBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.ComboBox.view.ComboBox",
        "metadata": "sap.m.ComboBox"
      }
    };
    actualValue = "Algeria";
    await ui5.userInteraction.selectComboBox(selector, actualValue);
  });

  it("Verification", async function () {
    expectedValue = "Algeria";
    await ui5.assertion.expectValueToBe(selector, expectedValue);
  });
});

describe("userInteraction - selectComboBox use wrong selector", function () {

  let selector;
  let value;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.ComboBox/sample/sap.m.sample.ComboBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.mboBox.view.ComboBox",
        "metadata": "sapoBox"
      }
    };
    value = "Germany";
    await expect(ui5.userInteraction.selectComboBox(selector, value))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("userInteraction - selectComboBox use wrong value", function () {

  let value;
  let selector;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.ComboBox/sample/sap.m.sample.ComboBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.ComboBox.view.ComboBox",
        "metadata": "sap.m.ComboBox"
      }
    };
    value = "ABCDE";
    await expect(ui5.userInteraction.selectComboBox(selector, value))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("userInteraction - selectComboBox with index > 0", function () {

  let selector;
  let actualFirstValue, actualSecondValue;
  let expectedFirstValue, expectedSecondValue;
  const firstIndex = 1;
  const secondIndex = 3;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.ComboBox/sample/sap.m.sample.ComboBoxValueState");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.ComboBoxValueState.view.ComboBoxValueState",
        "metadata": "sap.m.ComboBox"
      }
    };
    actualFirstValue = "Algeria";
    await ui5.userInteraction.selectComboBox(selector, actualFirstValue, firstIndex);
    actualSecondValue = "Egypt";
    await ui5.userInteraction.selectComboBox(selector, actualSecondValue, secondIndex);
  });

  it("Verification of first value", async function () {
    expectedFirstValue = "Algeria";
    await ui5.assertion.expectValueToBe(selector, expectedFirstValue, firstIndex);
  });

  it("Verification of first value", async function () {
    expectedSecondValue = "Egypt";
    await ui5.assertion.expectValueToBe(selector, expectedSecondValue, secondIndex);
  });
});