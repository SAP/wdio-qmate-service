"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("locator - scrollToElement", function () {

  let elem;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/api");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    elem = await $("*=Legal Disclosure");
    const isDisplayedInViewport = await elem.isDisplayedInViewport();
    await common.assertion.expectFalse(isDisplayedInViewport);
    await nonUi5.element.scrollToElement(elem);
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(elem, 10000);
  });
});

describe("locator - scrollToElement with wrong element (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.scrollToElement("*=Legal Disclosure"))
      .rejects.toThrow(/elem.scrollIntoView is not a function/);
  });
});
