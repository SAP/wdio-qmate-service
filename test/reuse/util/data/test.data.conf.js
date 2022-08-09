const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfig.config, {
  maxInstances: 6,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/",

  params: {
    import: {
      data: "./data/"
    }
  },

  specs: [
    path.resolve(__dirname, "getData.spec.js"),
    path.resolve(__dirname, "getSecureData.spec.js"),
    path.resolve(__dirname, "decrypt.spec.js")
  ]
});