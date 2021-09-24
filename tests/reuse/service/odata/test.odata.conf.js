const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {

  // maxInstances: 6,
  // bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",
  params: {
    import: {
      data: "./data/"
    },
    systemUrl: "https://qs9-715-api.wdf.sap.corp/"
  },
  specs: [
    path.resolve(__dirname, "oData_create_standard_po.spec.js"),
    path.resolve(__dirname, "READ.spec.js"),
    // path.resolve(__dirname, "BATCH_ChangeSet.spec.js"),
    // path.resolve(__dirname, "CREATE.spec.js"),
    // path.resolve(__dirname, "UPDATE.spec.js"),
  ],

  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  },
});