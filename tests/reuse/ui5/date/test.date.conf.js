const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  bail: 1,

  specs: [
    path.resolve(__dirname, "pickDate.spec.js"),
    path.resolve(__dirname, "pickDateRange.spec.js"),
    path.resolve(__dirname, "fillDateRange.spec.js")
  ],

  exclude: [],

  reporters: ["spec"],

  mochaOpts: {
    timeout: 2000000,
  },
});