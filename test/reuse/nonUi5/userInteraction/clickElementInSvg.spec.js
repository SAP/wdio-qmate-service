"use strict";

const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - clickElementInSvg - UI5 SVG Chart", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.suite.ui.commons.ChartContainer/sample/sap.suite.ui.commons.sample.ChartContainerToolbarEnhancement");
    await handleCookiesConsent();
    await util.browser.sleep(5000);
  });

  it("Execution", async function () {
    await util.browser.switchToIframe("IFRAME[id='sampleFrame']");
    const svgElem = await nonUi5.element.getByCss("svg");
    const innerSelector = "g[data-id='4']";
    await nonUi5.userInteraction.clickElementInSvg(svgElem, innerSelector);
  });

  it("Verification", async function () {
    const isPresent = await nonUi5.element.isPresentByCss("path[fill-opacity='1']");
    await common.assertion.expectTrue(isPresent);
  });

});