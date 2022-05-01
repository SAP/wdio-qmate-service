const path = require("path");
const merge = require("deepmerge");
const plainConfig = require("../../helper/configurations/report.headless.conf.js");
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
  
  baseUrl: "https://qs9-715.wdf.sap.corp/ui"
});