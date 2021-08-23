var path = require("path");
var merge = require("deepmerge");
const { HtmlReporter, ReportAggregator } = require("@rpii/wdio-html-reporter");
var vyperConfig = require(path.resolve(process.env.CONFIG_TEMPLATES, "report.conf.js"));
exports.config = merge(vyperConfig.config, {
  maxInstances: 1,
  bail: 1,

  reporters: ["spec", [HtmlReporter, {
    debug: true,
    outputDir: "reports/html-reporter",
    filename: "report.html",
    reportTitle: "Test Report Title",

    //to show the report in a browser when done
    showInBrowser: true,

    //to turn on screenshots after every test
    useOnAfterCommandForScreenshot: true,
  }
  ]],


  onPrepare: function () {
    // Prepare instance for a master (aggregated) report
    const reportAggregator = new ReportAggregator({
      outputDir: "reports/html-reporter",
      filename: "master-report.html",
      reportTitle: "Master Report",
      showInBrowser: true
    });
    reportAggregator.clean();

    global.reportAggregator = reportAggregator;
  },

  onComplete: function () {
    // Generate a master (aggregated) report after the tests end
    global.reportAggregator.createReport().then().catch(e => {
      console.log(`Html reporter cannot generate master-report due to this error: ${e}`);
    });
  },


  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (error !== undefined) {
      await browser.saveScreenshot(`reports/html-reporter/${Date.now()}.png`);
    }
  },

  specs: [
    path.resolve(__dirname, "specs/successful.suite.js"),
    path.resolve(__dirname, "specs/skipped.suite.js"),
    // path.resolve(__dirname, "specs/failed.suite.js") // For demo purposes
  ],
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",
});