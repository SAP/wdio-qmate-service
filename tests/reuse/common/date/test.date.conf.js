const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  bail: 1,

  specs: [
    path.resolve(__dirname, "getToday.spec.js"),
    path.resolve(__dirname, "getTomorrow.spec.js"),
    path.resolve(__dirname, "getNextMonth.spec.js"),
    path.resolve(__dirname, "getPreviousMonth.spec.js"),
    path.resolve(__dirname, "getNextYear.spec.js"),
    path.resolve(__dirname, "getPreviousYear.spec.js"),
    path.resolve(__dirname, "calculate.spec.js"),
    path.resolve(__dirname, "getSpecific.spec.js")
  ],

  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  },
});