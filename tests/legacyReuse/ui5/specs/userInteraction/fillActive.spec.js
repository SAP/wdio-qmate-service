const { handleCookiesConsent } = require("../../../../helper/utils");

describe("userInteraction - fillActive", function () {

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
    await ui5.common.userInteraction.click(selector);
    await ui5.common.userInteraction.fillActive(value);
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(actualValue, value);
  });
});

describe("userInteraction - fillActive element with invalid selector", function () {

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
    await expect(ui5.common.userInteraction.click(selector))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("userInteraction - fillActive element with number", function () {

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
    await ui5.common.userInteraction.click(selector);
    await ui5.common.userInteraction.fillActive(value);
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(actualValue, "12");
  });
});

describe("userInteraction - fillActive element with empty value", function () {

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
    await ui5.common.userInteraction.click(selector);
    await ui5.common.userInteraction.fillActive(value);
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(actualValue, "");
  });
});

describe("userInteraction - fillActive input", function () {

  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputAssisted");
    await utilities.browser.refresh();
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.InputAssisted.V",
        "metadata": "sap.m.Input"
      }
    };
    value = "Qmate Test";
    const index = 0;
    const timeout = 30000;
    const attribute = "value";
    await ui5.common.userInteraction.click(selector);
    await ui5.common.userInteraction.fillActive(value);
    await ui5.common.userInteraction.pressTab();
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(actualValue, value);
  });
});

describe("userInteraction - fillActive textarea", function () {

  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.TextArea/sample/sap.m.sample.TextArea");
    await utilities.browser.refresh();
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.TextArea.view.TextArea",
        "metadata": "sap.m.TextArea"
      }
    };
    value = "Qmate Test";
    const index = 0;
    const timeout = 30000;
    const attribute = "value";
    await ui5.common.userInteraction.click(selector);
    await ui5.common.userInteraction.clear(selector);
    await ui5.common.userInteraction.fillActive(value);
    await ui5.common.userInteraction.pressTab();
    actualValue = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(actualValue, value);
  });
});