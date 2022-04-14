var path = require("path");
var merge = require("deepmerge");
const plainConfig = require("../../helper/configurations/report.headless.conf.js");
exports.config = merge(plainConfig.config, {
  maxInstances: 1,
  bail: 1,

  specs: [
    path.resolve(__dirname, "specs/sapCloud.spec.js")
  ],
  exclude: [],

  reporters: ["spec"],

  params: {
    auth: {
      formType: "sapcloud-form",
      username: "PURCHASER",
      password: "super-duper-sensitive-pw"
    }
  },
  
  baseUrl: "https://super-sensitive.domain.name/ui"
});