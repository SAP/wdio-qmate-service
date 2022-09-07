"use strict";

const { handleCookiesConsent } = require("../../../helper/utils");

describe("browser - switchToNewWindow - title", function () {
  const demoAppsTitle = "Demo Apps - Demo Kit - SAPUI5 SDK";
  const shoppingCartTitle = "Shopping Cart";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/demoapps");
    await handleCookiesConsent();

    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.DemoApps",
        "metadata": "sap.ui.documentation.TitleLink",
        "bindingContextPath": "/demoAppsByCategory/0/rows/0/0"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution 1", async function () {
    await util.browser.switchToNewWindow(shoppingCartTitle);
  });

  it("Verification 1", async function () {
    const currentTitle = await browser.getTitle();
    await common.assertion.expectEqual(currentTitle, shoppingCartTitle);
  });

  it("Execution 2", async function () {
    await util.browser.switchToNewWindow(demoAppsTitle);
  });

  it("Verification 2", async function () {
    const currentTitle = await browser.getTitle();
    await common.assertion.expectEqual(currentTitle, demoAppsTitle);
  });
});

describe("browser - switchToNewWindow - title (RegExp)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/demoapps");
    await handleCookiesConsent();

    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.DemoApps",
        "metadata": "sap.ui.documentation.TitleLink",
        "bindingContextPath": "/demoAppsByCategory/0/rows/0/0"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution 1", async function () {
    const titleRegExp = /Shopping/;
    await util.browser.switchToNewWindow(titleRegExp);
  });

  it("Verification 1", async function () {
    const titleAct = await browser.getTitle();
    const titleExp = "Shopping Cart";
    await common.assertion.expectEqual(titleAct, titleExp);
  });
});

describe("browser - switchToNewWindow - url", function () {
  const shoppingCartUrl = "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/demoapps");
    await handleCookiesConsent();

    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.DemoApps",
        "metadata": "sap.ui.documentation.TitleLink",
        "bindingContextPath": "/demoAppsByCategory/0/rows/0/0"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution", async function () {
    await util.browser.switchToNewWindow(shoppingCartUrl);
  });

  it("Verification", async function () {
    const currentUrl = await util.browser.getCurrentUrl();
    await common.assertion.expectEqual(currentUrl, shoppingCartUrl);
  });
});

describe("browser - switchToNewWindow - url (RegExp)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/demoapps");
    await handleCookiesConsent();

    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.DemoApps",
        "metadata": "sap.ui.documentation.TitleLink",
        "bindingContextPath": "/demoAppsByCategory/0/rows/0/0"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution", async function () {
    const urlRegExp = /demokit\/cart/;
    await util.browser.switchToNewWindow(urlRegExp);
  });

  it("Verification", async function () {
    const urlExp = "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon";
    const urlAct = await util.browser.getCurrentUrl();
    await common.assertion.expectEqual(urlAct, urlExp);
  });
});

describe("browser - switchToNewWindow - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/demoapps");
    await handleCookiesConsent();

    const selector = {
      "elementProperties": {
        "viewName": "sap.ui.documentation.sdk.view.DemoApps",
        "metadata": "sap.ui.documentation.TitleLink",
        "bindingContextPath": "/demoAppsByCategory/0/rows/0/0"
      }
    };
    await ui5.userInteraction.click(selector);
  });

  it("Execution & Verification", async function () {
    await expect(util.browser.switchToNewWindow("Wrong Title"))
      .rejects.toThrow(/Function 'switchToNewWindow' failed:/);
  });
});