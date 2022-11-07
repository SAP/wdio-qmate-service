const path = require("path");
const merge = require("deepmerge");
const fioriConfig = require("../../helper/configurations/chrome.headless.conf.js");
exports.config = merge(fioriConfig.config, {
  maxInstances: 1,
  bail: 1,

  specs: [
    path.resolve(__dirname, "specs/fiori.spec.js")
  ],
  exclude: [],

  reporters: ["spec"],
  params: {
    auth: {
      formType: "fiori-form",
      username: "<username>",
      password: "<password>"
    }
  },

  baseUrl: "<urlToSystem"

});