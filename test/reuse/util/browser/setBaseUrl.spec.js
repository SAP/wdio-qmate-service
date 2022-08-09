"use strict";

describe("browser - setBaseUrl", function () {
  const urlToSet = "https://sapui5.hana.ondemand.com/1.99.0/";
  it("Execution", async function () {
    await util.browser.setBaseUrl("https://sapui5.hana.ondemand.com/1.99.0/");
  });

  it("Verification", async function() {
    const currentBaseUrl = await util.browser.getBaseUrl();
    common.assertion.expectEqual(urlToSet, currentBaseUrl);
  });
});