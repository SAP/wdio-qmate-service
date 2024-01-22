"use strict";

describe("userInteraction - mouseOverElement", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution", async function () {
    const elem = await nonUi5.element.getById("Default");
    const index = 0;
    await nonUi5.userInteraction.mouseOverElement(elem, index);
  });

  it("Verification", async function () {
    const script = "return document.getElementById('Default').matches(':hover')";
    const isHover = await util.browser.executeScript(script);
    await common.assertion.expectTrue(isHover);
  });
});

describe("userInteraction - mouseOverElement - wrong selector", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution & Verification", async function () {
    const elem = undefined;
    const index = 0;
    await expect(nonUi5.userInteraction.mouseOverElement(elem, index)).rejects.toThrow("Function 'mouseOverElement' failed with: Please provide an element or a CSS selector as first argument.");
  });
});
