const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 1,
  specFileRetries: 1,

  baseUrl: "https://www.sap.com/",
  specs: [path.resolve(__dirname, "logException.spec.js")]
});
