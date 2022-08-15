const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  specs: [
    path.resolve(__dirname, "pick.spec.js"),
    path.resolve(__dirname, "pickRange.spec.js"),
    path.resolve(__dirname, "fillRange.spec.js")
  ]
});