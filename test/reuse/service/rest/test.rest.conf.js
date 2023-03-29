const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 3,
  specFileRetries: 2,
  
  baseUrl: "http://localhost:3000",
  
  specs: [
    path.resolve(__dirname, "post.spec.js"),
    path.resolve(__dirname, "get.spec.js"),
    path.resolve(__dirname, "init.spec.js"),
    path.resolve(__dirname, "patch.spec.js"),
    path.resolve(__dirname, "put.spec.js"),
    path.resolve(__dirname, "delete.spec.js")
  ]
});