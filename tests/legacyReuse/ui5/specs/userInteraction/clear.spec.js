const { handleCookiesConsent } = require("../../../../helper/utils");

describe("userInteraction - clear", function () {
  const selector = {
    "elementProperties": {
      "viewName": "sap.m.sample.InputDescription.V",
      "metadata": "sap.m.Input",
      "description": "IT Laptops"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await ui5.common.userInteraction.clear(selector);
  });

  it("Verification", async function () {
    await ui5.common.userInteraction.pressTab(); // Copy-pasted from vyperForAll tests
    const actualValue = await ui5.common.locator.getValue(selector, "value");
    ui5.common.assertion.expectEqual(actualValue, "");
  });
});

describe("userInteraction - clear with invalid selector", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
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
    await expect(ui5.common.userInteraction.clear(selector))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("userInteraction - clear third input field", function () {
  const selector = {
    "elementProperties": {
      "viewName": "sap.m.sample.InputDescription.V",
      "metadata": "sap.m.Input"
    }
  };
  let index = 2;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    index = 2;
    await ui5.common.userInteraction.clear(selector, index);
  });

  it("Verification", async function () {
    index = 2;
    await ui5.common.userInteraction.pressTab(); // Copy-pasted from vyperForAll tests
    const actualValue = await ui5.common.locator.getValue(selector, "value", index);
    ui5.common.assertion.expectEqual(actualValue, "");
  });
});
