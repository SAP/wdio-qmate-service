"use strict";

const { handleCookiesConsent } = require("../../../utils");

describe("assertion - isPresentByXPath", function () {

  let linkBtn;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    linkBtn = "//span[contains(text(),'API Reference')]";
    const isPresented = await nonUi5.assertion.isPresentByXPath(linkBtn);
    common.assertion.expectTrue(isPresented);
  });
});

describe("assertion - isPresentByXPath with wrong selector and catch error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const isPresented = await nonUi5.assertion.isPresentByXPath("//span[contains(text(),'Wrong Text')]");
    common.assertion.expectFalse(isPresented);
  });
});
