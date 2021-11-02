const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 3,
  bail: 1,
  baseUrl: "http://localhost:34099/ui",

  services: [
    ["chromedriver", {
      port: 4444
    }],
    ["static-server", {
      port: 34099,
      folders: [{
        mount: "/ui",
        path: path.resolve(__dirname, "./website/main.html")
      }, ]
    }]
  ],

  specs: [
    // path.resolve(__dirname, "navigateToUrlAndRetry.spec.js"),
    path.resolve(__dirname, "navigateToUrl.spec.js")
  ],

  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  },
});