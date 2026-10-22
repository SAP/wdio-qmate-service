var path = require("path");
var merge = require("deepmerge");
var profile = require("../../../helper/configurations/chrome.headless.conf");
const { BASE_URL } = require("../../../../src/reuse/constants.ts");

const locatorConfig = merge(profile.config, {
  maxInstances: 1,
  bail: 1,

  // pageLoadStrategy:"none" means navigateTo returns before the browser starts loading.
  // Wrap browser.navigateTo in the before hook to wait for the URL to change and
  // readyState=complete before returning — necessary for SPA hash-routing on ui5.sap.com.
  before: async function () {
    const _navigateTo = browser.navigateTo.bind(browser);
    browser.navigateTo = async function (url) {
      await _navigateTo(url);
      await browser.waitUntil(async () => {
        const current = await browser.getUrl();
        return current === url;
      }, { timeout: 30000, timeoutMsg: `URL did not change to ${url} within 30s`, interval: 200 });
      await browser.waitUntil(
        async () => (await browser.execute(() => document.readyState)) === "complete",
        { timeout: 90000, timeoutMsg: "Page did not reach readyState=complete within 90s" }
      );
    };
  },

  specs: [
    path.resolve(__dirname, "elementProperties.test.js"),
    path.resolve(__dirname, "ancestorProperties.test.js"),
    path.resolve(__dirname, "descendantProperties.test.js"),
    path.resolve(__dirname, "siblingProperties.test.js"),
    path.resolve(__dirname, "domProperties.test.js"),
    path.resolve(__dirname, "parentProperties.test.js"),
    path.resolve(__dirname, "childProperties.test.js"),
    path.resolve(__dirname, "mixedProperties.test.js")
  ],
  exclude: [],
  baseUrl: `${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3`
});

exports.config = locatorConfig;
