"use strict";

const { handleCookiesConsent } = require("../../../helper/utils");

describe("browser - switchToNewWindow - title", function () {
  const resourcesTitle = "Resources - Demo Kit - SAPUI5 SDK";
  const iconExplorerTitle = "Icon Explorer";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/resources");
    await handleCookiesConsent();

    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.Resources",
        metadata: "sap.m.Button",
        text: [
          {
            path: "i18n>RESOURCES_CARD_LINK_ICON_EXPLORER"
          }
        ]
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution 1", async function () {
    await util.browser.switchToNewWindow(iconExplorerTitle);
  });

  it("Verification 1", async function () {
    const currentTitle = await browser.getTitle();
    await common.assertion.expectEqual(currentTitle, iconExplorerTitle);
  });

  it("Execution 2", async function () {
    await util.browser.switchToNewWindow(resourcesTitle);
  });

  it("Verification 2", async function () {
    const currentTitle = await browser.getTitle();
    await common.assertion.expectEqual(currentTitle, resourcesTitle);
  });
});

describe("browser - switchToNewWindow - title (RegExp)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/resources");
    await handleCookiesConsent();

    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.Resources",
        metadata: "sap.m.Button",
        text: [
          {
            path: "i18n>RESOURCES_CARD_LINK_ICON_EXPLORER"
          }
        ]
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution 1", async function () {
    const titleRegExp = /Icon/;
    await util.browser.switchToNewWindow(titleRegExp);
  });

  it("Verification 1", async function () {
    const titleAct = await browser.getTitle();
    const titleExp = "Icon Explorer";
    await common.assertion.expectEqual(titleAct, titleExp);
  });
});

describe("browser - switchToNewWindow - url", function () {
  const iconExplorerUrl = "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/resources");
    await handleCookiesConsent();

    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.Resources",
        metadata: "sap.m.Button",
        text: [
          {
            path: "i18n>RESOURCES_CARD_LINK_ICON_EXPLORER"
          }
        ]
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution", async function () {
    await util.browser.switchToNewWindow(iconExplorerUrl);
  });

  it("Verification", async function () {
    const currentUrl = await util.browser.getCurrentUrl();
    await common.assertion.expectEqual(currentUrl, iconExplorerUrl);
  });
});

describe("browser - switchToNewWindow - url (RegExp)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/resources");
    await handleCookiesConsent();

    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.Resources",
        metadata: "sap.m.Button",
        text: [
          {
            path: "i18n>RESOURCES_CARD_LINK_ICON_EXPLORER"
          }
        ]
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution", async function () {
    const urlRegExp = /icon/;
    await util.browser.switchToNewWindow(urlRegExp);
  });

  it("Verification", async function () {
    const urlExp = "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html";
    const urlAct = await util.browser.getCurrentUrl();
    await common.assertion.expectEqual(urlAct, urlExp);
  });
});

describe("browser - switchToNewWindow - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/resources");
    await handleCookiesConsent();

    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.Resources",
        metadata: "sap.m.Button",
        text: [
          {
            path: "i18n>RESOURCES_CARD_LINK_ICON_EXPLORER"
          }
        ]
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution & Verification", async function () {
    await expect(util.browser.switchToNewWindow("Wrong Title")).rejects.toThrow(/Function 'switchToNewWindow' failed with/);
  });
});
