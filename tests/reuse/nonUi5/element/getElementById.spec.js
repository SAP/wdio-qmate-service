"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("locator - getElementById + expectToBeVisible", function () {

  let downloadBtn;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    downloadBtn = await nonUi5.element.getById("sdk---app--apiMasterTab-text");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(downloadBtn, 10000);
  });
});

describe("locator - getElementById and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.getById("sdk---app--apiTab-text"))
      .rejects.toThrow("Function 'getElementById' failed");
  });
});