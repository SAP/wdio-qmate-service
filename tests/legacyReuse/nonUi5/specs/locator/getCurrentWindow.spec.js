"use strict";

describe("locator - getCurrentWindow", function () {
  const sapWindowUrl = "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories";
  let sapWindowHandleNative;
  let sapWindowHandleCustom;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl(sapWindowUrl);
    await expect(browser.getTitle()).resolves.toEqual("Shopping Cart");
  });

  it("Execution and Verification", async function () {
    sapWindowHandleNative = await browser.getWindowHandle();
    sapWindowHandleCustom = await non_ui5.common.locator.getCurrentWindow();

    await expect(typeof sapWindowHandleCustom).toBe("string");
    await ui5.common.assertion.expectEqual(sapWindowHandleNative, sapWindowHandleCustom);
  });
});

describe("locator - getCurrentWindow (unhappy case)", function () {
  const sapWindowUrl = "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html#/categories";
  let sapWindowHandleCustom;

  const wdioWindowUrl = "https://webdriver.io/";
  let wdioWindowHandleCustom;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl(sapWindowUrl);
  });

  it("Execution and Verification", async function () {
    sapWindowHandleCustom = await non_ui5.common.locator.getCurrentWindow();

    await browser.newWindow(wdioWindowUrl);

    wdioWindowHandleCustom = await non_ui5.common.locator.getCurrentWindow();

    await ui5.common.assertion.expectUnequal(wdioWindowHandleCustom, sapWindowHandleCustom);
  });
});



