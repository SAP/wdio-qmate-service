const { handleCookiesConsent } = require("../../../utils");

describe("userInteraction - clearFillActiveAndRetry", function () {

  let value;
  let actualValue;
  let attribute;
  let selector;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview");
    await utilities.browser.refresh();
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smartfield.Overview.Main",
        "metadata": "sap.m.TextArea"
      }
    };
    value = "My Value";
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    const interval = 2000;
    attribute = "value";
    await ui5.common.userInteraction.click(selector);
    await ui5.common.userInteraction.clearFillActiveAndRetry(value, retries, interval);

    const quantityInput = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smartfield.Overview.Main",
        "metadata": "sap.m.Input",
        "value": [{
          "path": "Quantity"
        }]
      }
    };
    await ui5.common.userInteraction.click(quantityInput);
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(value, actualValue);
  });
});

describe("userInteraction - clearFillActiveAndRetry with invalid selector", function () {

  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await utilities.browser.refresh();
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.InputDescription.V",
        "metadata": "sap.mput",
        "id": "__put4"
      }
    };
    value = "My Value";
    await expect(ui5.common.userInteraction.click(selector))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });

});

describe("userInteraction - clearFillActiveAndRetry with wrong element", function () {

  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MenuButton/sample/sap.m.sample.MenuButton");
    await utilities.browser.refresh();
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MenuButton.MB",
        "metadata": "sap.m.Button",
        "text": "File Menu"
      },
      "ancestorProperties": {
        "metadata": "sap.m.SplitButton",
        "viewName": "sap.m.sample.MenuButton.MB"
      }
    };
    value = "My Value";
    const retries = 1;
    const interval = 2000;
    await ui5.common.userInteraction.click(selector);
    await expect(ui5.common.userInteraction.clearFillActiveAndRetry(value, retries, interval))
      .rejects.toThrow("Retries done. Failed to execute the function. increase your retries.");
  });
});
