const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 1,
  bail: 1,

  specs: [
    path.resolve(__dirname, "getBrowserName.spec.js"),
    path.resolve(__dirname, "getUI5Version.spec.js")
  ],
  exclude: [],

  baseUrl: "https://sapui5.hana.ondemand.com/",
});