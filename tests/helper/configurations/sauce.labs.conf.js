// WDIO + SauceLabs examples => https://github.com/saucelabs-training/demo-js/tree/main/webdriverio/webdriver
const merge = require("deepmerge");
const baseConfig = require("./base.conf.js");
const defaultBrowserSauceOptions = {
  build: `SauceLab test. Build-${new Date().getTime()}`,
  screenResolution: "1600x1200"
};
exports.config = merge(baseConfig.config, {
  // Note: provide browsers in your config (with tunnel, if required)
  services: ["sauce", "shared-store"],
  capabilities: [
    {
      browserName: "firefox",
      platformName: "Windows 10",
      browserVersion: "latest",
      "sauce:options": {
        ...defaultBrowserSauceOptions,
      }
    },
    {
      browserName: "MicrosoftEdge",
      platformName: "Windows 10",
      browserVersion: "latest",
      "sauce:options": {
        ...defaultBrowserSauceOptions,
      },
    },
    {
      browserName: "safari",
      platformName: "macOS 11",
      browserVersion: "latest",
      "sauce:options": {
        ...defaultBrowserSauceOptions
        // ...
      }
    }]
});