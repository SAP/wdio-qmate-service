"use strict";
const { handleCookiesConsent } = require("../../../helper/utils");

describe("browser - cookie consent with an active iframe", function () {
  afterEach(async function () {
    await util.browser.switchToDefaultContent();
  });

  it("dismisses top-level consent without querying the active iframe", async function () {
    const html = '<button id="truste-consent-button" onclick="this.remove()">Accept cookies</button>' +
      '<iframe id="sampleFrame" srcdoc="<p>Sample content</p>"></iframe>';
    await browser.url(`data:text/html,${encodeURIComponent(html)}`);
    await util.browser.switchToIframe("#sampleFrame");

    await handleCookiesConsent();

    expect(await browser.$("#truste-consent-button").isExisting()).toBe(false);
    expect(await util.browser.executeScript("return document.querySelector('p').textContent;")).toEqual("Sample content");
  });

  it("waits for consent rendered after navigation", async function () {
    await browser.url("data:text/html,<title>Delayed consent</title>");
    await browser.execute(() => {
      setTimeout(() => {
        const button = document.createElement("button");
        button.id = "truste-consent-button";
        button.textContent = "Accept cookies";
        button.onclick = () => {
          document.body.dataset.consentAccepted = "true";
          button.remove();
        };
        document.body.append(button);
      }, 1000);
    });

    await handleCookiesConsent();

    expect(await browser.execute(() => document.body.dataset.consentAccepted)).toEqual("true");
    expect(await browser.$("#truste-consent-button").isExisting()).toBe(false);
  });
});
