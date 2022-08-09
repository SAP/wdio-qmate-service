const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 3,
  bail: 1,
  baseUrl: "https://www.sap.com/",

  specs: [
    path.resolve(__dirname, "navigateToApplication.spec.js")
  ],

  services: [
    ["chromedriver", {
      port: 4444
    }]
  ]
});
