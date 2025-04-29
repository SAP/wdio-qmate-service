const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("userInteraction - clearAndFillSmartFieldInputAndRetry", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smartfield.Overview.Main",
        "metadata": "sap.m.Input",
        "id": "*idWhitespace-input"
      }
    };

    const value = "smart field with      spaces";
    const index = 0;
    const timeout = 30000;
    const retries = 2;
    const interval = 2000;
    const verify = true;
    await ui5.userInteraction.clearAndFillSmartFieldInputAndRetry(selector, value, index, timeout, retries, interval, verify);
  });
});
