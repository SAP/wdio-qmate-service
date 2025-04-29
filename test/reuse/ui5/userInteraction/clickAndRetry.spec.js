const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - click and retry", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.App",
        metadata: "sap.m.IconTabFilter",
        id: "*apiMasterTab"
      }
    };
    const index = 0;
    const timeout = 30000;
    const retries = 1;
    const interval = 2000;
    await ui5.userInteraction.clickAndRetry(selector, index, timeout, retries, interval);
  });

  it("Verification", async function () {
    await common.assertion.expectUrlToBe("https://sapui5.hana.ondemand.com/#/api");
  });
});

describe("userInteraction - click and retry on not displayed element", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/");
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.ui.documentation.sdk.view.ApiDetailInitial",
        metadata: "sap.ui.documentation.TitleLink",
        text: "Main Controls"
      }
    };
    const index = 0;
    const timeout = 30000;
    const retries = 3;
    const interval = 3000;
    await expect(ui5.userInteraction.clickAndRetry(selector, index, timeout, retries, interval)).rejects.toThrow(
      "Function 'clickAndRetry' failed with: Retries done. Failed to execute the function:"
    );
  });
});
