const merge = require("deepmerge");
const baseConfig = require("./base.conf.js");

const QmateHtmlReporter = require("wdio-qmate-reporter").default;

const outputDir = "./results";

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
          // "--incognito",
          "--disable-gpu",
          "--disable-web-security",
          "--disable-infobars",
          "--disable-extensions",
          "--enable-logging",
          "--lang=en-US",
        ],
        prefs: {
          "profile.password_manager_enabled": false,
          credentials_enable_service: false,
          password_manager_enabled: false,
          "intl.accept_languages": "en,en_US",
        },
      },
    },
  ],

  services: [
    [
      "chromedriver",
      {
        port: 4444,
        chromedriverCustomPath: process.env.CHROME_DRIVER,
      },
    ],
  ],

  reporters: [
    [
      QmateHtmlReporter,
      {
        outputDir: outputDir,
        filename: "report",
        displayOnlyFailed: true,
        collapsePassedSuites: true,
        collapseSkippedSuites: true,
        collapseFailedSuites: true,
        collapseAllSuites: true,
        entriesPerPage: 10,
      },
    ],
  ],

  onPrepare: (config, capabilities) => {
    try {
      QmateHtmlReporter.clearDirSync(outputDir);
    } catch (error) {
      throw new Error(`Could not clear output dir. ${error}`);
    }
  },

  afterTest: async (test, context, { error, _result, _duration, _passed, _retries }) => {
    try {
      await QmateHtmlReporter.triggerBrowserLogsCollection();
    } catch (error) {
      throw new Error(`Could not collect browser logs. ${error}`);
    }
  },

  onComplete: async (exitCode, config, capabilities, results) => {
    try {
      QmateHtmlReporter.writeSpecsData(outputDir);
    } catch (error) {
      throw new Error(`Could not generate report. ${error}`);
    }
  }
});
