const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("userInteraction - clearAndFill - Input", function () {
  const selector = {
    "elementProperties": {
      "viewName": "sap.m.sample.InputValueState.V",
      "metadata": "sap.m.Input"
    }
  };
  const value = "ABC";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputValueState");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const index = 0;
    const timeout = 20000;
    await ui5.userInteraction.clearAndFill(selector, value, index, timeout);
  });

  it("Verification", async function () {
    await ui5.assertion.expectValueToBe(selector, value);
  });
});

describe("userInteraction - clearAndFill - SmartField", function () {
  const selector = {
    "elementProperties": {
      "viewName": "sap.ui.comp.sample.smartfield.Overview.Main",
      "metadata": "sap.ui.comp.smartfield.SmartField",
      "id": "*idQuantity",
      "value": [{
        "path": "Quantity"
      }]
    }
  };
  const value = "50";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const index = 0;
    const timeout = 20000;
    await ui5.userInteraction.clearAndFill(selector, value, index, timeout);
  });

  it("Verification", async function () {
    await ui5.assertion.expectValueToBe(selector, value);
  });
});

describe("userInteraction - clearAndFill - TextArea", function () {
  const selector = {
    "elementProperties": {
      "viewName": "sap.ui.comp.sample.smartfield.Overview.Main",
      "metadata": "sap.m.TextArea",
      "id": "*idDescription-textArea"
    }
  };
  const value = "Hello World!";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const index = 0;
    const timeout = 20000;
    await ui5.userInteraction.clearAndFill(selector, value, index, timeout);
  });

  it("Verification", async function () {
    await ui5.assertion.expectValueToBe(selector, value);
  });
});

describe("userInteraction - clearAndFill - ComboBox", function () {
  const selector = {
    "elementProperties": {
      "viewName": "sap.m.sample.ComboBox.view.ComboBox",
      "metadata": "sap.m.ComboBox"
    }
  };
  const value = "Germany";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.ComboBox/sample/sap.m.sample.ComboBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
    await ui5.userInteraction.selectComboBox(selector, "Greece");
  });

  it("Execution", async function () {
    const index = 0;
    const timeout = 20000;
    await ui5.userInteraction.clearAndFill(selector, value, index, timeout);
  });

  it("Verification", async function () {
    await ui5.assertion.expectValueToBe(selector, value);
  });
});

describe("userInteraction - clearAndFill - MultiComboBox", function () {
  const selector = {
    "elementProperties": {
      "viewName": "sap.m.sample.MultiComboBox.view.MultiComboBox",
      "metadata": "sap.m.MultiComboBox"
    }
  };
  const value = "Copymaster";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
    await ui5.userInteraction.selectMultiComboBox(selector, ["Comfort Senior", "Comfort Easy"]);
  });

  it("Execution", async function () {
    const index = 0;
    const timeout = 20000;
    await ui5.userInteraction.clearAndFill(selector, value, index, timeout);
  });

  it("Verification", async function () {
    await ui5.assertion.expectValueToBe(selector, value);
  });
});

describe("userInteraction - clearAndFill - Input - error case", function () {
  const selector = {
    "elementProperties": {
      "viewName": "sap.m.sample.InputValueState.V",
      "metadata": "sap.m.InvalidControl"
    }
  };
  const value = "ABC";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputValueState");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const index = 0;
    const timeout = 5000;
    await expect(ui5.userInteraction.clearAndFill(selector, value, index, timeout))
      .rejects.toThrow(/No visible elements found/);
  });
});