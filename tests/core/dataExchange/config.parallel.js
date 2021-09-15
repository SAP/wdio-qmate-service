var path = require("path");
var merge = require("deepmerge");
var chromeConfig = require("../configurations/chrome.headless.conf.js");
exports.config = merge(chromeConfig.config, {
  maxInstances: 2,
  capabilities: [{
    browserName: "chrome",
    acceptInsecureCerts: true,
    "goog:chromeOptions": {
      // to run chrome headless the following flags are required
      // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
      args: [
        "--no-sandbox",
        "--ignore-certificate-errors",
        "--window-size=1920,1200",
        "--whitelisted-ips",
        "--headless",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-infobars",
        "--disable-extensions",
        "--enable-logging",
        "--lang=en-US"
      ],
    },
    specs: [
      path.resolve(__dirname, "specs/import.spec.js"),
      path.resolve(__dirname, "specs/export.slow.spec.js")
    ]
  }, {
    browserName: "chrome",
    acceptInsecureCerts: true,
    "goog:chromeOptions": {
      // to run chrome headless the following flags are required
      // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
      args: [
        "--no-sandbox",
        "--ignore-certificate-errors",
        "--window-size=1920,1200",
        "--whitelisted-ips",
        "--headless",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-infobars",
        "--disable-extensions",
        "--enable-logging",
        "--lang=en-US"
      ],
    },
    specs: [
      path.resolve(__dirname, "specs/import.spec.js"),
      path.resolve(__dirname, "specs/export.spec.js"),
      path.resolve(__dirname, "specs/export.fast.spec.js")
    ]
  }],


  params: {

    import: {            // Directory path
      myFolder1: "./data/my/folder/data/qs9",
      myFolder2: "./data/another/folder/data/anotherFolder",
      myMissingFolder: "./data/my/folder/missing",
      // File path (Best Practice should be the same as the script) .....             
      yourPrefixSpecName: "./data/my/folder/data/qs9/data.json",
      missingFile: "./data/my/folder/missingFile.json",
      invalidJsonFile: "./data/my/folder/invalid.json",
      uiUser: "./data/my/folder/data/qs9/webUser.json",
      emptyObject: "./data/my/folder/data/qs9/empty.json"
    },
    export: {             //Export             
      exportData: "./data/my/folder/path/in/exportFile.json",
      exportMoreData: "./data/my/folder/path/in/moreDataFile.json",
      exportArrayData: "./data/my/folder/path/in/arrayDataFile.json",
      exportNothing: "./data/my/folder/path/in/noDataFile.json",
      exportNothingArray: "./data/my/folder/path/in/noDataInArrayFile.json"
    },

  },

  baseUrl: "https://openui5.hana.ondemand.com/entity/sap.m.Input/sample/sap.m.sample.InputTypes",


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
