const path = require("path");
const merge = require("deepmerge");
const customConfig = require("../../helper/configurations/chrome.headless.conf.js");
exports.config = merge(customConfig.config, {
  maxInstances: 1,
  bail: 1,

  services: [
    ["static-server", {
      port: 34005,
      folders: [
        { mount: "/custom.html", path: path.resolve(__dirname, "./html/custom.html") },
        { mount: "/fiori.html", path: path.resolve(__dirname, "./html/fiori.html") },
        { mount: "/home.html", path: path.resolve(__dirname, "./html/home.html") },
        { mount: "/sapCloud.html", path: path.resolve(__dirname, "./html/sapCloud.html") }
      ]
    }]
  ]
});