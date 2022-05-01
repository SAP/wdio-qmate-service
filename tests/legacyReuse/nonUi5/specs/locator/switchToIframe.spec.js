"use strict";
const { handleCookiesConsent } = require("../../../../helper/utils");

describe("locator - switchToIframe + expectToBeVisible", function () {

  let elem;

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/1.92.0/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    elem = await $("iframe[id='outputWindow']");
    await non_ui5.common.locator.scrollToElement(elem);
    await non_ui5.common.locator.switchToIframe("iframe[id='outputWindow']");
  });
});

describe("locator - switchToIframe and catch error", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/1.92.0/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const elem = await $("iframe[id='outputWindow']");
    await non_ui5.common.locator.scrollToElement(elem);
    await expect(non_ui5.common.locator.switchToIframe("iframe[id='outWindow']"))
      .rejects.toThrow("Expected element not visible for selector 'iframe[id='outWindow']'");
  });
});
