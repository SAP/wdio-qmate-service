"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

// No visible element found. TypeError: elements.filter is not a function
describe("locator - waitForAll", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await nonUi5.element.waitForAll("[id='sdk---app--changeVersionButton-BDI-content']", 40000);
  });
});

// No visible element found. TypeError: elements.filter is not a function
describe("locator - waitForAll and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.waitForAll("[class='sapMBtnBase sapMBtn sapMBtnInverted sapMDialogBeginButton sapMBarChild']", 4000))
      .rejects.toThrow("Function 'waitForAll' failed");
  });
});