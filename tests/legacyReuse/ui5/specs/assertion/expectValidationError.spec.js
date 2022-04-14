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


describe("Expect input field 'valueState' not to be 'Error' (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.Input/sample/sap.m.sample.InputChecked");
    await handleCookiesConsent();
  });

  it("Execution", async function () { });

  it("Verification", async function () {
    await ui5.common.assertion.expectToBeVisible(inputFieldWithCheckSelector);
    // Expected: "Error"
    // Received: "None"
    await expect(ui5.common.assertion.expectValidationError(inputFieldWithCheckSelector))
      .rejects.toThrowError(/None/);
  });
});

describe("Expect input field 'valueState' to be 'Error'", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.Input/sample/sap.m.sample.InputChecked");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await browser.keys("Escape"); // To skip Cookie Consent
    await ui5.common.userInteraction.click(submitButtonSelector);
    await ui5.common.confirmationDialog.clickOk();
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectValidationError(inputFieldWithCheckSelector);
  });
});
