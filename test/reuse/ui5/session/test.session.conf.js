const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  specs: [
    path.resolve(__dirname, "loginFiori.spec.js"),
    path.resolve(__dirname, "loginSapCloud.spec.js"),
    path.resolve(__dirname, "logout.spec.js"),
    path.resolve(__dirname, "login.spec.js"),
    path.resolve(__dirname, "switchUser.spec.js")
  ],

  params: {
    logUI5Version: false
  }
});
