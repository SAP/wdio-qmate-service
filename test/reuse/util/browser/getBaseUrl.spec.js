"use strict";
const { BASE_URL } = require("../../../constants.js");

describe("browser - getBaseUrl", function () {
  let baseUrl;
  it("Execution", async function () {
    baseUrl = await util.browser.getBaseUrl();
  });

  it("Verification", () => {
    const expectedUrl = `${BASE_URL}/`;
    common.assertion.expectEqual(baseUrl, expectedUrl);
  });
});