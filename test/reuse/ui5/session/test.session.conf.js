const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(qmateConfiguration.config, {
  maxInstances: 5,

  specs: [
    path.resolve(__dirname, "loginFiori.spec.js"),
    path.resolve(__dirname, "loginSapCloud.spec.js"),
    path.resolve(__dirname, "logout.spec.js"),
    path.resolve(__dirname, "login.spec.js"),
    path.resolve(__dirname, "switchUser.spec.js"),
  ],

  params: {
    logUI5Version: false
  },

  mochaOpts: {
    timeout: 2000000,
  },
});