const path = require("path");
const merge = require("deepmerge");
const staticServerConfig = require("./staticServerConfig.js");
exports.config = merge(staticServerConfig.config, {
  params: {
    auth: {
      formType: "fiori-form",
      username: "PURCHASER",
      password: "Welcome1!"
    }
  },

  baseUrl: "http://localhost:34005/fiori.html",

  specs: [
    path.resolve(__dirname, "specs/fiori.spec.js")
  ]
});
