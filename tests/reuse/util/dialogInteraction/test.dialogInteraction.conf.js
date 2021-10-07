const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 1,
  bail: 1,

  baseUrl: "https://sapui5.hana.ondemand.com/#/entity/sap.m.UploadCollection/sample/sap.m.sample.UploadCollection", //ui#CloudSolution-startActivityTransaction?p_guid=E41D2DE53D801EE9BACD7F060DB1C610

  specs: [
    path.resolve(__dirname, "file.spec.js")
  ],
  exclude: []
});