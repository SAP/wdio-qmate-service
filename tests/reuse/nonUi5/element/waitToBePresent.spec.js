const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("locator - waitToBePresent", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await nonUi5.element.waitToBePresent("[id='sdk---app--changeVersionButton-BDI-content']", 40000);
  });
});

describe("locator - waitToBePresent with wrong selector (unhappy case)", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.waitToBePresent("[class='sapMBtnBase sapMBtn sapMBtnInverted sapMDialogBeginButton sapMBarChild']", 1000))
      .rejects.toThrow("Function 'waitToBePresent' failed");
  });
});