const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - fill", function () {

  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
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
    await ui5.userInteraction.fill(selector, value, index, timeout);
    actualValue = await ui5.element.getValue(selector, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, value);
  });
});

describe("userInteraction - fill element with invalid selector", function () {

  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.eld"
      }
    };

    value = "My Value";
    const index = 0;
    const timeout = 30000;
    await expect(ui5.userInteraction.fill(selector, value, index, timeout))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("userInteraction - fill element with number", function () {

  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
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
    await ui5.userInteraction.fill(selector, value, index, timeout);
    actualValue = await ui5.element.getValue(selector, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, "12");
  });
});

describe("userInteraction - fill element with empty value", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
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
    await expect(ui5.userInteraction.fill(selector))
      .rejects.toThrow("Function 'fill' failed: Please provide an element and value(datatype - number/string) as arguments.");
  });
});
