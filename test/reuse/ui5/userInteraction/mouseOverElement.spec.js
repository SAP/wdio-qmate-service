"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - mouseOverElement", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Button/sample/sap.m.sample.Button");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.Button.Page",
        metadata: "sap.m.Button",
        text: "Accept"
      }
    };
    const index = 0;
    const timeout = 30000;
    await ui5.userInteraction.mouseOverElement(selector, index, timeout);
  });

  it("Verification", async function () {
    const script =
      "return document.getElementsByClassName('sapMBtnInner sapMBtnHoverable sapMFocusable sapMBtnText sapMBtnAccept')[0].matches(':hover')";
    const isHover = await util.browser.executeScript(script);
    await common.assertion.expectTrue(isHover);
  });
});

describe("userInteraction - mouseOverElement - wrong selector", function () {
  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.m.Button/sample/sap.m.sample.Button");
    await handleCookiesConsent();
    await util.browser.switchToIframe("[id='sampleFrame']");
  });

  it("Execution & Verification", async function () {
    const selector = {
      elementProperties: {
        viewName: "sap.m.sample.Button.Page",
        metadata: "sap.m.Button",
        text: "WRONG"
      }
    };
    const index = 0;
    const timeout = 5000;
    await expect(ui5.userInteraction.mouseOverElement(selector, index, timeout)).rejects.toThrow(
      "Function 'mouseOverElement' failed with: No element found for selector"
    );
  });
});
