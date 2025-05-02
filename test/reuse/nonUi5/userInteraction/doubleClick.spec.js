"use strict";

const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - Double click on Switch button", async function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Select/sample/sap.m.sample.Select");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await util.browser.sleep(5000);
    const elem = await nonUi5.element.getByCss("SECTION:nth-child(2) > DIV:nth-child(1) > DIV:nth-child(2) > DIV:nth-child(1) > DIV:nth-child(2) > DIV:nth-child(1) > DIV:nth-child(1)");
    await nonUi5.userInteraction.doubleClick(elem);
  });

  it("Verification", async function () {
    await util.browser.sleep(5000);
    const elem = await nonUi5.element.getByCss("DIV[class='sapMSlt sapMSltDefault sapMSltMinWidth sapMSltHoverable sapMSltWithArrow']");
    await nonUi5.assertion.expectToBeVisible(elem);
  });
});