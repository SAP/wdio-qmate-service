const { handleCookiesConsent } = require("../../../../utils");

describe("userInteraction - click", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.App",
        "metadata": "sap.m.IconTabFilter",
        "id": "*apiMasterTab"
      }
    };
    await ui5.common.userInteraction.click(selector, 0, 60000);
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectUrlToBe("https://sapui5.hana.ondemand.com/#/api");
  });
});

describe("userInteraction - click on not displayed element", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.ApiDetailInitial",
        "metadata": "sap.ui.documentation.TitleLink",
        "text": "Main Controls"
      }
    };
    const index = 0;
    const timeout = 30000;
    await expect(ui5.common.userInteraction.click(selector, index, timeout))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});

describe("userInteraction - click on invisible element", function () {

  it("Preparation", async function () {
    await ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/category/AC/product/HT-6111");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {

    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Product",
        "metadata": "sap.m.Button",
        "text": [{
          "path": "i18n>addToCartShort"
        }]
      }
    };
    const index = 0;
    const timeout = 30000;
    await ui5.common.userInteraction.click(selector, index, timeout);
    await browser.pause(1000);
    await expect(ui5.common.userInteraction.click(selector, index, timeout))
      .rejects.toThrow("Element not clickable after 30s");
  });
});
