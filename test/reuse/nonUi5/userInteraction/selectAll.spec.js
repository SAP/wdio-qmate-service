"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - selectAll - Input", function () {
  const selector = "input[class='sapMInputBaseInner']";
  
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview`);
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await nonUi5.userInteraction.selectAll(selector);
    await common.userInteraction.pressBackspace();
    await common.userInteraction.pressEnter();
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectValueToBe(selector, "");
  });
});