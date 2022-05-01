const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/sauce.labs.conf");
exports.config = merge(qmateConfiguration.config, {
  user: "sso-sap-D056896",
  key: "dbdea161-6aad-42aa-a0ae-296a3bd322ef",
  region: "eu-central-1",

  maxInstances: 2, // note: for the SAP account, only 2 parallel instances is a max value

  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    path.resolve(__dirname, "clickOk.spec.js"),
    path.resolve(__dirname, "clickCancel.spec.js"),
    path.resolve(__dirname, "clickYes.spec.js"),
    path.resolve(__dirname, "clickNo.spec.js"),
    path.resolve(__dirname, "clickDelete.spec.js"),
    path.resolve(__dirname, "clickRevokeApproval.spec.js"),
    path.resolve(__dirname, "clickCreate.spec.js"),
  ],

  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  },
});