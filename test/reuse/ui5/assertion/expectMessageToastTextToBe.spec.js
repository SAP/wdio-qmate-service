"use strict";
const {
  handleCookiesConsent
} = require("../../../helper/utils");

describe("assertion - expectMessageToastTextToBe - no message toast (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageToast/sample/sap.m.sample.MessageToast");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const text = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\r\n eirmod.";
    await browser.keys("Escape"); // To skip Cookie Consent
    await expect(ui5.assertion.expectMessageToastTextToBe(text, 3000))
      .rejects.toThrow(/Element with XPath/);
  });
});

describe("assertion - expectMessageToastTextToBe", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.MessageToast/sample/sap.m.sample.MessageToast");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selector = {
      "elementProperties": {
        "viewName": "sap.m.sample.MessageToast.view.MessageToast",
        "metadata": "sap.m.Button"
      }
    };
    await browser.keys("Escape"); // To skip Cookie Consent
    await ui5.userInteraction.click(selector);
  });

  it("Verification", async function () {
    await ui5.assertion.expectMessageToastTextToBe("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\r\n eirmod.", 3000);
    await ui5.assertion.expectMessageToastTextToBe("Lorem ipsum", 3000);
    await expect(ui5.assertion.expectMessageToastTextToBe("Wrong text", 3000))
      .rejects.toThrow(/Element with XPath/);
  });
});