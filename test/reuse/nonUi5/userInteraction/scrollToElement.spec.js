"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - scrollToElement", function () {
  let elem;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/#/api");
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

describe("locator - scrollToElement - wrong element (error case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon_dark#/categories");
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    await expect(nonUi5.userInteraction.scrollToElement("*=Legal Disclosure")).rejects.toThrow("Function 'scrollToElement' failed with: element.scrollIntoView is not a function");
  });
});
