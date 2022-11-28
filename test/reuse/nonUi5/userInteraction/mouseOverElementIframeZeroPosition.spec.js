"use strict";

describe("userInteraction - mouseOverElement inside iframe at zero position", function() {
  let location;
  it("Preparation", async function() {
    await common.navigation.navigateToUrl("http://localhost:34005/buttonsInIframeZeroPosition.html");
    await util.browser.switchToIframe("IFRAME[id='buttonsIframe']");
  });

  it("Execution", async function() {
    const elem = await nonUi5.element.getById("Default");
    await nonUi5.userInteraction.mouseOverElement(elem);
  });

  it("Verification", async function () {
    const script = "return document.getElementById('Default').matches(':hover')";
    const isHover = await util.browser.executeScript(script);
    await common.assertion.expectTrue(isHover);
  });

});