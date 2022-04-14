"use strict";

describe("element - switchToNewWindow", function () {
  const sapWindowUrl = "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories";
  let sapWindowHandle;
  const sapTitle = "Shopping Cart";

  const wdioWindowUrl = "https://webdriver.io/docs/gettingstarted/";
  let wdioWindowHandle;
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
    await util.browser.switchToNewWindow(currentWindowHandle, sapWindowHandle);
    await expect(browser.getTitle()).resolves.toEqual(sapTitle);

    // Check window handler
    currentWindowHandle = await util.browser.getCurrentWindow();
    await util.browser.switchToNewWindow(currentWindowHandle, wdioWindowHandle);
    await expect(browser.getTitle()).resolves.toEqual(wdioTitle);
  });
});

describe("element - switchToWindow (unhappy case)", function () {
  const sapWindowUrl = "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(sapWindowUrl);
  });

  it("Execution and Verification", async function () {
    const currentWindowHandleBefore = await util.browser.getCurrentWindow();

    const windowHandles = await browser.getWindowHandles(); // returns array of handles

    // It raises endless loop if more than one window is opened
    // await util.browser.switchToNewWindow(windowHandles[0], "Wrong Title");

    // No errors, just skip navigation to wrong windows
    await util.browser.switchToNewWindow("Wrong Title");
    await util.browser.switchToNewWindow();

    const currentWindowHandleAfter = await util.browser.getCurrentWindow();
    await common.assertion.expectEqual(currentWindowHandleAfter, currentWindowHandleBefore);
  });
});


