const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/",

  params: {
    import: {
      data: "./data/",
      customSourceData: "./customSourceData"
    }
  },

  specs: [
    path.resolve(__dirname, "decrypt.spec.js"), 
    [
      path.resolve(__dirname, "getSecureData1.spec.js"), 
      path.resolve(__dirname, "getSecureData2.spec.js")
    ]
  ]
});
