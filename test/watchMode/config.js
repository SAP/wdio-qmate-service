const path = require("path");
const merge = require("deepmerge");
const profile = require("../helper/configurations/chrome.headless.conf");


exports.config = merge(profile.config, {
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon",
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
