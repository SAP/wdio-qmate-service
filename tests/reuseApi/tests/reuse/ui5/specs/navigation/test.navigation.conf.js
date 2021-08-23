const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../../../../configurations/chrome.headless.conf.js");
exports.config = merge(qmateConfig.config, {
  maxInstances: 3,
  bail: 1,
  baseUrl: "http://localhost:34099/ui",

  services: [
    ["chromedriver", {port: 4444}],
    ["static-server", {
      port: 34099,
      folders: [
        {mount: "/ui", path: path.resolve(__dirname, "./website/main.html")},
      ]
    }]
  ],

  specs: [
    path.resolve(__dirname, "navigateToApplication.spec.js"),
    path.resolve(__dirname, "navigateToApplicationAndRetry.spec.js"),

    // TODO: to be reworked
    // path.resolve(__dirname, "navigateToApplicationWithQueryParams.spec.js"),
    // path.resolve(__dirname, "navigateToApplicationWithQueryParamsAndRetry.spec.js"),
    // path.resolve(__dirname, "navigateToApplicationAndRetryRefresh.spec.js"),
    // path.resolve(__dirname, "navigateToSystemAndApplication.spec.js"),
    // path.resolve(__dirname, "navigateToSystemAndApplicationAndRetry.spec.js"),
    // path.resolve(__dirname, "navigateToUrl.spec.js"),
    // path.resolve(__dirname, "printCurrentUrl.spec.js")
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    timeout: 2000000,
  },
});
