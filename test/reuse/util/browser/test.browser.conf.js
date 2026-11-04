const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");
const { BASE_URL } = require("../../../../src/reuse/constants.ts");

exports.config = merge(profile.config, {
  maxInstances: 1,
  specFileRetries: 0,

  before: async function () {
    browser.overwriteCommand("url", async (origFn, url) => {
      await origFn(url);
      // BiDi resolves on DOMContentLoaded; wait for full load so external scripts run
      await browser.waitUntil(async () => (await browser.execute(() => document.readyState)) === "complete", { timeout: 30000, interval: 200 });
    });
  },

  baseUrl: `${BASE_URL}/`,

  specs: [
    path.resolve(__dirname, "logCurrentUrl.spec.js"),
    path.resolve(__dirname, "getBrowserName.spec.js"),
    path.resolve(__dirname, "getUI5Version.spec.js"),
    path.resolve(__dirname, "getCurrentUrl.spec.js"),
    path.resolve(__dirname, "getBaseUrl.spec.js"),
    path.resolve(__dirname, "setBaseUrl.spec.js"),
    path.resolve(__dirname, "clearBrowser.spec.js"),
    path.resolve(__dirname, "refresh.spec.js"),
    path.resolve(__dirname, "executeScript.spec.js"),
    path.resolve(__dirname, "handleCookiesConsent.spec.js"),
    path.resolve(__dirname, "getCurrentWindow.spec.js"),
    path.resolve(__dirname, "switchToWindow.spec.js"),
    path.resolve(__dirname, "contextLifecycle.spec.js"),
    path.resolve(__dirname, "reloadSessionMocking.spec.js"),
    path.resolve(__dirname, "closeWindow.spec.js"),
    path.resolve(__dirname, "switchToNewWindow.spec.js"),
    path.resolve(__dirname, "switchToIframe.spec.js"),
    path.resolve(__dirname, "switchToDefaultContent.spec.js"),
    path.resolve(__dirname, "back.spec.js"),
    path.resolve(__dirname, "log.spec.js"),
    path.resolve(__dirname, "forward.spec.js"),
    path.resolve(__dirname, "waitUntil.spec.js"),
    path.resolve(__dirname, "reloadSession.spec.js")
  ]
});
