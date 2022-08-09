const merge = require("deepmerge");
const baseConfig = require("./base.conf.js");

exports.config = merge(baseConfig.config, {
  path: "/",

  capabilities: [
    {
      browserName: "chrome",
      acceptInsecureCerts: true,
      "goog:chromeOptions": {
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
    }
  ],

  services: [
    [
      "chromedriver",
      {
        port: 4444,
        chromedriverCustomPath: process.env.CHROME_DRIVER
      }
    ]
  ]
});
