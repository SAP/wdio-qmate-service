"use strict";


describe("browser - getCurrentWindow", function () {
  it("Execution and Verification", async function () {
    const allWindowsDescriptors = await browser.getWindowHandles();
    const windowDescriptor = await util.browser.getCurrentWindow();
    expect(allWindowsDescriptors.includes(windowDescriptor)).toBeTruthy();
  });
});