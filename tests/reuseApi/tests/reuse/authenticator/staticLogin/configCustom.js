const path = require("path");
const merge = require("deepmerge");
const staticServerConfig = require("./staticServerConfig.js");
exports.config = merge(staticServerConfig.config, {
  params: {
    auth: {
      formType: "custom",
      username: "PURCHASER",
      password: "Welcome1!",
      usernameFieldSelector: "#username",
      passwordFieldSelector: "#password",
      logonButtonSelector: "#logon"
    }
  },

  baseUrl: "http://localhost:34005/custom.html",

  specs: [
    path.resolve(__dirname, "specs/custom.spec.js")
  ]
});
