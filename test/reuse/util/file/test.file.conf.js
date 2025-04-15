const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/#/entity/sap.m.UploadCollection/sample/sap.m.sample.UploadCollection",

  specs: [
    path.resolve(__dirname, "pdfParser.spec.js"),
    path.resolve(__dirname, "getExcelData.spec.js"),
    path.resolve(__dirname, "findFilePathRecursively.spec.js"),
    path.resolve(__dirname, "getXmlData.spec.js"),
    path.resolve(__dirname, "getAttributeValuesFromJson.spec.js"),
    path.resolve(__dirname, "getTextData.spec.js"),
    path.resolve(__dirname, "expectTextDataToContain.spec.js"),
    path.resolve(__dirname, "getFileNamesByExtensions.spec.js")
  ]
});
