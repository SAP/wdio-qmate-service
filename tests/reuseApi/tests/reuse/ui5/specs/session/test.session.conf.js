// Note: all sap cloud services have blocking popup => can execute tests only in --headless mode
// https://github.com/SeleniumHQ/selenium/issues/5408
// Looks like this issues exists in selenium.
// Certificates popup blocks browser.navigateTo()
// Parameters are not working
//      args: [
//          ...
//          "--disable-popup-blocking",
//          ...
//       ],
//       prefs: {
//         "profile.default_content_settings.popups" : 1,
//         "profile.default_content_settings.notifications" : 1,
//       }
const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../../../configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
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
    path.resolve(__dirname, "loginFiori.spec.js"),
    path.resolve(__dirname, "loginSapCloud.spec.js"),
    path.resolve(__dirname, "logout.spec.js"),
    path.resolve(__dirname, "login.spec.js"),
    path.resolve(__dirname, "switchUser.spec.js"),
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
  reporters: ["spec"],
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    timeout: 2000000,
  },
});
