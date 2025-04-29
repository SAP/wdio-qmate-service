const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - moveCursorAndClick - chart tests", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.viz.ui5.controls.VizFrame/sample/sap.viz.sample.Donut");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const elem = await nonUi5.element.getByCss("g:nth-child(1) > g:nth-child(7)");
    await nonUi5.userInteraction.moveCursorAndClick(elem);
  });

  it("Verification", async function () {
    const selector = {
      elementProperties: {
        metadata: "sap.viz.ui5.controls.chartpopover.ContentPanel"
      }
    };
    await ui5.element.getDisplayed(selector);
  });
});
