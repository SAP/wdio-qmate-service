const {
  handleCookiesConsent
} = require("../../utils");

describe("locator - waitForElementIsPresent", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await nonUi5.element.waitForElementIsPresent("[id='sdk---app--changeVersionButton-BDI-content']", 40000);
  });
});

describe("locator - waitForElementIsPresent with wrong selector (unhappy case)", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.waitForElementIsPresent("[class='sapMBtnBase sapMBtn sapMBtnInverted sapMDialogBeginButton sapMBarChild']", 1000))
      .rejects.toThrow("Function 'waitForElementIsPresent' failed");
  });
});