const path = require("path");
const merge = require("deepmerge");
const plainConfig = require("../../helper/configurations/chrome.headless.conf.js");
exports.config = merge(plainConfig.config, {
  maxInstances: 1,
  bail: 1,

  specs: [
    path.resolve(__dirname, "specs/plain.spec.js")
  ],
  exclude: [],

  reporters: ["spec"],

  params: {
    auth: {
      formType: "plain"
    }
  },
  
  baseUrl: "<urlToSystem>"
});