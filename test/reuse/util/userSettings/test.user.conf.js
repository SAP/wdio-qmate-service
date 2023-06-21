const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
const data = require("./data/data.local.json");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 1,
  params: {
    systemUrl: data.systemUrl,
    applyUserSettingsForS4: true
  },
  baseUrl: data.baseUrl,

  specs: [
    path.resolve(__dirname, "setLanguageFromUserSettings.spec.js"),
    path.resolve(__dirname, "setDateFormatFromUserSettings.spec.js"),
    path.resolve(__dirname, "setTimeFormatFromUserSettings.spec.js"),
    path.resolve(__dirname, "setTimeZoneFromUserSettings.spec.js"),
    path.resolve(__dirname, "setNumberFormatFromUserSettings.spec.js")
  ]
});
