const merge = require("deepmerge");
const baseConfig = require("./base.conf.js");
exports.config = merge(baseConfig.config, {
  //
  // Override default path ('/wd/hub') for chromedriver service.
  path: "/",

  capabilities: [{
    browserName: "chrome",
    acceptInsecureCerts: true,
    "goog:chromeOptions": {
      // to run chrome headless the following flags are required
      // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
      args: [
        "--output=/dev/null",
        "--log-level=3",
        "--no-sandbox",
        "--ignore-certificate-errors",
        "--window-size=1920,1200",
        "--whitelisted-ips",
        "--disable-dev-shm-usage",
        "--incognito",
        "--headless",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-infobars",
        "--disable-extensions",
        "--disable-logging",
        "--lang=en-US"
      ],
      prefs: {
        "intl.accept_languages": "en,en_US"
      }
    }
  }],
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: [
    ["chromedriver", {
      port: 4444,
      chromedriverCustomPath: process.env.CHROME_DRIVER
    }]
  ],

  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    // Retry tests 1 times
    //retries: 1
  },

});