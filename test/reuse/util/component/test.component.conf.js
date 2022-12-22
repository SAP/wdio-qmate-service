const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 4,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/",

  params: {
    import: {
      data: "./data/",
      customSourceData: "./customSourceData"
    }
  },

  specs: [
    path.resolve(__dirname, "storeEntryPoint.spec.js"),
    path.resolve(__dirname, "loadEntryPoint.spec.js"),
  ]
});
