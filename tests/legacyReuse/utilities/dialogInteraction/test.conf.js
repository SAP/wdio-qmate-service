const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../configurations/chrome.headless.conf.js");
exports.config = merge(qmateConfig.config, {
  maxInstances: 1,
  bail: 1,

  baseUrl: "https://sapui5.hana.ondemand.com/#/entity/sap.m.UploadCollection/sample/sap.m.sample.UploadCollection", //ui#CloudSolution-startActivityTransaction?p_guid=E41D2DE53D801EE9BACD7F060DB1C610

  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    path.resolve(__dirname, "fileUploadTest.spec.js")
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ]
});