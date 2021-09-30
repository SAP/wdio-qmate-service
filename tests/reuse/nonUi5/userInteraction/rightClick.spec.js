const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - rightClick (happy case)", async function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.TextArea/sample/sap.m.sample.TextArea");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const elem = await nonUi5.element.getElementByCss("TEXTAREA");
    await nonUi5.userInteraction.rightClick(elem);
  });
});