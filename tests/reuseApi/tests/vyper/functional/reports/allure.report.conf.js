var path = require("path");
var merge = require("deepmerge");
var video = require("wdio-video-reporter");
var allure = require("@wdio/allure-reporter").default;
var logUtil = require(path.resolve(process.env.CONFIG_TEMPLATES, "../../../scripts/hooks/utils/browserLog"));
var vyperConfig = require(path.resolve(process.env.CONFIG_TEMPLATES, "report.conf.js"));
exports.config = merge(vyperConfig.config, {
  //
  // The number of times to retry the entire specfile when it fails as a whole
  //specFileRetries: 1,
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html
  logLevel: "error", // trace | debug | info | warn | error | silent
  coloredLogs: true,
  specs: [
    path.resolve(__dirname, "specs/successful.suite.js"),
    path.resolve(__dirname, "specs/skipped.suite.js"),
    path.resolve(__dirname, "specs/failed.suite.js")
  ],
  reporters: [
    [video, {
      saveAllVideos: true,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 5, // Higher to get slower videos, lower for faster videos [Value 1-100]
      videoRenderTimeout: 0,      // Max seconds to wait for a video to finish rendering
      recordAllActions: true
    }],

    ["allure", {
      outputDir: "reports/allure",
    }]
  ],

  outputDir: "reports/allure",

  beforeSuite: async function (suite) {
    await allure.addFeature(suite.title);
  },

  beforeTest: async function () {
    await allure.addEnvironment("BROWSER", browser.capabilities.browserName);
  },

  /**
    * Function to be executed after a test (in Mocha/Jasmine).
    */
  afterTest: async function (test, context, { error }) {
    /**
     * Get browser logs and add them in allure report
     */
    await logUtil.addBrowserLogs(allure);

    if (error !== undefined) {
      /**
       * Make screenshot in case of issue
       */
      // await browser.takeScreenshot();
      await browser.saveScreenshot(`reports/allure/${Date.now()}.png`);
    }
  },

  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",

});
