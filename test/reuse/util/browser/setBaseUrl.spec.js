"use strict";

describe("browser - setBaseUrl", function () {
  const urlToSet = "https://ui5.sap.com/";
  it("Execution", async function () {
    await util.browser.setBaseUrl("https://ui5.sap.com/");
  });

  it("Verification", async function() {
    const currentBaseUrl = await util.browser.getBaseUrl();
    common.assertion.expectEqual(urlToSet, currentBaseUrl);
  });
});