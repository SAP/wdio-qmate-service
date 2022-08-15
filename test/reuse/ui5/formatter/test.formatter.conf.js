const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  specs: [
    path.resolve(__dirname, "addRemoveLeadingZeros.spec.js"),
    path.resolve(__dirname, "formatDate.spec.js"),
    path.resolve(__dirname, "extractNumberFromString.spec.js")
  ]
});