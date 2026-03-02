const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
const { BASE_URL } = require("../../../../src/reuse/constants.ts");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 1,

  baseUrl: BASE_URL,

  specs: [
    path.resolve(__dirname, "console.spec.js"),
  ]
}); 