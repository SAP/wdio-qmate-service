"use strict";

describe("navigation - navigateToApplicationAndRetryRefresh (s4)", function () {
  it("Preparation", async function () {
    await ui5.common.navigation.navigateToApplicationAndRetryRefresh("Shell-home", false);
  });

  it("Execution", async function () {
    await ui5.common.navigation.navigateToApplicationAndRetryRefresh("PurchaseOrder-manage", false);
  });

  it("Verification", async function () {
    // Note: currentUrl can contain system specific query params
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("#PurchaseOrder-manage");
    expect(currentUrl).toContain(browser.config.baseUrl);
  });

  it("Clean Up", async function () {

    // Reset baseUrl from config file
    browser.config.baseUrl = "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html";
  });
});

describe("navigation - navigateToApplicationAndRetryRefresh (demo url)", function () {
  const scannerIntent = "/category/SC";
  const graphicsCardIntent = "/category/GC";

  it("Execution and Verification", async function () {
    await ui5.common.navigation.navigateToApplicationAndRetryRefresh(scannerIntent, false);

    await ui5.common.assertion.expectUrlToBe(`${browser.config.baseUrl}#${scannerIntent}`);

    await ui5.common.navigation.navigateToApplicationAndRetryRefresh(graphicsCardIntent, false);

    await ui5.common.assertion.expectUrlToBe(`${browser.config.baseUrl}#${graphicsCardIntent}`);
  });
});

describe("navigation - navigateToApplicationAndRetryRefresh wrong navigation intent type in url with/without verification(unhappy case)", function () {
  const wrongApplication = { strange: "intent" };
  const application = "Shell-home";

  it("Preparation", async function () {
    browser.config.baseUrl = "http://localhost:34099/ui";
  });

  it("Execution and Verification", async function () {
    await ui5.common.navigation.navigateToApplicationAndRetryRefresh(application, false);

    await ui5.common.navigation.navigateToApplicationAndRetryRefresh(wrongApplication, false, false); // verify = false
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(browser.config.baseUrl); // check you are still at the qs9-715 page

    await expect(ui5.common.navigation.navigateToApplicationAndRetryRefresh(wrongApplication, false)) // verify = true by default
      .rejects.toThrow(/Navigation failed/);
  });
});
