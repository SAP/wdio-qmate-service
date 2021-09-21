"use strict";

describe("locator - switchToWindow", function () {
  const sapWindowUrl = "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories";
  let sapWindowHandle;
  const wdioWindowUrl = "https://webdriver.io/";
  let wdioWindowHandle;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(sapWindowUrl);
    sapWindowHandle = await browser.getWindowHandle();
    await expect(browser.getTitle()).resolves.toEqual("Shopping Cart");

    await browser.newWindow(wdioWindowUrl);
    wdioWindowHandle = await browser.getWindowHandle();
    await expect(browser.getTitle()).resolves.toMatch(/WebdriverIO/);
  });

  it("Execution and Verification", async function () {
    // First 'sap' window
    await nonUi5.element.switchToWindow(sapWindowHandle);
    await expect(browser.getTitle()).resolves.toEqual("Shopping Cart");

    let currentWindowHandle = await nonUi5.element.getCurrentWindow();
    await ui5.common.assertion.expectEqual(sapWindowHandle, currentWindowHandle); //compare reuse and native single handle

    let currentUrl = await browser.getUrl();
    await ui5.common.assertion.expectEqual(currentUrl, sapWindowUrl);

    // Second 'wdio' window
    await nonUi5.element.switchToWindow(wdioWindowHandle);
    await expect(browser.getTitle()).resolves.toMatch(/WebdriverIO/);

    currentWindowHandle = await nonUi5.element.getCurrentWindow();
    await ui5.common.assertion.expectEqual(wdioWindowHandle, currentWindowHandle); //compare reuse and native single handle

    currentUrl = await browser.getUrl();
    await ui5.common.assertion.expectEqual(currentUrl, wdioWindowUrl);
  });
});

describe("locator - switchToWindow (unhappy case)", function () {
  const sapWindowUrl = "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories";

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(sapWindowUrl);
  });

  it("Execution and Verification", async function () {
    const windowHandles = await browser.getWindowHandles(); // returns array of handles

    await nonUi5.element.switchToWindow(windowHandles[0]);

    await expect(nonUi5.element.switchToWindow())
      .rejects.toThrow(/Malformed type for "handle" parameter of command switchToWindow/);
  });
});


