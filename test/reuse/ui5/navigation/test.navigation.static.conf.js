const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.conf");
exports.config = merge(profile.config, {
  maxInstances: 3,
  bail: 1,
  baseUrl: "http://localhost:34099/ui",

  services: [
    [
      "static-server",
      {
        port: 34099,
        folders: [
          {
            mount: "/ui",
            path: path.resolve(__dirname, "./website/main.html")
          }
        ]
      }
    ]
  ],

  specs: [path.resolve(__dirname, "navigateToApplication.spec.js"), path.resolve(__dirname, "navigateToApplicationAndRetry.spec.js"), path.resolve(__dirname, "navigateToApplicationWithQueryParams.spec.js"), path.resolve(__dirname, "navigateToApplicationWithQueryParamsAndRetry.spec.js")],

  mochaOpts: {
    timeout: 2000000
  }
});
