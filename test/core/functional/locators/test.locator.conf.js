var path = require("path");
var merge = require("deepmerge");
var profile = require("../../../helper/configurations/chrome.headless.conf");
const { BASE_URL } = require("../../../../src/reuse/constants.ts");

const locatorConfig = merge(profile.config, {
  maxInstances: 1,
  bail: 1,

  // pageLoadStrategy:"none" means navigateTo returns immediately. Patch it to wait
  // for the page to be ready — used by locator tests that navigate to ui5.sap.com SPA.
  before: async function () {
    const _navigateTo = browser.navigateTo.bind(browser);
    browser.navigateTo = async function (url) {
      await _navigateTo(url);
      // Wait for URL to change away from blank
      await browser.waitUntil(async () => {
        const current = await browser.getUrl();
        return current && current !== "about:blank" && current !== "data:,";
      }, { timeout: 30000, timeoutMsg: "Browser URL did not change from blank within 30s", interval: 200 });
      // Wait for readyState=complete
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
