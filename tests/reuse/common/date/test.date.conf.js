const path = require("path");
const merge = require("deepmerge");
const qmateConfigure = require("../../configurations/chrome.headless.conf.js");
exports.config = merge(qmateConfigure.config, {
  maxInstances: 6,
  bail: 1,

  specs: [
    path.resolve(__dirname, "getToday.spec.js"),
    path.resolve(__dirname, "getTomorrow.spec.js"),
    path.resolve(__dirname, "getNextMonth.spec.js"),
    path.resolve(__dirname, "getPreviousMonth.spec.js"),
    path.resolve(__dirname, "getNextYear.spec.js"),
    path.resolve(__dirname, "getPreviousYear.spec.js"),
    path.resolve(__dirname, "calculateDate.spec.js"),
    path.resolve(__dirname, "getSpecificDate.spec.js")
  ],

  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  },
});