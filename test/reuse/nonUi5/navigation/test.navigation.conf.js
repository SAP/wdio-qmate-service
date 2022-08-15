const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "https://www.sap.com/",

  specs: [
    path.resolve(__dirname, "navigateToApplication.spec.js")
  ]
});
