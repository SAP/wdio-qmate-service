const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "http://localhost:34099/ui",

  services: [
    ["static-server", {
      port: 34099,
      folders: [{
        mount: "/ui",
        path: path.resolve(__dirname, "./website/main.html")
      }]
    }]
  ],

  specs: [
    path.resolve(__dirname, "navigateToUrlAndRetry.spec.js"),
    path.resolve(__dirname, "navigateToUrl.spec.js")
  ]
});