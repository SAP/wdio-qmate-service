var merge = require("deepmerge");
var baseConfig = require("./base.conf.js");
exports.config = merge(baseConfig.config, {
  maxInstances: 5,
  //
  // Override default path ('/wd/hub') for chromedriver service.
  path: "/wd/hub",

  capabilities: [{
    browserName: "chrome",
    "goog:chromeOptions": {
      // to run chrome headless the following flags are required
      // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
      args: [
        "--no-sandbox",
        "--ignore-certificate-errors",
        "--window-size=1920,1080",
        //"--headless",
        //"--disable-gpu"
      ],
    }
  },
  {
    browserName: "firefox",
    "moz:firefoxOptions": {
      "args": [
        "--width=1920",
        "--height=1080"
      ]
    }
  }
  ],
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: [
    ["selenium-standalone", {
      logPath: "results/logs",
      installArgs: {
        drivers: {
          chrome: { version: "91.0.4472.101", arch: process.arch },
          firefox: { version: "0.26.0", arch: process.arch }
        }
      },
      args: {
        drivers: {
          chrome: { version: "91.0.4472.101", arch: process.arch },
          firefox: { version: "0.26.0", arch: process.arch }
        }
      },
    }]
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
    // Retry tests 1 times
    retries: 1
  },

});
