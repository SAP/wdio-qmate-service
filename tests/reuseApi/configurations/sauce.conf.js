var merge = require("deepmerge");
var baseConfig = require("./base.conf.js");
const milliseconds = new Date().getMilliseconds();
exports.config = merge(baseConfig.config, {
  user: "d060530",//process.env.SAUCE_USERNAME,
  key: "2c8f2780-cd1e-4a2c-b139-f0872051b14b",//process.env.SAUCE_ACCESS_KEY	
  region: "eu",
  build: "build-sauce-wdio-1",
  name: "multi-browsers-vyper-wdio",
  maxInstances: 5,

  // Capabilities to be passed to the webdriver instance.
  capabilities: [
    {
      "browserName": "firefox",
      "browserVersion": "latest",
      "platformName": "Windows 10",
      "sauce:options": {
        "build": `wdio-test.${milliseconds}`,
        "name": "test-card-firefox",
        "screenResolution": "1920x1200",
        "parentTunnel": "S-A-P",
        "tunnelIdentifier": "sap-intranet"
      }
    },
    {
      "browserName": "safari",
      "browserVersion": "latest",
      "platformName": "macOS 10.15",
      "sauce:options": {
        "build": `wdio-test.${milliseconds}`,
        "name": "test-card-safari",
        "screenResolution": "1920x1440",
        "parentTunnel": "S-A-P",
        "tunnelIdentifier": "sap-intranet"
      }
    },
    {
      "browserName": "internet explorer",
      "browserVersion": "11.285",
      "platformName": "Windows 10",
      "sauce:options": {
        "build": `wdio-test.${milliseconds}`,
        "name": "test-card-ie",
        "screenResolution": "1920x1200",
        "parentTunnel": "S-A-P",
        "tunnelIdentifier": "sap-intranet"
      }
    },
    {
      "browserName": "MicrosoftEdge",
      "browserVersion": "latest",
      "platformName": "Windows 10",
      "sauce:options": {
        "build": `wdio-test.${milliseconds}`,
        "name": "test-card-edge",
        "screenResolution": "1920x1200",
        "parentTunnel": "S-A-P",
        "tunnelIdentifier": "sap-intranet"
      }
    },
    {
      "browserName": "chrome",
      "browserVersion": "81.0",
      "platformName": "Windows 10",
      "sauce:options": {
        "build": `wdio-test.${milliseconds}`,
        "name": "test-card-chrome",
        "screenResolution": "1920x1200",
        "parentTunnel": "S-A-P",
        "tunnelIdentifier": "sap-intranet"
      }
    }
  ],

  services: [["sauce"]],
});