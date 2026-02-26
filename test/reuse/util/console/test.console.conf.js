const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 1,

  baseUrl: "https://ui5.sap.com",

  specs: [
    path.resolve(__dirname, "console.spec.js"),
  ]
}); 