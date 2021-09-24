"use strict";

const { handleCookiesConsent } = require("../../../utils");

describe("iconTabBar - switchTab", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/topic");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {

    // Select "API Reference" tab and check "API Reference" page is here
    await ui5.common.iconTabBar.switchTab("API Reference");

    const selectorForApiReferencePageText = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.ApiDetailInitial",
        "metadata": "sap.m.Text",
        "id": "*landingImageHeadline"
      }
    };
    await ui5.common.assertion.expectToBeVisible(selectorForApiReferencePageText);
    await expect(ui5.common.locator.getValue(selectorForApiReferencePageText, "text"))
      .resolves.toBe("API Reference");

    // Select "Documentation" tab and check "Documentation" page is here
    await ui5.common.iconTabBar.switchTab("Documentation");

    const selectorForDocumentationPageText = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.TopicDetailInitial",
        "metadata": "sap.m.Text",
        "text": [{
          "path": "i18n>TOPIC_DETAIL_INIT_DOCUMENTATION"
        }]
      }
    };

    await ui5.common.assertion.expectToBeVisible(selectorForDocumentationPageText);
    await expect(ui5.common.locator.getValue(selectorForDocumentationPageText, "text"))
      .resolves.toBe("Documentation");
  });
});

describe("iconTabBar - switchTab using wring tab names (unhappy cases)", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/topic");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(ui5.common.iconTabBar.switchTab("WrongTab")).rejects
      .toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

    await expect(ui5.common.iconTabBar.switchTab("false")).rejects
      .toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

    await expect(ui5.common.iconTabBar.switchTab(null)).rejects
      .toThrow(/uiControlExecuteLocator\(\): No visible elements found/);

    await expect(ui5.common.iconTabBar.switchTab(undefined)).resolves.toBeUndefined();

    await expect(ui5.common.iconTabBar.switchTab("123")).rejects
      .toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});