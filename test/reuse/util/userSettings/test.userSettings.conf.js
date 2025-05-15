const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  params: {
    import: {
      data: "./data/"
    }
  },
  maxInstances: 1,

  specs: [
    path.resolve(__dirname, "setLanguageFromUserSettings.spec.js"),
    path.resolve(__dirname, "setDateFormatFromUserSettings.spec.js"),
    path.resolve(__dirname, "setTimeFormatFromUserSettings.spec.js"),
    path.resolve(__dirname, "setTimeZoneFromUserSettings.spec.js"),
    path.resolve(__dirname, "setNumberFormatFromUserSettings.spec.js"),
    path.resolve(__dirname, "getLanguageFromUserSettings.spec.js"),
    path.resolve(__dirname, "getDateFormatFromUserSettings.spec.js"),
    path.resolve(__dirname, "getTimeFormatFromUserSettings.spec.js"),
    path.resolve(__dirname, "getTimeZoneFromUserSettings.spec.js"),
    path.resolve(__dirname, "getNumberFormatFromUserSettings.spec.js")
  ]
});
