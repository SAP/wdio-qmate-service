const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../../../configurations/chrome.conf");
exports.config = merge(qmateConfiguration.config, {
  // maxInstances: 1,
  // bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",
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
    // path.resolve(__dirname, "expectAttributeToBe.spec.js"),
    // path.resolve(__dirname, "expectValidationError.spec.js"),
    // path.resolve(__dirname, "expectValidationSuccess.spec.js"),
    // path.resolve(__dirname, "expectAttributeToContain.spec.js"),
    // path.resolve(__dirname, "expectBindingPathToBe.spec.js"),
    path.resolve(__dirname, "expectBindingContextPathToBe.spec.js"),
    // path.resolve(__dirname, "expectTextToBe.spec.js"),
    // path.resolve(__dirname, "expectValueToBe.spec.js"),
    // path.resolve(__dirname, "expectValueToBeDefined.spec.js"),
    // path.resolve(__dirname, "expectToBeNotEnabled.spec.js"),
    // path.resolve(__dirname, "expectToBeEnabled.spec.js"),
    // path.resolve(__dirname, "expectToBeVisible.spec.js"),
    // path.resolve(__dirname, "expectToBeNotVisible.spec.js"),
    // path.resolve(__dirname, "expectUrlToBe.spec.js"),
    // path.resolve(__dirname, "expectPageTitle.spec.js"),
    // path.resolve(__dirname, "expectShellHeader.spec.js"),
    // path.resolve(__dirname, "expectUnsupportedNavigationPopup.spec.js"),
    // path.resolve(__dirname, "expectMessageToastText.spec.js"),
    // path.resolve(__dirname, "expectEqual.spec.js"),
    // path.resolve(__dirname, "expectUnequal.spec.js"),
    // path.resolve(__dirname, "expectDefined.spec.js"),
    // path.resolve(__dirname, "expectUndefined.spec.js"),
    // path.resolve(__dirname, "expectTrue.spec.js"),
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  //
  // The number of times to retry the entire specfile when it fails as a whole
  //specFileRetries: 1,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html
  // reporters: ["spec"],
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    timeout: 2000000,
  },
});