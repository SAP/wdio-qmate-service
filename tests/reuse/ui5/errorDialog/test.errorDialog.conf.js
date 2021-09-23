const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../../helper/configurations/chrome.headless.conf.js");
exports.config = merge(qmateConfig.config, {
  maxInstances: 6,
  bail: 1,

  specs: [
    path.resolve(__dirname, "clickClose.spec.js"),
    path.resolve(__dirname, "expectErrorDialogToBeVisible.spec.js")
  ],

  exclude: [],

  reporters: ["spec"],

  mochaOpts: {
    timeout: 2000000,
  },
});