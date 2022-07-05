const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  specFileRetries: 2,
  bail: 1,

  specs: [
    path.resolve(__dirname, "clickSettingsButton.spec.js"),
    path.resolve(__dirname, "sortColumnAscending.spec.js"),
    path.resolve(__dirname, "sortColumnDescending.spec.js")
  ],

  exclude: [],


  mochaOpts: {
    timeout: 2000000,
  },
});