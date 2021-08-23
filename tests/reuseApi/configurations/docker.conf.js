var merge = require("deepmerge");
var chromeConfig = require("./base.conf.js");
exports.config = merge(chromeConfig.config, {
  host: "localhost",
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
  }
  ],

  logLevel: "debug",
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ["docker"]
});
