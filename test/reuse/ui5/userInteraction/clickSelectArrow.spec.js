const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - clickSelectArrow", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Select/sample/sap.m.sample.Select");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
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
    await ui5.userInteraction.clickSelectArrow(catalog, index);

    // Verification
    let selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "sap.ui.core.Item",
        "bindingContextPath": "/ProductCollection2/3"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);

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
    await ui5.userInteraction.clickSelectArrow(selector, index);

    // Verification
    selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "sap.ui.core.Item",
        "bindingContextPath": "/ProductCollection2/3"
      }
    };
    await ui5.assertion.expectToBeNotVisible(selector);
  });
});


describe("userInteraction - clickSelectArrow and catch an error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Select/sample/sap.m.sample.Select");
    await util.browser.refresh();
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const catalog = {
      "elementProperties": {
        "viewName": "sap.m.sample.Select.Page",
        "metadata": "sap.m.Select",
        "items": [{
          "path": "/ProductCollection2"
        }]
      }
    };

    await expect(ui5.userInteraction.clickSelectArrow(catalog, 111))
      .rejects.toThrow("Index out of bound. " +
            "Trying to access element at index: 111, but there are only 1 element(s) that match locator");

    await expect(ui5.userInteraction.clickSelectArrow(catalog, -1)).rejects.toThrow("Function 'clickSelectArrow' failed with: Index out of bound. Trying to access element at index: -1");
  });
});
