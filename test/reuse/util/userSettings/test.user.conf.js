const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  params: {
    import: {
      data: "./data/"
    },
    // applyUserSettingsForS4: true
  },
  maxInstances: 1,

  specs: [
    path.resolve(__dirname, "setLanguageFromUserSettings.spec.js"),
    path.resolve(__dirname, "setDateFormatFromUserSettings.spec.js"),
    path.resolve(__dirname, "setTimeFormatFromUserSettings.spec.js"),
    path.resolve(__dirname, "setTimeZoneFromUserSettings.spec.js"),
    path.resolve(__dirname, "setNumberFormatFromUserSettings.spec.js")
  ]
});
