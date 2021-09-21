const { handleCookiesConsent } = require("../../../utils");

describe("waitUI5ToStabilize - when busy indicator is on the button should not be clickable", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.BusyDialog/sample/sap.m.sample.BusyDialogLight");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.BusyDialogLight.V",
        "metadata": "sap.m.Button"
      }
    };
    await ui5.common.userInteraction.click(selector, 0, 60000);
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.BusyDialogLight.V",
        "metadata": "sap.m.Button"
      }
    };
    const elem = await ui5.common.locator.getDisplayedElement(selector, 0, 60000);
    await ui5.common.assertion.expectTrue(await elem.isClickable());
  });
});

describe("waitUI5ToStabilize - when busy indicator is on the click method will wait untill is clickable and reclick", function () {

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.BusyDialog/sample/sap.m.sample.BusyDialogLight");
    await handleCookiesConsent();
  });
  
  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.BusyDialogLight.V",
        "metadata": "sap.m.Button"
      }
    };
    await ui5.common.userInteraction.click(selector, 0, 60000);
  });
  
  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.BusyDialogLight.V",
        "metadata": "sap.m.Button"
      }
    };
    const elem = await ui5.common.locator.getDisplayedElement(selector, 0, 60000);
    await non_ui5.common.userInteraction.click(elem);
    ui5.common.assertion.expectFalse(await elem.isClickable());
  });
});