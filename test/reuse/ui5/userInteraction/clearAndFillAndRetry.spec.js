const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - clearAndFillAndRetry - smartField", function () {
  it("Preparation", async function () {
    await browser.navigateTo(
      "https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview"
    );
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smartfield.Overview.Main",
        metadata: "sap.ui.comp.smartfield.SmartField",
        id: "*idQuantity",
        value: [
          {
            path: "Quantity"
          }
        ]
      }
    };

    const value = "69696";
    const index = 0;
    const timeout = 30000;
    const retries = 2;
    const interval = 2000;
    const verify = true;
    await ui5.userInteraction.clearAndFillAndRetry(selector, value, index, timeout, retries, interval, verify);
  });
});

describe("userInteraction - clearAndFillAndRetry - textarea", function () {
  it("Preparation", async function () {
    await browser.navigateTo(
      "https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview"
    );
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.comp.sample.smartfield.Overview.Main",
        metadata: "sap.m.TextArea"
      }
    };
    const value = "My Value";
    const index = 0;
    const timeout = 30000;
    const retries = 2;
    const interval = 2000;
    const verify = true;
    await ui5.userInteraction.clearAndFillAndRetry(selector, value, index, timeout, retries, interval, verify);
  });
});

describe("userInteraction - clearAndFillAndRetry - input field", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.InputDescription.V",
        metadata: "sap.m.Input",
        description: "IT Laptops"
      }
    };
    const value = "My Value";
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    const interval = 2000;
    const verify = true;
    await ui5.userInteraction.clearAndFillAndRetry(selector, value, index, timeout, retries, interval, verify);
  });
});

describe("userInteraction - clearAndFillAndRetry - invalid selector", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.samplputDescription.V",
        metadata: "sap.put",
        id: "__input4"
      }
    };
    const value = "My Value";
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    const interval = 2000;
    await expect(ui5.userInteraction.clearAndFillAndRetry(selector, value, index, timeout, retries, interval)).rejects.toThrow(
      "Retries done. Failed to execute the function"
    );
  });
});

describe("userInteraction - clearAndFillAndRetry - wrong element", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MenuButton/sample/sap.m.sample.MenuButton");
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
    const value = "My Value";
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    const interval = 2000;
    await expect(ui5.userInteraction.clearAndFillAndRetry(selector, value, index, timeout, retries, interval)).rejects.toThrow(
      "Function 'clearAndFillAndRetry' failed with: Retries done. Failed to execute the function:"
    );
  });
});
