const { handleCookiesConsent } = require("../../../../helper/utils");

describe("chart tests", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.viz.ui5.controls.VizFrame/sample/sap.viz.sample.Donut");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const elem = await non_ui5.common.locator.getElementByCss("g:nth-child(1) > g:nth-child(7)");
    await non_ui5.common.userInteraction.clickChartPart(elem);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "metadata": "sap.viz.ui5.controls.chartpopover.ContentPanel"
      }
    };
    await ui5.common.locator.getDisplayedElement(selector);
  });

});