const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfig.config, {
  maxInstances: 6,
  specFileRetries: 2,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/",

  specs: [
    path.resolve(__dirname, "addRemoveLeadingZeros.spec.js"),
    path.resolve(__dirname, "extractNumberFromString.spec.js"),
    path.resolve(__dirname, "formatDate.spec.js"),
    path.resolve(__dirname, "sliceStringAfter.spec.js"),
    path.resolve(__dirname, "sliceStringAt.spec.js"),
    path.resolve(__dirname, "stringifyJSON.spec.js"),
    path.resolve(__dirname, "trimString.spec.js")
  ]
});