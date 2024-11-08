const merge = require("deepmerge");
const baseConfig = require("./base.conf.js");
const path = require("path");

exports.config = merge(baseConfig.config, {
  capabilities: [
    {
      browserName: "chrome",
      browserVersion: "120.0.6099.35",
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
          "--disable-gpu",
          "--disable-web-security",
          "--disable-infobars",
          "--disable-extensions",
          "--enable-logging",
          "--lang=en-US"
        ],
        prefs: {
          "profile.password_manager_enabled": false,
          credentials_enable_service: false,
          password_manager_enabled: false,
          "intl.accept_languages": "en,en_US",
          "download.default_directory": path.join(process.cwd(), "downloads")
        }
      }
    }
  ]
});
