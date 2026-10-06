"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");

describe("browser - closeWindow", function () {
  const sapWindowUrl = `${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories`;
  let originalWindowHandle;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(sapWindowUrl);
    originalWindowHandle = await util.browser.getCurrentWindow();
    await browser.newWindow(sapWindowUrl);
    const windowHandlesBefore = await browser.getWindowHandles();
    await common.assertion.expectEqual(windowHandlesBefore.length, 2);
  });

  it("Execution", async function () {
    await util.browser.closeWindow();
  });

  it("Verification", async function () {
    await util.browser.switchToWindow(originalWindowHandle);
    const windowHandlesAfter = await browser.getWindowHandles();
    await common.assertion.expectEqual(windowHandlesAfter.length, 1);
  });
});

describe("browser - closeWindow (last tab)", function () {
  const sapWindowUrl = `${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories`;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(sapWindowUrl);
    const windowHandles = await browser.getWindowHandles();
    await common.assertion.expectEqual(windowHandles.length, 1);
  });

  it("Execution & Verification", async function () {
    await util.browser.closeWindow();
    await expect(browser.getWindowHandles()).rejects.toThrow(/invalid session id/);
  });
});
