"use strict";

describe("browser - getCurrentWindow", function () {
  let currentWindowDescriptor; 
  let allCurrentWindowsDescriptors;
  it("Execution", async function () {
    currentWindowDescriptor = await util.browser.getCurrentWindow();
    allCurrentWindowsDescriptors = await browser.getWindowHandles();
    await browser.newWindow(browser.config.baseUrl);
  });

  it("Verification", async function () {
    const allCurrentWindowsDescriptorsUpdate = await browser.getWindowHandles();
    await util.browser.switchToNewWindow(currentWindowDescriptor);
    expect(allCurrentWindowsDescriptorsUpdate.length).toEqual(allCurrentWindowsDescriptors.length + 1);
    expect(await util.browser.getCurrentWindow()).toEqual(allCurrentWindowsDescriptorsUpdate.pop());
  });
});