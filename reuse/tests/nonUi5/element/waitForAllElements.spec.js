"use strict";
const {
  handleCookiesConsent
} = require("../../utils");

// No visible element found. TypeError: elements.filter is not a function
describe("locator - waitForAllElements", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await nonUi5.element.waitForAllElements("[id='sdk---app--changeVersionButton-BDI-content']", 40000);
  });
});

// No visible element found. TypeError: elements.filter is not a function
describe("locator - waitForAllElements and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.waitForAllElements("[class='sapMBtnBase sapMBtn sapMBtnInverted sapMDialogBeginButton sapMBarChild']", 4000))
      .rejects.toThrow("Function 'waitForAllElements' failed");
  });
});