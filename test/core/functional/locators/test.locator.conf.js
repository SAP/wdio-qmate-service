var path = require("path");
var merge = require("deepmerge");
var profile = require("../../../helper/configurations/chrome.headless.conf");
const { BASE_URL } = require("../../../../src/reuse/constants.ts");

const locatorConfig = merge(profile.config, {
  maxInstances: 1,
  bail: 1,

  // pageLoadStrategy:"none" + wdio v10 BiDi: browser.navigateTo (classic WebDriver POST /url)
  // hangs in BiDi sessions on ChromeDriver 150. Redirect it to browser.url() (BiDi) and
  // add a readyState wait so the SPA is fully loaded before locator tests run.
  before: async function () {
    browser.navigateTo = async function (url) {
      await browser.url(url);
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
