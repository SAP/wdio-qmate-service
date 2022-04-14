const { handleCookiesConsent } = require("../../../../helper/utils");

describe("userInteraction - fill", function () {

  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html");
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
    await ui5.common.userInteraction.fill(selector, value, index, timeout);
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(actualValue, value);
  });
});

describe("userInteraction - fill element with invalid selector", function () {

  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html");
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
    const index = 0;
    const timeout = 30000;
    await expect(ui5.common.userInteraction.fill(selector, value, index, timeout))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("userInteraction - fill element with number", function () {

  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html");
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
    await ui5.common.userInteraction.fill(selector, value, index, timeout);
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(actualValue, "12");
  });
});

describe("userInteraction - fill element with empty value", function () {

  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html");
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
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(actualValue, "");
  });
});
