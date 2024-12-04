const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  params: {
    import: {
      data: "./data/"
    },
    applyS4UserSettings: true
  },
  maxInstances: 1,

  specs: [
    path.resolve(__dirname, "setS4UserSettings.spec.js")
  ]
});
