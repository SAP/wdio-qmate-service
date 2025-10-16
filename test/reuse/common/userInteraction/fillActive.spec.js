const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - fillActive", function () {
  let value;
  const selector = {
    elementProperties: {
      viewName: "sap.ui.demo.cart.view.Home",
      metadata: "sap.m.SearchField",
      id: "*searchField"
    }
  };

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    value = "My Value";
    await ui5.userInteraction.fill(selector, "123");
    await ui5.userInteraction.click(selector);
    await common.userInteraction.fillActive(value); // should add the given value and not clear the field.
  });

  it("Verification", async function () {
    const expValue = "123" + value; // therefore comparing the concatenation of previous value and filled value.
    const actValue = await ui5.element.getValue(selector);
    common.assertion.expectEqual(actValue, expValue);
  });
});

describe("userInteraction - fillActive - element with invalid selector", function () {
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

describe("userInteraction - fillActive - element with number", function () {
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
    await ui5.userInteraction.click(selector);
    await common.userInteraction.fillActive(value);
    actualValue = await ui5.element.getValue(selector, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, "12");
  });
});

describe("userInteraction - fillActive - element with empty value", function () {
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
    await ui5.userInteraction.click(selector);
    await expect(common.userInteraction.fillActive(value)).rejects.toThrow(
      "Function 'fillActive' failed with: Please provide a value(datatype - number/string) as argument."
    );
  });
});

describe("userInteraction - fillActive - input", function () {
  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputAssisted");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.InputAssisted.V",
        metadata: "sap.m.Input"
      }
    };
    value = "Qmate Test";
    const index = 0;
    const timeout = 30000;
    await ui5.userInteraction.click(selector);
    await common.userInteraction.fillActive(value);
    await common.userInteraction.pressTab();
    actualValue = await ui5.element.getValue(selector, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, value);
  });
});

describe("userInteraction - fillActive - textarea", function () {
  let value;
  let actualValue;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.TextArea/sample/sap.m.sample.TextArea");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.TextArea.view.TextArea",
        metadata: "sap.m.TextArea"
      }
    };
    value = "Qmate Test";
    const index = 0;
    const timeout = 30000;
    await ui5.userInteraction.click(selector);
    await ui5.userInteraction.clear(selector);
    await common.userInteraction.fillActive(value);
    await common.userInteraction.pressTab();
    actualValue = await ui5.element.getValue(selector, index, timeout);
  });

  it("Verification", function () {
    common.assertion.expectEqual(actualValue, value);
  });
});

describe("userInteraction - fillActive - form field", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getById("ExampleValue1", 10000);
    // Check field is empty before the test
    await nonUi5.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution", async function () {
    await nonUi5.userInteraction.click(element); // Make the form field active
    await common.userInteraction.fillActive("New test value");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectValueToBe(element, "New test value", "value");
  });
});

describe("userInteraction - fillActive - empty value", function () {
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
    await expect(common.userInteraction.fillActive()).rejects.toThrow(
      "Function 'fillActive' failed with: Please provide a value(datatype - number/string) as argument."
    );
  });
});

// describe("userInteraction - fillActive - button (unhappy case)", function () {
//   it("Preparation", async function () {
//     await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
//   });

//   it("Execution & Verification", async function () {
//     // Active element is random
//     await expect(common.userInteraction.fillActive("New test value"))
//       .rejects.toThrow("Function 'fillActive' failed: ");
//   });
// });
