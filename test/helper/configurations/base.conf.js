/* eslint-disable no-console */
const WdioQmateService = require("../../../lib/index.js");

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
  connectionRetryTimeout: 180000,
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
  },
  webSocketUrl: false,
  before: async function () {
    // v10: set pageLoad timeout so ChromeDriver returns an error instead of hanging
    // until Mocha's 200s timeout fires. 120s gives page time to load on slow CI networks.
    await browser.setTimeout({ pageLoad: 120000 });
  }
};
