"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

const enabledSelector = "input#__xmlview0--InputEdit-inner";
const disabledSelector = "input#__xmlview0--InputDisabled-inner";

describe("element - isEnabled - enabled element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputStates");
    await handleCookiesConsent();
    await util.browser.switchToIframe("iframe[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const enabledElement = await nonUi5.element.getByCss(enabledSelector);
    const isEnabled = await nonUi5.element.isEnabled(enabledElement);
    await common.assertion.expectTrue(isEnabled);
  });
});

describe("element - isEnabled - disabled element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputStates");
    await handleCookiesConsent();
    await util.browser.switchToIframe("iframe[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const disabledElement = await nonUi5.element.getByCss(disabledSelector);
    const isEnabled = await nonUi5.element.isEnabled(disabledElement);
    await common.assertion.expectFalse(isEnabled);
  });
});

const errorRegexp = /Expected.*true.*|Received.*false/;

describe("element - isEnabled - element - error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Input/sample/sap.m.sample.InputStates");
    await handleCookiesConsent();
    await util.browser.switchToIframe("iframe[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const inputElement = await nonUi5.element.getByCss(disabledSelector);
    const isEnabled = await nonUi5.element.isEnabled(inputElement);
    await expect(() => common.assertion.expectTrue(isEnabled)).toThrow(errorRegexp);
  });
});
