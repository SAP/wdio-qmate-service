"use strict";
const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const { handleCookiesConsent } = require("../../../helper/utils");

describe("browser - switchToIframe", function () {
  let elem;

  it("Preparation", async function () {
    //keep latest demo kit version due to iframes here
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.m.Dialog/sample/sap.m.sample.Dialog`);
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    elem = await $("iframe[id='sampleFrame']");
    await nonUi5.userInteraction.scrollToElement(elem);
    await util.browser.switchToIframe("iframe[id='sampleFrame']");
  });
});

describe("browser - switchToIframe - error case", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl(`${BASE_URL}/#/entity/sap.suite.ui.commons.imageeditor/sample/sap.suite.ui.commons.sample.ImageEditorContainer`);
    await handleCookiesConsent();
  });

  it("Execution & Verification", async function () {
    await expect(util.browser.switchToIframe("iframe[id*='__uploader']")).rejects.toThrow(`Function 'switchToIframe' failed with: element ("iframe[id*='__uploader']") still not displayed after 30000ms`);
  });
});

describe("browser - switchToIframe - frame identity", function () {
  afterEach(async function () {
    await util.browser.switchToDefaultContent();
  });

  it("keeps frame element interactions scoped without changing the browser context", async function () {
    const html = '<title>parent page</title><button id="parent">Parent</button>' +
      '<iframe id="sampleFrame" srcdoc="<title>child page</title><button>Child</button>"></iframe>';
    await browser.url(`data:text/html,${encodeURIComponent(html)}`);
    await browser.addLocatorStrategy("frameButtons", () => Array.from(document.querySelectorAll("button")));
    await util.browser.switchToIframe("#sampleFrame");
    const context = util.browser.getContext();
    const [button] = await context.custom$$("frameButtons");

    expect(await button.isDisplayed()).toBe(true);
    expect(await button.isClickable()).toBe(true);
    expect(await button.getText()).toEqual("Child");
    await context.execute(() => {
      document.querySelector("button").onclick = () => { document.title = "clicked child"; };
    });
    await button.click();
    expect(await util.browser.executeScript("return document.title;")).toEqual("clicked child");
    expect(await browser.execute(() => document.title)).toEqual("parent page");

    await util.browser.switchToDefaultContent();
    expect(await util.browser.executeScript("return document.title;")).toEqual("parent page");
    expect(await util.browser.getContext().$("#parent").isClickable()).toBe(true);
  });

  it("selects the requested iframe instead of the first child context", async function () {
    const html = '<iframe id="decoy" srcdoc="<title>decoy</title>"></iframe>' +
      '<iframe id="sampleFrame" srcdoc="<title>requested sample</title>"></iframe>';
    await browser.url(`data:text/html,${encodeURIComponent(html)}`);

    await util.browser.switchToIframe("#sampleFrame");

    expect(await util.browser.executeScript("return document.title;")).toEqual("requested sample");
  });

  it("resolves the requested iframe again after its DOM node is replaced", async function () {
    const html = '<iframe id="sampleFrame" srcdoc="<title>original sample</title>"></iframe>';
    await browser.url(`data:text/html,${encodeURIComponent(html)}`);
    await util.browser.switchToIframe("#sampleFrame");
    await browser.execute(() => {
      const replacement = document.createElement("iframe");
      replacement.id = "sampleFrame";
      replacement.srcdoc = "<title>replacement sample</title>";
      document.querySelector("#sampleFrame").replaceWith(replacement);
    });

    await util.browser.switchToIframe("#sampleFrame");

    expect(await util.browser.executeScript("return document.title;")).toEqual("replacement sample");
  });

  it("selects the iframe in the active tab", async function () {
    const originalWindow = await browser.getWindowHandle();
    const html = '<iframe id="sampleFrame" srcdoc="<title>new tab sample</title>"></iframe>';
    const newWindow = await browser.newWindow(`data:text/html,${encodeURIComponent(html)}`, { type: "tab" });
    await browser.switchToWindow(newWindow.contextId || newWindow.handle);
    try {
      await util.browser.switchToIframe("#sampleFrame");
      expect(await util.browser.executeScript("return document.title;")).toEqual("new tab sample");
    } finally {
      await util.browser.switchToDefaultContent();
      await browser.closeWindow();
      await browser.switchToWindow(originalWindow);
    }
  });
});
