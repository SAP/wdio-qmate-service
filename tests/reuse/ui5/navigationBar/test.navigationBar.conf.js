const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/report.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  specFileRetries: 2,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    path.resolve(__dirname, "clickBack.spec.js"),
    path.resolve(__dirname, "clickUserIcon.spec.js"),
    path.resolve(__dirname, "expectPageTitle.spec.js"),
    path.resolve(__dirname, "expectShellHeader.spec.js")
  ],

  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  },
});