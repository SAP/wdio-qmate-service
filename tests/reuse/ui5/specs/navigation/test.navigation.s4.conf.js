const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../../configurations/chrome.headless.conf");
exports.config = merge(qmateConfig.config, {
  maxInstances: 3,
  bail: 1,

  services: [["chromedriver", {port: 4444}]],

  specs: [
    path.resolve(__dirname, "navigateToSystemAndApplication.spec.js"),
    path.resolve(__dirname, "navigateToSystemAndApplicationAndRetry.spec.js"),
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    timeout: 2000000,
  },
});
