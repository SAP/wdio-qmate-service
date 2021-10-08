const {
  handleCookiesConsent
} = require("../../../../helper/utils");

describe("userInteraction - clearAndRetry", function () {

  const selector = {
    "elementProperties": {
      "viewName": "sap.m.sample.InputDescription.V",
      "metadata": "sap.m.Input",
      "description": "IT Laptops"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    const interval = 2000;
    await ui5.common.userInteraction.clearAndRetry(selector, index, timeout, retries, interval);
  });

  it("Execution and Verification", async function () {
    await ui5.common.userInteraction.pressTab(); // Copy-pasted from vyperForAll tests
    const actualValue = await ui5.common.locator.getValue(selector, "value");
    ui5.common.assertion.expectEqual(actualValue, "");
  });
});

describe("userInteraction - clearAndRetry with invalid selector", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "snputDescription.V",
        "metadata": "sap.m.Input",
        "id": "__input4"
      }
    };
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    const interval = 2000;
    await expect(ui5.common.userInteraction.clearAndRetry(selector, index, timeout, retries, interval))
      .rejects.toThrow("Retries done. Failed to execute the function:");
  });
});