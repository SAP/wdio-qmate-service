"use strict";
<<<<<<< HEAD:tests/reuseApi/tests/reuse/ui5/specs/assertion/expectValueToBeDefined.spec.js
const {
  handleCookiesConsent
} = require("../../../../utils");
=======
const { handleCookiesConsent } = require("../../../utils");
>>>>>>> ad7e99dc15c8600092d2517a4c25011d893edbde:tests/reuse/ui5/specs/assertion/expectValueToBeDefined.spec.js

describe("assertion - expectValueToBeDefined", function () {

  it("Preparation", async function () {
    await ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription");
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
    await ui5.common.assertion.expectValueToBeDefined(selector);

    await ui5.common.userInteraction.clearAndFill(selector, "New value");
    await ui5.common.userInteraction.pressEnter();
    await ui5.common.assertion.expectValueToBeDefined(selector);

    await ui5.common.userInteraction.clearAndFill(selector, "");
    await ui5.common.userInteraction.pressEnter();
    await expect(ui5.common.assertion.expectValueToBeDefined(selector)).rejects.toThrow(/Expect\w*|\d*not\w*|\d*""/);
  });
});