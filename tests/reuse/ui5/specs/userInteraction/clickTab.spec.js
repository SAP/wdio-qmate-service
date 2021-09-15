const { handleCookiesConsent } = require("../../../utils");

describe("userInteraction - click Tab", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/api/sap.m.IconTabBar");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.SubApiDetail",
        "metadata": "sap.m.Button",
        "text": "Properties"
      }
    };
    const index = 0;
    const timeout = 30000;
    await ui5.common.userInteraction.clickTab(selector, index, timeout);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.SubApiDetail",
        "metadata": "sap.m.Label",
        "text": "Show borrowed properties"
      }
    };
    await ui5.common.assertion.expectToBeVisible(selector);
  });
});


describe("userInteraction - click on non Tab element", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/api/sap.m.IconTabBar");
    await utilities.browser.refresh();
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.SubApiDetail",
        "metadata": "sap.ui.documentation.JSDocText",
        "text": [{
          "path": "/description"
        }]
      }
    };
    const index = 0;
    const timeout = 30000;
    await expect(ui5.common.userInteraction.clickTab(selector, index, timeout))
      .rejects.toThrow("Retries done. Failed to execute the function. increase your retries.");
  });
});
