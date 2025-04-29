"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("element - getByCssContainingText - non strict", function () {
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

describe("element - getByCssContainingText - strict", function () {
  let downloadBtn;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    downloadBtn = await nonUi5.element.getByCssContainingText("[id='sdk---welcome--readMoreButton-BDI-content']", "Download", 0, 30000, false, true);
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(downloadBtn, 10000);
    const text = await downloadBtn.getText();
    await common.assertion.expectTrue(text.match(/Download/) !== null);
  });
});

describe("element - getByCssContainingText - strict error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    expect(nonUi5.element.getByCssContainingText("[id='sdk---welcome--readMoreButton-BDI-content']", "Down", 0, 30000, false, true)).rejects.toThrow(
      /getByCssContainingText(): Element \w*|\d* not found/
    );
  });
});

describe("element - getByCssContainingText - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.element.getByCssContainingText("[id='sdk---welcome--readMoreButton-BDI-content']", "Some Junk Text")).rejects.toThrow(
      `Function 'getByCssContainingText' failed with: Element with CSS '[id='sdk---welcome--readMoreButton-BDI-content']' and text 'Some Junk Text' not found.`
    );
  });
});
