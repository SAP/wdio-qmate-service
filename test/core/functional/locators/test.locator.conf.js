var path = require("path");
var merge = require("deepmerge");
var profile = require("../../../helper/configurations/chrome.headless.conf");
const { BASE_URL } = require("../../../../src/reuse/constants.ts");

const locatorConfig = merge(profile.config, {
  maxInstances: 1,
  bail: 1,

  before: async function () {
    // pageLoadStrategy:normal waits for readyState:complete, but SAPUI5 bootstrap (sap.ui) may finish later.
    // For tests navigating without an iframe, wait for sap.ui after url().
    browser.overwriteCommand("url", async (origFn, url) => {
      await origFn(url);
      await browser.waitUntil(async () => {
        return browser.execute(() => !!(window.sap && window.sap.ui));
      }, { timeout: 60000, interval: 500 });
    });

    // For tests that switch into a sampleFrame iframe, also wait for sap.ui inside the iframe.
    const origSwitchToIframe = util.browser.switchToIframe.bind(util.browser);
    util.browser.switchToIframe = async (...args) => {
      await origSwitchToIframe(...args);
      await browser.waitUntil(async () => {
        return browser.execute(() => !!(window.sap && window.sap.ui));
      }, { timeout: 60000, interval: 500 });
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
