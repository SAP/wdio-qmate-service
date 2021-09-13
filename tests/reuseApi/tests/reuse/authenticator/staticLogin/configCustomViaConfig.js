const path = require("path");
const merge = require("deepmerge");
const staticServerConfig = require("./staticServerConfig.js");
exports.config = merge(staticServerConfig.config, {
  params: {
    logUI5Version: false,
    auth: {
      formType: "plain",
      usernameFieldSelector: "#USERNAME_BLOCK input",
      passwordFieldSelector: "#PASSWORD_BLOCK input",
      logonButtonSelector: "#LOGIN_LINK"
    }
  },

  baseUrl: "http://localhost:34005/fiori.html",

  specs: [
    path.resolve(__dirname, "specs/customViaConfig.spec.js")
  ]
});
