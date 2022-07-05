const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  bail: 1,
  baseUrl: "http://localhost:3000",
  
  specs: [
    path.resolve(__dirname, "post.spec.js"),
    path.resolve(__dirname, "get.spec.js"),
    path.resolve(__dirname, "init.spec.js"),
    path.resolve(__dirname, "patch.spec.js"),
    path.resolve(__dirname, "delete.spec.js")
  ],
  
  mochaOpts: {
    timeout: 2000000
  }
});