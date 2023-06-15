const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 1,
  params: {
    systemUrl: "<urlToSystem>"
  },
  baseUrl: "<urlToLaunchpad>",

  specs: [
    path.resolve(__dirname, "getLanguage.spec.js"),
    path.resolve(__dirname, "getDateFormat.spec.js"),
    path.resolve(__dirname, "getTimeFormat.spec.js"),
    path.resolve(__dirname, "getTimeZone.spec.js"),
    path.resolve(__dirname, "getNumberFormat.spec.js")
  ]
});
