"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("locator - getByCssContainingText + expectToBeVisible", function () {

  let downloadBtn;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    downloadBtn = await nonUi5.element.getByCssContainingText("[id='sdk---welcome--readMoreButton-BDI-content']", "Down");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(downloadBtn, 10000);
    const text = await downloadBtn.getText();
    await common.assertion.expectTrue(text.match(/Down/) !== null);
  });
});

describe("locator - getByCssContainingText and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.getByCssContainingText("[id='sdk---welcome--readMoreButton-BDI-content']","Some Junk Text"))
      .rejects.toThrow(/getByCssContainingText(): Element \w*|\d* not found/);
  });
});