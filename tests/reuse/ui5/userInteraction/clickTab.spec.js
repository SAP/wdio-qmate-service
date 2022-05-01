const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - click Tab", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/#/api/sap.m.IconTabBar");
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
    await ui5.userInteraction.clickTab(selector, index, timeout);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.SubApiDetail",
        "metadata": "sap.m.Label",
        "text": "Show borrowed properties"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });
});


describe("userInteraction - click on non Tab element", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/1.99.0/#/api/sap.m.IconTabBar");
    await util.browser.refresh();
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
    await expect(ui5.userInteraction.clickTab(selector, index, timeout))
      .rejects.toThrow("Retries done. Failed to execute the function");
  });
});
