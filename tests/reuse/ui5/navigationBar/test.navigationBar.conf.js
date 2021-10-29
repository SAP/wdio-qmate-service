const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    // path.resolve(__dirname, "clickBack.spec.js"),
    // path.resolve(__dirname, "clickUserIcon.spec.js"),
    // path.resolve(__dirname, "expectPageTitle.spec.js"),
    path.resolve(__dirname, "expectShellHeader.spec.js")
  ],

  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  },
});