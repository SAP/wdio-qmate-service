"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");

describe("browser - closeWindow", function () {
  const sapWindowUrl = `${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories`;
  let originalWindowHandle;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl(sapWindowUrl);
    originalWindowHandle = await util.browser.getCurrentWindow();
    const newWindowContext = await browser.newWindow(sapWindowUrl);
    // In wdio v10 BiDi, newWindow does not auto-switch; explicitly switch to new context
    const newHandle = newWindowContext?.contextId ?? newWindowContext?.handle;
    if (newHandle) {
      await browser.switchToWindow(newHandle);
    }
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

  it("Execution (last tab)", async function () {
    // wdio v10 BiDi: closing the last tab immediately ends the session and throws;
    // wdio v8: closeWindow() succeeds, the session ends lazily.
    try {
      await util.browser.closeWindow();
    } catch (e) {
      if (!/All window handles were removed|invalid session id/i.test(e.message)) throw e;
    }
  });

  it("Verification (last tab)", async function () {
    // After the last tab is closed the session is gone — any browser call should reject.
    await expect(browser.getWindowHandles()).rejects.toThrow(/invalid session id|All window handles were removed/);
  });
});
