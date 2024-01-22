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
    path.resolve(__dirname, "getData.spec.js"),
    path.resolve(__dirname, "readDataFromFile.spec.js"),
    path.resolve(__dirname, "writeDataToFile.spec.js")
  ]
});
