"use strict";

describe("navigation - navigateToApplicationAndRetryRefresh (s4)", function () {
  it("Preparation", async function () {
    browser.config.baseUrl = "https://qs9-715.wdf.sap.corp/ui";
    await ui5.common.navigation.navigateToApplicationAndRetryRefresh("Shell-home", true);
    await ui5.common.session.loginFiori("PURCHASER");
  });

  it("Execution", async function () {
    await ui5.common.navigation.navigateToApplicationAndRetryRefresh("PurchaseOrder-manage", true);
  });

  it("Verification", async function () {
    // Note: currentUrl can contain system specific query params
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("#PurchaseOrder-manage");
    expect(currentUrl).toContain(browser.config.baseUrl);
  });

  it("Clean Up", async function () {
    await ui5.common.session.logout();

    // Reset baseUrl from config file
    browser.config.baseUrl = "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html";
  });
});

describe("navigation - navigateToApplicationAndRetryRefresh (demo url)", function () {
  const scannerIntent = "/category/SC";
  const graphicsCardIntent = "/category/GC";
  const selector = {
    "elementProperties": {
      "viewName": "sap.ui.demo.cart.view.Category",
      "metadata": "sap.m.Title",
      "id": "*page-title"
    }
  };
  it("Execution and Verification", async function () {
    await ui5.common.navigation.navigateToApplicationAndRetryRefresh(scannerIntent, false);

    await ui5.common.assertion.expectUrlToBe(`${browser.config.baseUrl}#${scannerIntent}`);
    await ui5.common.assertion.expectToBeVisible(selector);
    await ui5.common.assertion.expectAttributeToBe(selector, "text", "Scanners");

    await ui5.common.navigation.navigateToApplicationAndRetryRefresh(graphicsCardIntent, false);

    await ui5.common.assertion.expectUrlToBe(`${browser.config.baseUrl}#${graphicsCardIntent}`);
    await ui5.common.assertion.expectToBeVisible(selector);
    await ui5.common.assertion.expectAttributeToBe(selector, "text", "Graphics Card");
  });
});

describe("navigation - navigateToApplicationAndRetryRefresh wrong navigation intent type in url with/without verification(unhappy case)", function () {
  const wrongApplication = { strange: "intent" };
  const application = "Shell-home";

  it("Preparation", async function () {
    browser.config.baseUrl = "https://qs9-715.wdf.sap.corp/ui";
  });

  it("Execution and Verification", async function () {
    await ui5.common.navigation.navigateToApplicationAndRetryRefresh(application, true);
    await ui5.common.session.loginFiori("PURCHASER");

    await ui5.common.navigation.navigateToApplicationAndRetryRefresh(wrongApplication, false, false); // verify = false
    const currentUrl = await browser.getUrl();
    // first navigate to 'https://qs9-715.wdf.sap.corp/ui#%5Bobject%20Object%5D'
    // later, in a second, navigate to 'https://qs9-715.wdf.sap.corp/ui#Shell-home'
    // Cannot test the intent inside the url, because it changes too fast in case of wrong intent
    expect(currentUrl).toContain(browser.config.baseUrl); // check you are still at the qs9-715 page

    await expect(ui5.common.navigation.navigateToApplicationAndRetryRefresh(wrongApplication, false)) // verify = true by default
      .rejects.toThrow(/Navigation failed/);
  });
});


const selectorForErrorPopupText = {
  "elementProperties": {
    "metadata": "sap.m.Text",
    "ancestorProperties": {
      "elementProperties": {
        "metadata": "sap.m.Dialog",
        "type": "Message",
        "state": "Error"
      }
    }
  }
};