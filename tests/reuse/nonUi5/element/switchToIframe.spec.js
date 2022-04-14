"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("element - switchToIframe + expectToBeVisible", function () {

  let elem;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    elem = await $("iframe[id='outputWindow']");
    await nonUi5.userInteraction.scrollToElement(elem);
    await nonUi5.element.switchToIframe("iframe[id='outputWindow']");
  });
});

describe("element - switchToIframe and catch error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const elem = await $("iframe[id='outputWindow']");
    await nonUi5.userInteraction.scrollToElement(elem);
    await expect(nonUi5.element.switchToIframe("iframe[id='outWindow']"))
      .rejects.toThrow("Expected element not visible for selector 'iframe[id='outWindow']'");
  });
});
