const { handleCookiesConsent } = require("../../../utils");

describe("userInteraction - clearAndFill", function () {

  let selector;
  let value;
  let actualValue;
  let elem;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    selector = {
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

    value = "My Value";
    const index = 0;
    const timeout = 30000;
    await ui5.common.userInteraction.clearAndFill(selector, value, index, timeout);
    await ui5.common.userInteraction.click(secondProp, index, timeout);
    actualValue = await ui5.common.locator.getValue(selector, "value");
    ui5.common.assertion.expectEqual(value, actualValue);
  });
});

describe("userInteraction - clearAndFill 'NumericInput' with 0.000 template inside", function () {
  const valueToSet = 10;
  const selector = {
    "elementProperties": {
      "viewName": "sap.m.sample.StepInput.StepInput",
      "metadata": "sap.m.internal.NumericInput",
      "bindingContextPath": "/modelData/7"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.StepInput/sample/sap.m.sample.StepInput");
    await handleCookiesConsent();
    await utilities.browser.refresh();
  });

  it("Execution", async function () {
    await ui5.common.userInteraction.clear(selector);
    await ui5.common.userInteraction.pressEnter(); // Call template
    const actualValue = await ui5.common.locator.getValue(selector, "value");
    ui5.common.assertion.expectEqual(actualValue, "0.000"); // Expect field with a template

    await ui5.common.userInteraction.clearAndFill(selector, valueToSet); // Clear the template
  });

  it("Verification", async function () {
    const actualValue = await ui5.common.locator.getValue(selector, "value");
    ui5.common.assertion.expectEqual(actualValue, String(valueToSet)); // Check field value in not 0.010, but 10
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
    await expect(ui5.common.userInteraction.clearAndFill(selector, value, index, timeout))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

