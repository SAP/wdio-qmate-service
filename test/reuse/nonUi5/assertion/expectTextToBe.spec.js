"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

const xpath = "//*[contains(text(),'Hide Filter Bar')]";
const cssSelector = "#__xmlview0--smartFilterBar-btnShowHide-BDI-content";
const compareValue = "Hide Filter Bar";
const wrongValue = "Show Filter Bar";

describe("assertion - expectTextToBe - element", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution and Verification", async function () {
    await nonUi5.element.waitForAll(xpath, 10000);
    const buttonElement = await nonUi5.element.getByXPath(xpath);
    await nonUi5.assertion.expectTextToBe(buttonElement, compareValue);
  });
});

describe("assertion - expectTextToBe - selector", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution and Verification", async function () {
    await nonUi5.element.waitForAll(cssSelector, 10000);
    await nonUi5.assertion.expectTextToBe(cssSelector, compareValue);
  });
});

const errorRegexp = /Expected.*Show.*|Received.*Hide/;

describe("assertion - expectTextToBe - element - error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution and Verification", async function () {
    await nonUi5.element.waitForAll(xpath, 10000);
    const buttonElement = await nonUi5.element.getByXPath(xpath);
    await expect(nonUi5.assertion.expectTextToBe(buttonElement, wrongValue)).rejects.toThrow(errorRegexp);
  });
});

describe("assertion - expectTextToBe - selector - error", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smarttable.SmartTable/sample/sap.ui.comp.sample.smarttable");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution and Verification", async function () {
    await nonUi5.element.waitForAll(cssSelector, 10000);
    await expect(nonUi5.assertion.expectTextToBe(cssSelector, wrongValue)).rejects.toThrow(errorRegexp);
  });
});
