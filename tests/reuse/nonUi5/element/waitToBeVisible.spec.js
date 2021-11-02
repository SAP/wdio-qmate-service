const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("locator - waitToBeVisible", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    await nonUi5.element.waitToBeVisible("[id='sdk---app--changeVersionButton-BDI-content']", 40000);
  });
});

describe("locator - waitToBeVisible and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.waitToBeVisible("[class='sapMBtnBase sapMBtn sapMBtnInverted sapMDialogBeginButton sapMBarChild']", 1000))
      .rejects.toThrow("Function 'waitToBeVisible' failed");
  });
});