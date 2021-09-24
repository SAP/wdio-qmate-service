"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("assertion - expectValueToBeDefined", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.InputDescription.V",
        "metadata": "sap.m.Input",
        "description": "IT Laptops"
      }
    };
    await ui5.assertion.expectValueToBeDefined(selector);

    await ui5.userInteraction.clearAndFill(selector, "New value");
    await common.userInteraction.pressEnter();
    await ui5.assertion.expectValueToBeDefined(selector);

    await ui5.userInteraction.clearAndFill(selector, "");
    await common.userInteraction.pressEnter();
    await expect(ui5.assertion.expectValueToBeDefined(selector)).rejects.toThrow(/Expect\w*|\d*not\w*|\d*""/);
  });
});