const path = require("path");
const merge = require("deepmerge");
const profile = require("../helper/configurations/chrome.headless.conf");
const { BASE_URL } = require("../../src/reuse/constants.ts");

exports.config = merge(profile.config, {
  baseUrl: `${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon`,
  specs: [
    path.resolve(__dirname, "navigateToUrlAndClick.spec.js")
  ],
  beforeSession: () => {
    simulateRestartInWatchMode();
  }
});

function simulateRestartInWatchMode() {
  browser = undefined;
}
