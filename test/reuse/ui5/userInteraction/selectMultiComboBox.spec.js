const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("userInteraction - selectMultiComboBox", function () {

  let selector;
  let value1;
  let value2;
  let expectedValue;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.MultiComboBox"
      }
    };
    value1 = "Astro Phone 6";
    value2 = "Astro Laptop 1516";
    await ui5.userInteraction.selectMultiComboBox(selector, [value1, value2]);
  });

  it("Verification", async function () {
    expectedValue = "HT-1252,HT-1251";
    await ui5.assertion.expectAttributeToBe(selector, "selectedKeys", expectedValue);
  });
});

describe("userInteraction - selectMultiComboBox (outside of a Viewport)", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.MultiComboBox"
      }
    };
    const value1 = "Beam Breaker B-2";
    const value2 = "Flat XL"; // wdio-qmate-service scrolls down to "Flat XL"
    await ui5.userInteraction.selectMultiComboBox(selector, [value1, value2]);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.MultiComboBox"
      }
    };
    const valueExp = "HT-6101,HT-1037";
    await ui5.assertion.expectAttributeToBe(selector, "selectedKeys", valueExp);
  });
});

describe("userInteraction - selectMultiComboBox use wrong selector", function () {

  let selector;
  let value1;
  let value2;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.MumboBox"
      }
    };
    value1 = "Astro Phone 6";
    value2 = "Astro Laptop 1516";
    await expect(ui5.userInteraction.selectMultiComboBox(selector, [value1, value2]))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("userInteraction - selectMultiComboBox use wrong value", function () {

  let selector;
  let value1;
  let value2;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
        "metadata": "sap.m.MultiComboBox"
      }
    };
    value1 = "Beadgsh";
    value2 = "FlL";
    await expect(ui5.userInteraction.selectMultiComboBox(selector, [value1, value2]))
      .rejects.toThrow(/No visible elements found/);
  });
});

describe("userInteraction - selectMultiComboBox with index > 0", function () {

  let selector;
  let firstMultiComboValue1, secondMultiComboValue1;
  let firstMultiComboValue2, secondMultiComboValue2;
  let firstMultiComboExpectedValue, secondMultiComboExpectedValue;
  const firstIndex = 1;
  const secondIndex = 3;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBoxSuggestionsAndValueState");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MultiComboBoxSuggestionsAndValueState.view.MultiComboBoxSuggestionsAndValueState",
        "metadata": "sap.m.MultiComboBox"
      }
    };
    firstMultiComboValue1 = "Astro Phone 6";
    firstMultiComboValue2 = "Astro Laptop 1516";
    await ui5.userInteraction.selectMultiComboBox(selector, [firstMultiComboValue1, firstMultiComboValue2], firstIndex);
    secondMultiComboValue1 = "CD/DVD case: 264 sleeves";
    secondMultiComboValue2 = "Cepat Tablet 8";
    await ui5.userInteraction.selectMultiComboBox(selector, [secondMultiComboValue1, secondMultiComboValue2], secondIndex);
  });

  it("Verification of values in first MultiComboBox", async function () {
    firstMultiComboExpectedValue = "HT-1252,HT-1251";
    await ui5.assertion.expectAttributeToBe(selector, "selectedKeys", firstMultiComboExpectedValue, firstIndex);
  });

  it("Verification of values in second MultiComboBox", async function () {
    secondMultiComboExpectedValue = "HT-2025,HT-1258";
    await ui5.assertion.expectAttributeToBe(selector, "selectedKeys", secondMultiComboExpectedValue, secondIndex);
  });
});