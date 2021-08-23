"use strict";
const { handleCookiesConsent } = require("../../../../utils");

describe("locator - getElementByCssContainingText + expectToBeVisible", function () {

  let downloadBtn;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    downloadBtn = await non_ui5.common.locator.getElementByCssContainingText("[id='sdk---welcome--readMoreButton-BDI-content']", "Down");
  });

  it("Verification", async function () {
    await non_ui5.common.assertion.expectToBeVisible(downloadBtn, 10000);
  });
});

describe("locator - getElementByCssContainingText and catch error", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.locator.getElementByCssContainingText("[id='sdk--readMoreButton-BDI-content']"))
      .rejects.toThrow(/getElementByCssContainingText(): Element \w*|\d* not found/);
  });
});
