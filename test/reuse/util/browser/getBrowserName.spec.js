"use strict";

describe("browser - getBrowserName", function () {

  let browserName;

  it("Execution", async function () {
    await browser.navigateTo(browser.config.baseUrl);
    browserName = await util.browser.getBrowserName();
  });

  it("Verification", async function () {
    const valueAct = browserName;
    const valueExp = "chrome";
    await expect(valueAct).toContain(valueExp);
  });

});