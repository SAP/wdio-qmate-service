const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/",

  specs: [
    path.resolve(__dirname, "logCurrentUrl.spec.js"),
    path.resolve(__dirname, "getBrowserName.spec.js"),
    path.resolve(__dirname, "getUI5Version.spec.js"),
    path.resolve(__dirname, "getCurrentUrl.spec.js"),
    path.resolve(__dirname, "getBaseUrl.spec.js"),
    path.resolve(__dirname, "setBaseUrl.spec.js"),
    path.resolve(__dirname, "clearBrowser.spec.js"),
    path.resolve(__dirname, "refresh.spec.js"),
    path.resolve(__dirname, "executeScript.spec.js"),
    path.resolve(__dirname, "getCurrentWindow.spec.js"),
    path.resolve(__dirname, "switchToWindow.spec.js"),
    path.resolve(__dirname, "switchToNewWindow.spec.js"),
    path.resolve(__dirname, "switchToIframe.spec.js"),
    path.resolve(__dirname, "switchToDefaultContent.spec.js"),
    path.resolve(__dirname, "back.spec.js"),
    path.resolve(__dirname, "log.spec.js")
  ]
});
