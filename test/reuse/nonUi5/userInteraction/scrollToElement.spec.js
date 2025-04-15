"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - scrollToElement - default alignment options", function () {
  let elem;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/api");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    elem = await $("*=Legal Disclosure");
    const isDisplayedInViewport = await elem.isDisplayedInViewport();
    await common.assertion.expectFalse(isDisplayedInViewport);
    await nonUi5.userInteraction.scrollToElement(elem);
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(elem, 10000);
  });
});

describe("userInteraction - scrollToElement - alignment is center", function () {
  let elem, alignment;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/api");
    await handleCookiesConsent();
    await browser.setWindowSize(1200, 800);
  });

  it("Execution", async function () {
    elem = await $("*=Legal Disclosure");
    alignment = "center";
    const isDisplayedInViewport = await elem.isDisplayedInViewport();
    await common.assertion.expectFalse(isDisplayedInViewport);
    await nonUi5.userInteraction.scrollToElement(elem, alignment);
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(elem, 10000);
  });
});

describe("locator - scrollToElement - wrong element (error case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3#/categories");
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.userInteraction.scrollToElement("*=Legal Disclosure")).rejects.toThrow("Function 'scrollToElement' failed with: Element with CSS '*=Legal Disclosure' not found.");
  });
});
