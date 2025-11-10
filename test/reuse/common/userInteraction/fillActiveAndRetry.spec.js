const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - fillActiveAndRetry", function () {
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
    const interval = 3000;
    await ui5.userInteraction.click(selector);
    await common.userInteraction.fillActiveAndRetry(value, retries, interval);
    actualValue = await ui5.element.getValue(selector, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, value);
  });
});

describe("userInteraction - fillActiveAndRetry - invalid selector", function () {
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

    await expect(ui5.userInteraction.click(selector)).rejects.toThrow(/No visible elements found/);
  });
});

describe("userInteraction - fillActiveAndRetry - element with number", function () {
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
    const interval = 3000;
    await ui5.userInteraction.click(selector);
    await common.userInteraction.fillActiveAndRetry(value, retries, interval);
    actualValue = await ui5.element.getValue(selector, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, "12");
  });
});

describe("userInteraction - fillActiveAndRetry - empty value", function () {
  let value;

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
    const interval = 3000;
    await ui5.userInteraction.click(selector);
    await expect(common.userInteraction.fillActiveAndRetry(value)).rejects.toThrow(
      "Function 'fillActiveAndRetry' failed with: Retries done. Failed to execute the function: Please provide a value(datatype - number/string) as argument."
    );
  });
});

describe("userInteraction - fillActiveAndRetry - form field", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);
    // Check field is empty before the test
    await nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution", async function () {
    // Make the form field active
    await nonUi5.userInteraction.click(element);

    await common.userInteraction.fillActiveAndRetry("New test value");
    const submitElement = await nonUi5.element.getByCss("[onclick='showValue();']");
    await nonUi5.userInteraction.click(submitElement);
  });

  it("Verification", async function () {
    // Check the form field itself
    element = await nonUi5.element.getById("ExampleValue1", 10000);
    await nonUi5.assertion.expectValueToBe(element, "New test value", "value");

    // Check the submitted value
    const submittedResultField = await nonUi5.element.getById("display1", 10000);
    await nonUi5.assertion.expectValueToBe(submittedResultField, "New test value", "textContent");
  });
});

describe("userInteraction - fillActiveAndRetry - empty value", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);
    // Check field is empty before the test
    await nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution & Verification", async function () {
    // Make the form field active
    await nonUi5.userInteraction.click(element);
    await expect(common.userInteraction.fillActiveAndRetry()).rejects.toThrow(
      "Function 'fillActiveAndRetry' failed with: Retries done. Failed to execute the function: Please provide a value(datatype - number/string) as argument."
    );
  });
});
