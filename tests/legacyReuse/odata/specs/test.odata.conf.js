const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../../helper/configurations/report.headless.conf.js");
exports.config = merge(qmateConfig.config, {
  maxInstances: 6,
  bail: 1,
  baseUrl: "https://qs9-715.wdf.sap.corp/ui",
  specs: [
    path.resolve(__dirname, "BATCH_ChangeSet.spec.js"),
    path.resolve(__dirname, "create_enhancedLimitsPO_with_ConfirmationControlKey.spec.js"),
    path.resolve(__dirname, "CREATE.spec.js"),
    path.resolve(__dirname, "oData_create_advanced_po.spec.js"),
    path.resolve(__dirname, "oData_create_po.spec.js"),
    path.resolve(__dirname, "oData_create_standard_po_me2c.spec.js"),
    path.resolve(__dirname, "oData_create_standard_po_w_Item_LimitItem.spec.js"),
    path.resolve(__dirname, "oData_create_standard_po.spec.js"),
    path.resolve(__dirname, "oData_isBatchFTActives.spec.js"),
    path.resolve(__dirname, "READ.spec.js"),
    path.resolve(__dirname, "UPDATE.spec.js")
  ],
  params: {
    clientInterval: 150,
    stepsRetries: 2,
    stepRetriesIntervals: 1000,
    failFast: true,
    dontShowBrowserLogs: true,
    auth: {
      formType: "plain"
    },
    systemUrl: "https://qs9-715.wdf.sap.corp/"
  }
});