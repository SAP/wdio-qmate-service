const path = require("path");
const merge = require("deepmerge");
const staticServerConfig = require("./staticServerConfig.js");
exports.config = merge(staticServerConfig.config, {
  params: {
    logUI5Version: false,
    auth: {
      formType: "sapcloud-form",
      username: "PURCHASER",
      password: "super-duper-sensitive-pw"
    }
  },
  baseUrl: "http://localhost:34005/sapCloud.html",

  specs: [
    path.resolve(__dirname, "specs/sapCloud.spec.js")
  ]
});
