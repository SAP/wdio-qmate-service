/* eslint-disable no-console */
const WdioQmateService = require("../../../lib/index.js");
const chromedriverPath = require("chromedriver").path;
const fs = require("fs");

if (!process.env.CHROME_DRIVER || !fs.existsSync(process.env.CHROME_DRIVER)) {
  if (fs.existsSync(chromedriverPath)) {
    process.env.CHROME_DRIVER = chromedriverPath;
  } else {
    console.error("Path to chromedriver bin is wrong." + process.env.CHROME_DRIVER || chromedriverPath);
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
