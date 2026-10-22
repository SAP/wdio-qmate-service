var path = require("path");
var merge = require("deepmerge");
var profile = require("../../../helper/configurations/chrome.headless.conf");
const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const clientsidescripts = require("../../../../lib/scripts/clientsideUI5scripts");

async function waitForUI5(opts = {}) {
  const timeout = opts.timeout || 60000;
  await browser.waitUntil(async () => {
    return (await browser.execute(clientsidescripts.loadUI5CoreAndAutowaiter)) === true;
  }, { timeout, interval: 500 });
  const mScriptParams = {
    waitForUI5Timeout: browser.config.waitForUI5Timeout || 90000,
    waitForUI5PollingInterval: browser.config.waitForUI5PollingInterval || 10
  };
  await browser.waitUntil(async () => {
    return (await browser.execute(clientsidescripts.loadUI5Page, mScriptParams)) === true;
  }, { timeout, interval: 500 });
}

const locatorConfig = merge(profile.config, {
  maxInstances: 1,
  bail: 1,

  before: async function () {
    browser.overwriteCommand("url", async (origFn, url) => {
      await origFn(url);
      await waitForUI5();
    });

    const origSwitchToIframe = util.browser.switchToIframe.bind(util.browser);
    util.browser.switchToIframe = async (...args) => {
      await origSwitchToIframe(...args);
      await waitForUI5();
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
