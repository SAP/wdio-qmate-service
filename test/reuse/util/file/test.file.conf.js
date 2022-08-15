const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/#/entity/sap.m.UploadCollection/sample/sap.m.sample.UploadCollection", 

  specs: [
    path.resolve(__dirname, "file.spec.js"),
    path.resolve(__dirname, "pdfParser.spec.js")
  ]
});