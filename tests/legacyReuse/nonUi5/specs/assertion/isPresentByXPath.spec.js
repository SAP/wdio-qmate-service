"use strict";

const { handleCookiesConsent } = require("../../../../helper/utils");

describe("assertion - isPresentByXPath", function () {

  let linkBtn;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    linkBtn = "//span[contains(text(),'API Reference')]";
    const isPresented = await non_ui5.common.assertion.isPresentByXPath(linkBtn);
    non_ui5.common.assertion.expectTrue(isPresented);
  });
});

describe("assertion - isPresentByXPath with wrong selector and catch error", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const isPresented = await non_ui5.common.assertion.isPresentByXPath("//span[contains(text(),'Wrong Text')]");
    non_ui5.common.assertion.expectFalse(isPresented);
  });
});
