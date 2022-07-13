"use strict";

describe("browser - switchToNewWindow", function () {
  const sapWindowUrl = "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories";
  const sapTitle = "Shopping Cart";

  const wdioWindowUrl = "https://webdriver.io/docs/gettingstarted/";
  const wdioTitle = "Getting Started | WebdriverIO";

  let currentWindowHandle;
  let currentUrl;

  it("Preparation", async function () {
    // Check titles to use them later
    await common.navigation.navigateToUrl(sapWindowUrl);
    await expect(browser.getTitle()).resolves.toEqual(sapTitle);

    await browser.newWindow(wdioWindowUrl);
    await expect(browser.getTitle()).resolves.toEqual(wdioTitle);

    // First switch to 'sap' window. We assume that we are on WDIO page
    currentWindowHandle = await util.browser.getCurrentWindow();
    currentUrl = await browser.getUrl();
    await common.assertion.expectEqual(currentUrl, wdioWindowUrl);
  });

  it("Execution and Verification", async function () {
    // First switch to 'sap' window
    await util.browser.switchToNewWindow();
    await expect(browser.getTitle()).resolves.toEqual(sapTitle);

    // Check window handle
    currentWindowHandle = await util.browser.getCurrentWindow();
    await util.browser.switchToNewWindow();
    await expect(browser.getTitle()).resolves.toEqual(wdioTitle);
  });
});

describe("browser - switchToNewWindow (unhappy case)", function () {
  const sapWindowUrl = "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(sapWindowUrl);
  });

  it("Execution and Verification", async function () {
    const currentWindowHandleBefore = await util.browser.getCurrentWindow();

    await expect(util.browser.switchToNewWindow("Wrong Title"))
      .rejects.toThrow(/Function 'switchToNewWindow' failed after \d+ retries./);

    const currentWindowHandleAfter = await util.browser.getCurrentWindow();
    await common.assertion.expectEqual(currentWindowHandleAfter, currentWindowHandleBefore);
  });
});