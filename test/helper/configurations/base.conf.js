/* eslint-disable no-console */
const WdioQmateService = require("../../../lib/index.js");
const chromedriverPath = require("chromedriver").path;
const fs = require("fs");

// WDIO 8 reads CHROMEDRIVER_PATH (see @wdio/utils startWebDriver.js / manager.js).
// Setting it short-circuits WDIO's runtime download to /tmp/chromedriver/... and
// spawns the binary installed by the npm `chromedriver` package's postinstall.
if (!process.env.CHROMEDRIVER_PATH || !fs.existsSync(process.env.CHROMEDRIVER_PATH)) {
  if (fs.existsSync(chromedriverPath)) {
    process.env.CHROMEDRIVER_PATH = chromedriverPath;
  } else {
    console.error("Path to chromedriver bin is wrong." + (process.env.CHROMEDRIVER_PATH || chromedriverPath));
    process.exit(1);
  }
}

exports.config = {
  params: {},
  services: [[WdioQmateService]],

  runner: "local",
  maxInstances: 1,

  logLevel: "error",
  logLevels: {
    webdriver: "silent"
  },

  bail: 0,
  waitforTimeout: 300000,
  waitForUI5Timeout: 90000,
  waitForUI5PollingInterval: 150,
  stableCountTries: 1,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: "mocha",
  coverage: {
    status: false
  },
  screenshotPath: "results/errorShots",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 200000,
    bail: true
  }
};
