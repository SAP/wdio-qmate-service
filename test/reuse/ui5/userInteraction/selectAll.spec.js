const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("userInteraction - selectAll", function () {
  const selector = {
    "elementProperties": {
      "viewName": "sap.m.sample.InputValueState.V",
      "metadata": "sap.m.Input"
    }
  };
  const index = 0;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.Input/sample/sap.m.sample.InputValueState");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await ui5.userInteraction.selectAll(selector, index);
  });

  it("Verification", async function () {
    await common.userInteraction.pressBackspace();
    await common.userInteraction.pressEnter(); 
    const actualValue = await ui5.element.getValue(selector, index);
    await common.assertion.expectEqual(actualValue, "");
  });
});