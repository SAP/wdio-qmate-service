const {
  handleCookiesConsent
} = require("../../../../helper/utils");

describe("userInteraction - clickSelectArrowAndRetry", function () {

  it("Preparation", async function () {
    await ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Select/sample/sap.m.sample.Select");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const retries = 3;
    const interval = 3000;

    // Execution
    const catalog = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "sap.m.Select",
        "items": [{
          "path": "/ProductCollection2"
        }]
      }
    };

    let index = 0;
    await ui5.common.userInteraction.clickSelectArrowAndRetry(catalog, index, retries, interval);


    // Verification
    let selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "sap.ui.core.Item",
        "bindingContextPath": "/ProductCollection2/3"
      }
    };
    await ui5.common.assertion.expectToBeVisible(selector);

    // Close dropdown list
    // Execution
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "sap.m.Select",
        "type": "Default"
      }
    };
    index = 1;
    await ui5.common.userInteraction.clickSelectArrowAndRetry(selector, index, retries, interval);

    // Verification
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "sap.ui.core.Item",
        "bindingContextPath": "/ProductCollection2/3"
      }
    };
    await ui5.common.assertion.expectToBeNotVisible(selector);
  });
});


describe("userInteraction - clickSelectArrow and catch an error", function () {

  it("Preparation", async function () {
    await ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Select/sample/sap.m.sample.Select");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "salect",
        "type": "Default"
      }
    };
    const index = 10;
    const retries = 1;
    const interval = 2;
    await expect(ui5.common.userInteraction.clickSelectArrowAndRetry(selector, index, interval, retries))
      .rejects.toThrow("Retries done. Failed to execute the function");
  });
});

describe("userInteraction - clickSelectArrowAndRetry with index > 0", function () {

  it("Preparation", async function () {
    await ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Select/sample/sap.m.sample.SelectValueState");
    await utilities.browser.refresh();
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const retries = 3;
    const interval = 3000;

    // Execution
    const catalog = {
      "elementProperties": {
        "viewName": "sap.m.sample.SelectValueState.Page",
        "metadata": "sap.m.Select",
        "items": [{
          "path": "/*"
        }]
      }
    };

    let index = 2;
    await ui5.common.userInteraction.clickSelectArrowAndRetry(catalog, index, retries, interval);


    // Verification
    let selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.SelectValueState.Page",
        "metadata": "sap.ui.core.Item",
        "bindingContextPath": "/SuccessProductCollection/2"
      }
    };
    await ui5.common.assertion.expectToBeVisible(selector);

    // Close dropdown list
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.SelectValueState.Page",
        "metadata": "sap.m.Select",
        "type": "Default"
      }
    };
    index = 2;
    await ui5.common.userInteraction.clickSelectArrowAndRetry(selector, index, retries, interval);

    // Verification
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.SelectValueState.Page",
        "metadata": "sap.ui.core.Item",
        "bindingContextPath": "/SuccessProductCollection/2"
      }
    };
    await ui5.common.assertion.expectToBeNotVisible(selector);
  });
});