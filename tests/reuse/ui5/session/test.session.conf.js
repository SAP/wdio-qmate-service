const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  bail: 1,

  specs: [
    path.resolve(__dirname, "loginFiori.spec.js"),
    path.resolve(__dirname, "loginSapCloud.spec.js"),
    path.resolve(__dirname, "logout.spec.js"),
    path.resolve(__dirname, "login.spec.js"),
    path.resolve(__dirname, "switchUser.spec.js"),
  ],

  exclude: [],

  reporters: ["spec"],

  mochaOpts: {
    timeout: 2000000,
  },
});