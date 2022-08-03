const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 3,
  bail: 1,

  services: [
    ["chromedriver", {
      port: 4444
    }]
  ],

  specs: [
    // path.resolve(__dirname, "navigateToSystemAndApplication.spec.js"),
    // path.resolve(__dirname, "navigateToSystemAndApplicationAndRetry.spec.js"),
    // path.resolve(__dirname, "expectUnsupportedNavigationPopup.spec.js"),
    path.resolve(__dirname, "closePopups.spec.js"),
  ],

  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  },
});
