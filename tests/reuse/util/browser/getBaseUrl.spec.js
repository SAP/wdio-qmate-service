"use strict";

describe("browser - getBaseUrl", function () {
  let baseUrl;
  it("Execution", async function () {
    baseUrl = await util.browser.getBaseUrl();
  });

  it("Verification", () => {
    const expectedUrl = "https://sapui5.hana.ondemand.com/";
    common.assertion.expectEqual(baseUrl, expectedUrl);
  });
});