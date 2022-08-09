var path = require("path");
var merge = require("deepmerge");
var chromeConfig = require("../../helper/configurations/chrome.headless.conf.js");
exports.config = merge(chromeConfig.config, {
  params: {
    import: {           //import data            
      myUserPrefix: "./data/ui/user.json",
      userDataFolder: "./data/ui",
      uiUser: "./data/ui/webUser.json",
    },
    export: {             //Export             
      exportData: "./data/ui/export/exportedUser.json",
      webUser: "./data/ui/export/exportedWebUser.json"
    },

  },

  baseUrl: "https://openui5.hana.ondemand.com/entity/sap.m.Input/sample/sap.m.sample.InputTypes",

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
    path.resolve(__dirname, "specs/importExport.spec.js")
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

