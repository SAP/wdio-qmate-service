const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - fill and retry", function () {
  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.demo.cart.view.Home",
        metadata: "sap.m.SearchField",
        id: "*searchField"
      }
    };

    value = "My Value";
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    await ui5.userInteraction.fillAndRetry(selector, value, index, timeout, retries);
    actualValue = await ui5.element.getValue(selector, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, value);
  });
});

describe("userInteraction - fillAndRetry element with invalid selector", function () {
  let value;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.demo.cart.view.Home",
        metadata: "sap.eld"
      }
    };

    value = "My Value";
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    await expect(ui5.userInteraction.fillAndRetry(selector, value, index, timeout, retries)).rejects.toThrow(
      "Retries done. Failed to execute the function"
    );
  });
});

describe("userInteraction - fillAndRetry element with number", function () {
  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.demo.cart.view.Home",
        metadata: "sap.m.SearchField",
        id: "*searchField"
      }
    };
    value = 12;
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    await ui5.userInteraction.fillAndRetry(selector, value, index, timeout, retries);
    actualValue = await ui5.element.getValue(selector, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, "12");
  });
});

describe("userInteraction - fillAndRetry element with empty value", function () {
  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.demo.cart.view.Home",
        metadata: "sap.m.SearchField",
        id: "*searchField"
      }
    };
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    await expect(ui5.userInteraction.fillAndRetry(selector, value, index, timeout, retries)).rejects.toThrow(
      "Function 'fillAndRetry' failed with: Retries done. Failed to execute the function: Please provide an element and value(datatype - number/string) as arguments"
    );
  });
});
