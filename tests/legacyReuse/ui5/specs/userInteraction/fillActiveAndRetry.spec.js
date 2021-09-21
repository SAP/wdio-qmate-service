const { handleCookiesConsent } = require("../../../utils");

describe("userInteraction - fill active and retry", function () {

  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.SearchField",
        "id": "*searchField"
      }
    };

    value = "My Value";
    const index = 0;
    const timeout = 30000;
    const attribute = "value";
    const retries = 1;
    const interval = 3000;
    await ui5.common.userInteraction.click(selector);
    await ui5.common.userInteraction.fillActiveAndRetry(value, retries, interval);
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(actualValue, value);
  });
});

describe("userInteraction - fillActiveAndRetry element with invalid selector", function () {

  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.eld"
      }
    };

    value = "My Value";
    await expect(ui5.common.userInteraction.click(selector))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("userInteraction - fillActiveAndRetry element with number", function () {

  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.SearchField",
        "id": "*searchField"
      }
    };
    value = 12;
    const index = 0;
    const timeout = 30000;
    const attribute = "value";
    const retries = 1;
    const interval = 3000;
    await ui5.common.userInteraction.click(selector);
    await ui5.common.userInteraction.fillActiveAndRetry(value, retries, interval);
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(actualValue, "12");
  });
});

describe("userInteraction - fillActiveAndRetry element with empty value", function () {

  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.SearchField",
        "id": "*searchField"
      }
    };
    const index = 0;
    const timeout = 30000;
    const attribute = "value";
    const retries = 1;
    const interval = 3000;
    await ui5.common.userInteraction.click(selector);
    await ui5.common.userInteraction.fillActiveAndRetry(value, retries, interval);
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(actualValue, "");
  });
});
