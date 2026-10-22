"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");

describe("browser - getCurrentWindow", function () {
  const sapWindowUrl = `${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories`;
  let sapWindowHandleNative;
  let sapWindowHandleCustom;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(sapWindowUrl);
    await expect(browser.getTitle()).resolves.toEqual("Shopping Cart");
  });

  it("Execution and Verification", async function () {
    sapWindowHandleNative = await browser.getWindowHandle();
    sapWindowHandleCustom = await util.browser.getCurrentWindow();

    await expect(typeof sapWindowHandleCustom).toBe("string");
    await common.assertion.expectEqual(sapWindowHandleNative, sapWindowHandleCustom);
  });
});

describe("browser - getCurrentWindow (unhappy case)", function () {
  const sapWindowUrl = `${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories`;
  let sapWindowHandleCustom;

  const wdioWindowUrl = "https://webdriver.io/";
  let wdioWindowHandleCustom;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(sapWindowUrl);
  });

  it("Execution and Verification", async function () {
    sapWindowHandleCustom = await util.browser.getCurrentWindow();

    const newWindowContext = await browser.newWindow(wdioWindowUrl);
    // In wdio v10 BiDi, newWindow does not auto-switch; get new handle from context
    const newHandle = newWindowContext?.contextId ?? newWindowContext?.handle;
    if (newHandle) {
      await browser.switchToWindow(newHandle);
    }

    wdioWindowHandleCustom = await util.browser.getCurrentWindow();

    await common.assertion.expectUnequal(wdioWindowHandleCustom, sapWindowHandleCustom);
  });
});
