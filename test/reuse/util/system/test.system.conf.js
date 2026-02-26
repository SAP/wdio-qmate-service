const { BASE_URL } = require("../../../constants.js");
const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 1,

  baseUrl: `${BASE_URL}/#/entity/sap.m.UploadCollection/sample/sap.m.sample.UploadCollection`, 

  specs: [
    path.resolve(__dirname, "system.spec.js"),
  ]
});