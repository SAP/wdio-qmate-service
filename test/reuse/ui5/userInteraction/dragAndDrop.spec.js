const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - dragAndDrop", function () {

  const sourceSelector = {
    "elementProperties": {
      "viewName": "sap.f.sample.GridListDragAndDrop.V",
      "metadata": "sap.f.GridListItem",
      "bindingContextPath": "/items/0"
    }
  };

  const targetSelector = {
    "elementProperties": {
      "viewName": "sap.f.sample.GridListDragAndDrop.V",
      "metadata": "sap.f.GridListItem",
      "bindingContextPath": "/items/5"
    }
  };

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/sdk/#/entity/sap.f.GridList/sample/sap.f.sample.GridListDragAndDrop");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    await ui5.userInteraction.dragAndDrop(sourceSelector, targetSelector, 0, 0, 1000);
  });

  it("Verification", async function () {
    // TODO
  });
});

