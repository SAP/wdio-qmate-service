const { handleCookiesConsent } = require("../../../utils");

describe("locator - waitForElementIsPresent", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await non_ui5.common.locator.waitForElementIsPresent("[id='sdk---app--changeVersionButton-BDI-content']", 40000);
  });
});

describe("locator - waitForElementIsPresent with wrong selector (unhappy case)", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.locator
      .waitForElementIsPresent("[class='sapMBtnBase sapMBtn sapMBtnInverted sapMDialogBeginButton sapMBarChild']", 1000))
      .rejects.toThrow("waitForElementIsPresent(): Timeout by waiting for element");
  });
});
