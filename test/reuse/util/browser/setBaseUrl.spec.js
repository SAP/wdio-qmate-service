"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.js");

describe("browser - setBaseUrl", function () {
  const urlToSet = `${BASE_URL}/`;
  it("Execution", async function () {
    await util.browser.setBaseUrl(`${BASE_URL}/`);
  });

  it("Verification", async function() {
    const currentBaseUrl = await util.browser.getBaseUrl();
    common.assertion.expectEqual(urlToSet, currentBaseUrl);
  });
});