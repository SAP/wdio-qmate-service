const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - clearAndFillSmartFieldInput", function () {

  let value;
  let valueAct;
  let selector;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smartfield.Overview.Main",
        "metadata": "sap.m.Input",
        "value": [{
          "path": "Quantity"
        }]
      }
    };

    value = "375.000";
    const index = 0;
    const timeout = 30000;

    await ui5.userInteraction.clearAndFillSmartFieldInput(selector, value, index, timeout);

    const textArea = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smartfield.Overview.Main",
        "metadata": "sap.m.TextArea"
      }
    };
    await ui5.userInteraction.click(textArea);
    await ui5.userInteraction.click(selector);
    valueAct = await ui5.element.getValue(selector, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(valueAct, value);
  });
});

describe("userInteraction - clearAndFillSmartFieldInput with invalid selector", function () {

  let value;
  let selector;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smartfield.Overview.Main",
        "metadata": "sap.ui.comp.smartfierr",
        "value": [{
          "path": "Quantity"
        }]
      }
    };
    value = "12";
    const index = 0;
    const timeout = 50000;
    await expect(ui5.userInteraction.clearAndFillSmartFieldInput(selector, value, index, timeout))
      .rejects.toThrow(/No visible elements found/);
  });
});
