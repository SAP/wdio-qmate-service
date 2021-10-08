"use strict";
const { handleCookiesConsent } = require("../../../../helper/utils");

const submitButtonSelector = {
  "elementProperties": {
    "viewName": "sap.m.sample.InputChecked.V",
    "metadata": "sap.m.Button"
  }
};

const inputFieldWithCheckSelector = {
  "elementProperties": {
    "viewName": "sap.m.sample.InputChecked.V",
    "metadata": "sap.m.Input",
    "value": [{
      "path": "/email"
    }]
  }
};


describe("Expect input field 'valueState' to be 'None' (success)", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputChecked");
    await handleCookiesConsent();
  });

  it("Execution", async function () { });

  it("Verification", async function () {
    await ui5.common.assertion.expectToBeVisible(inputFieldWithCheckSelector);
    await ui5.common.assertion.expectValidationSuccess(inputFieldWithCheckSelector);
  });
});

describe("Expect input field 'valueState' not to be 'None' (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputChecked");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await ui5.common.userInteraction.click(submitButtonSelector);
    await ui5.common.confirmationDialog.clickOk();
  });

  it("Verification", async function () {
    // Expected: "None"
    // Received: "Error"
    await expect(ui5.common.assertion.expectValidationSuccess(inputFieldWithCheckSelector)).rejects.toThrowError(/Error/);
  });
});
