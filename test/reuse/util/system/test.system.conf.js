const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 1,

  baseUrl: "https://sapui5.hana.ondemand.com/#/entity/sap.m.UploadCollection/sample/sap.m.sample.UploadCollection", 

  specs: [
    path.resolve(__dirname, "system.spec.js"),
  ]
});