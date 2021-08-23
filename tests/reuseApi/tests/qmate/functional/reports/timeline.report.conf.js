var path = require("path");
var merge = require("deepmerge");
const { TimelineService } = require("wdio-timeline-reporter/timeline-service");
var qmateConfig = require(path.resolve(process.env.CONFIG_TEMPLATES, "report.conf.js"));
exports.config = merge(qmateConfig.config, {
  maxInstances: 1,
  bail: 1,

  reporters: [["timeline", {
    outputDir: "reports/timeline",
    screenshotStrategy: "none"
  }]],
  outputDir: "reports/timeline/wdio_logs",

  services: [[TimelineService]],

  // WDIO screenshots
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    // if (error !== undefined) {
    //   await browser.saveScreenshot(`reports/timeline/${Date.now()}.png`);
    // }
  },

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
    path.resolve(__dirname, "specs/successful.suite.js"),
    path.resolve(__dirname, "specs/skipped.suite.js")
    // path.resolve(__dirname, "specs/failed.suite.js")
  ],
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",
});