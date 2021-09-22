const {
  handleCookiesConsent
} = require("../../../helper/utils");

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
    await ui5.userInteraction.click(selector);
    await common.userInteraction.fillActiveAndRetry(value, retries, interval);
    actualValue = await ui5.element.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, value);
  });
});

describe("userInteraction - fillActiveAndRetry element with invalid selector", function () {

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

    const value = "My Value";
    await expect(ui5.userInteraction.click(selector))
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
    await ui5.userInteraction.click(selector);
    await common.userInteraction.fillActiveAndRetry(value, retries, interval);
    actualValue = await ui5.element.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, "12");
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
    await ui5.userInteraction.click(selector);
    await common.userInteraction.fillActiveAndRetry(value, retries, interval);
    actualValue = await ui5.element.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, "");
  });
});

describe("userInteraction - fillActiveAndRetry form field", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getElementById("ExampleValue1", 10000);
    // Check field is empty before the test
    await nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution", async function () {
    // Make the form field active
    await nonUi5.userInteraction.click(element);

    await common.userInteraction.fillActiveAndRetry("New test value");
    const submitElement = await nonUi5.element.getElementByCss("[onclick='showValue();']");
    await nonUi5.userInteraction.click(submitElement);
  });

  it("Verification", async function () {
    // Check the form field itself
    element = await nonUi5.element.getElementById("ExampleValue1", 10000);
    await nonUi5.assertion.expectValueToBe(element, "New test value", "value");

    // Check the submitted value
    const submittedResultField = await nonUi5.element.getElementById("display1", 10000);
    await nonUi5.assertion.expectValueToBe(submittedResultField, "New test value", "textContent");
  });
});

describe("userInteraction - fillActiveAndRetry with empty value", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getElementById("ExampleValue1", 10000);
    // Check field is empty before the test
    await nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution", async function () {
    // Make the form field active
    await nonUi5.userInteraction.click(element);
    await common.userInteraction.fillActiveAndRetry();
  });

  it("Verification", async function () {
    // Check the form field itself
    await nonUi5.assertion.expectValueToBe(element, "", "value");
  });
});

describe("userInteraction - fillActiveAndRetry a button (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    // Active element is random
    await expect(common.userInteraction.fillActiveAndRetry("New test value"))
      .rejects.toThrow("Retries done. Failed to execute the function: invalid element state");
  });
});