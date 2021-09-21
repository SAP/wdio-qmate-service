"use strict";
const { handleCookiesConsent } = require("../../../utils");

describe("locator - getElementById + expectToBeVisible", function () {

  let downloadBtn;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    downloadBtn = await non_ui5.common.locator.getElementById("sdk---app--apiMasterTab-text");
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectToBeVisible(downloadBtn, 10000);
  });
});

describe("locator - getElementById and catch error", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.locator.getElementById("sdk---app--apiTab-text"))
      .rejects.toThrow(`getElementById(): Element with id "sdk---app--apiTab-text" not found.`);
  });
});
