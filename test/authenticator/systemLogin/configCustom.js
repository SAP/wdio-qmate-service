const path = require("path");
const merge = require("deepmerge");
const customConfig = require("../../helper/configurations/chrome.headless.conf.js");
exports.config = merge(customConfig.config, {
  maxInstances: 1,
  bail: 1,

  specs: [
    path.resolve(__dirname, "specs/custom.spec.js")
  ],
  exclude: [],

  params: {
    auth: {
      formType: "custom",
      username: "PURCHASER",
      password: "super-duper-sensitive-pw",
      usernameFieldSelector: "#USERNAME_BLOCK input",
      passwordFieldSelector: "#PASSWORD_BLOCK input",
      logonButtonSelector: "#LOGIN_LINK"
    }
  },
  
  reporters: ["spec"],
  baseUrl: "<urlToSystem"
});