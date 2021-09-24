"use strict";
const { handleCookiesConsent } = require("../../../utils");
describe("assertion - expectMessageToast - no message toast (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageToast/sample/sap.m.sample.MessageToast");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    const text = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\r\n eirmod.";
    await browser.keys("Escape"); // To skip Cookie Consent
    await expect(ui5.common.assertion.expectMessageToastText(text, 3000))
      .rejects.toThrow(/Element with XPath/);
  });
});

describe("assertion - expectMessageToast", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageToast/sample/sap.m.sample.MessageToast");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MessageToast.view.MessageToast",
        "metadata": "sap.m.Button"
      }
    };
    await browser.keys("Escape"); // To skip Cookie Consent
    await ui5.common.userInteraction.click(selector);
  });

  it("Verification", async function () {
    await ui5.common.assertion.expectMessageToastText("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\r\n eirmod.", 3000);
    await ui5.common.assertion.expectMessageToastText("Lorem ipsum", 3000);
    await expect(ui5.common.assertion.expectMessageToastText("Wrong text", 3000))
      .rejects.toThrow(/Element with XPath/);
  });
});