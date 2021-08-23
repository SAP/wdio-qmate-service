var path = require("path");
var merge = require("deepmerge");
var vyperConfig = require("../../../../configurations/chrome.headless.conf.js");
exports.config = merge(vyperConfig.config, {
  maxInstances: 1,
  bail: 1,
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    path.resolve(__dirname, "locator.sync.js")
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  services: [
    ["static-server", {
      port: 34005,
      folders: [
        { mount: "/", path: path.resolve(__dirname, "supplIVList") }
      ]
    }]
  ],

  //
  // The number of times to retry the entire specfile when it fails as a whole
  //specFileRetries: 1,

  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: "http://localhost:34005/webapp/test/flpSandboxMockServer.html"
});
