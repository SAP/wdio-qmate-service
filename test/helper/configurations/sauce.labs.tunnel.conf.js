const merge = require("deepmerge");
const baseConfig = require("./base.conf.js");

const defaultBrowserSauceOptions = {
  build: `SauceLab test. Build-${new Date().getTime()}`,
  screenResolution: "1600x1200",
  tunnelIdentifier: "sap-intranet",
  parentTunnel: "S-A-P"
};

exports.config = merge(baseConfig.config, {
  services: ["sauce", "shared-store"],
  capabilities: [
    {
      browserName: "firefox",
      platformName: "Windows 10",
      browserVersion: "latest",
      "sauce:options": {
        ...defaultBrowserSauceOptions
      }
    },
    {
      browserName: "MicrosoftEdge",
      platformName: "Windows 10",
      browserVersion: "latest",
      "sauce:options": {
        ...defaultBrowserSauceOptions
      }
    },
    {
      browserName: "safari",
      platformName: "macOS 11",
      browserVersion: "latest",
      "sauce:options": {
        ...defaultBrowserSauceOptions
      }
    }
  ]
});
