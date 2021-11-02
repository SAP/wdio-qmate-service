const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  bail: 1,

  specs: [
    path.resolve(__dirname, "pick.spec.js"),
    path.resolve(__dirname, "pickRange.spec.js"),
    path.resolve(__dirname, "fillRange.spec.js")
  ],

  exclude: [],


  mochaOpts: {
    timeout: 2000000,
  },
});