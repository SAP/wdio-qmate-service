const {
  handleCookiesConsent
} = require("../../../../helper/utils");

describe("userInteraction - clearFillAndRetry", function () {

  let value;
  let valueAct;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
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
    const attribute = "value";
    await ui5.common.userInteraction.clearFillAndRetry(selector, value, index, timeout, retries, interval);
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
    valueAct = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(value, valueAct);
  });
});

describe("userInteraction - clearFillAndRetry with invalid selector", function () {

  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.samplputDescription.V",
        "metadata": "sap.put",
        "id": "__input4"
      }
    };
    value = "My Value";
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    const interval = 2000;
    await expect(ui5.common.userInteraction.clearFillAndRetry(selector, value, index, timeout, retries, interval))
      .rejects.toThrow("Retries done. Failed to execute the function");
  });
});

describe("userInteraction - clearFillAndRetry with wrong element", function () {

  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MenuButton/sample/sap.m.sample.MenuButton");
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
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    const interval = 2000;
    await expect(ui5.common.userInteraction.clearFillAndRetry(selector, value, index, timeout, retries, interval))
      .rejects.toThrow("Retries done. Failed to execute the function");
  });
});