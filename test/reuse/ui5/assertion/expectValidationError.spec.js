"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

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
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputChecked");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {});

  it("Verification", async function () {
    await ui5.assertion.expectToBeVisible(inputFieldWithCheckSelector);
    await expect(ui5.assertion.expectValidationError(inputFieldWithCheckSelector))
      .rejects.toThrowError(/None/);
  });
});

describe("Expect input field 'valueState' to be 'Error'", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputChecked");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await browser.keys("Escape"); // To skip Cookie Consent
    await ui5.userInteraction.click(submitButtonSelector);
    await ui5.confirmationDialog.clickOk();
  });

  it("Verification", async function () {
    await ui5.assertion.expectValidationError(inputFieldWithCheckSelector);
  });
});