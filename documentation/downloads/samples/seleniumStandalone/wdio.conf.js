const WdioQmateService = require("@wdio/qmate-service");
exports.config = {
  runner: "local",
  specs: [
    "./test/specs/example.js"
  ],
  exclude: [],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: "chrome",
    acceptInsecureCerts: true
  }],
  logLevel: "error",
  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [[WdioQmateService], ["selenium-standalone"]],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000
  }
};
