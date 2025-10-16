const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - clearAndFillActiveAndRetry", function () {
  let value;
  let actualValue;
  let attribute;
  let selector;

  it("Preparation", async function () {
    await browser.navigateTo(
      "https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview"
    );
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smartfield.Overview.Main",
        metadata: "sap.m.TextArea"
      }
    };
    value = "My Value";
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    const interval = 2000;
    attribute = "value";
    await ui5.userInteraction.click(selector);
    await common.userInteraction.clearAndFillActiveAndRetry(value, retries, interval);

    const quantityInput = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smartfield.Overview.Main",
        metadata: "sap.m.Input",
        value: [
          {
            path: "Quantity"
          }
        ]
      }
    };
    await ui5.userInteraction.click(quantityInput);
    actualValue = await ui5.element.getValue(selector, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(value, actualValue);
  });
});

describe("userInteraction - clearAndFillActiveAndRetry with invalid selector", function () {
  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.InputDescription.V",
        metadata: "sap.mput",
        id: "__put4"
      }
    };
    value = "My Value";
    await expect(ui5.userInteraction.click(selector)).rejects.toThrow(/No visible elements found/);
  });
});

describe("userInteraction - clearAndFillActiveAndRetry with wrong element", function () {
  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MenuButton/sample/sap.m.sample.MenuButton");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.MenuButton.MB",
        metadata: "sap.m.Button",
        text: "File Menu"
      },
      ancestorProperties: {
        metadata: "sap.m.SplitButton",
        viewName: "sap.m.sample.MenuButton.MB"
      }
    };
    value = "My Value";
    const retries = 1;
    const interval = 2000;
    await ui5.userInteraction.click(selector);
    await expect(common.userInteraction.clearAndFillActiveAndRetry(value, retries, interval)).rejects.toThrow(
      "Function 'clearAndFillActiveAndRetry' failed with: Retries done. Failed to execute the function:invalid element state"
    );
  });
});
