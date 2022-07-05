"use strict";

describe("element - getCurrentWindow", function () {
  const sapWindowUrl = "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories";
  let sapWindowHandleNative;
  let sapWindowHandleCustom;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(sapWindowUrl);
    await expect(browser.getTitle()).resolves.toEqual("Shopping Cart");
  });

  it("Execution & Verification", async function () {
    sapWindowHandleNative = await browser.getWindowHandle();
    sapWindowHandleCustom = await util.browser.getCurrentWindow();

    await expect(typeof sapWindowHandleCustom).toBe("string");
    await common.assertion.expectEqual(sapWindowHandleNative, sapWindowHandleCustom);
  });
});

describe("element - getCurrentWindow (unhappy case)", function () {
  const sapWindowUrl = "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories";
  let sapWindowHandleCustom;

  const wdioWindowUrl = "https://webdriver.io/";
  let wdioWindowHandleCustom;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(sapWindowUrl);
  });

  it("Execution & Verification", async function () {
    sapWindowHandleCustom = await util.browser.getCurrentWindow();

    await browser.newWindow(wdioWindowUrl);

    wdioWindowHandleCustom = await util.browser.getCurrentWindow();

    await common.assertion.expectUnequal(wdioWindowHandleCustom, sapWindowHandleCustom);
  });
});