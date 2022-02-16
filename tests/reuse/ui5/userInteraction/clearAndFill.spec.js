const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - clearAndFill", function () {

  const selector = {
    "elementProperties": {
      "viewName": "sap.m.sample.InputDescription.V",
      "metadata": "sap.m.Input",
      "id": "__input4"
    }
  };

  const secondProp = {
    "elementProperties": {
      "viewName": "sap.m.sample.InputDescription.V",
      "metadata": "sap.m.Input",
      "value": "220.00"
    }
  };

  const value = "My Value";
  const index = 0;
  const timeout = 30000;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    
    await ui5.userInteraction.clearAndFill(selector, value, index, timeout);
    await ui5.userInteraction.click(secondProp, index, timeout);
  });

  it("Verification", async function () {
    const actualValue = await ui5.element.getValue(selector);
    common.assertion.expectEqual(value, actualValue);
  });
});

describe("userInteraction - clearAndFill 'NumericInput' with 0.000 template inside", function () {
  const selector = {
    "elementProperties": {
      "viewName": "sap.m.sample.StepInput.StepInput",
      "metadata": "sap.m.StepInput",
      "bindingContextPath": "/modelData/7"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.StepInput/sample/sap.m.sample.StepInput");
    await handleCookiesConsent();
    await util.browser.refresh();
  });

  it("Execution", async function () {
    await ui5.userInteraction.clear(selector);
    await common.userInteraction.pressEnter(); // Call template
  });

  it("Verification", async function () {
    const actualValue = await ui5.element.getValue(selector);
    common.assertion.expectEqual(actualValue, 0);
  });
});

describe("userInteraction - clearAndFill with invalid selector", function () {

  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.putDescription.V",
        "metadata": "sap.m.Input",
        "id": "__input4"
      }
    };
    value = "My Value";
    const index = 0;
    const timeout = 30000;
    await expect(ui5.userInteraction.clearAndFill(selector, value, index, timeout))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});