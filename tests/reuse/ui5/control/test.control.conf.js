const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    path.resolve(__dirname, "execute.spec.js"),
    path.resolve(__dirname, "getAggregationProperty.spec.js"),
    path.resolve(__dirname, "getAssociationProperty.spec.js"),
    path.resolve(__dirname, "getBindingContextPathProperty.spec.js"),
    path.resolve(__dirname, "getProperty.spec.js"),
    path.resolve(__dirname, "getPropertyBinding.spec.js")
  ],

  exclude: [],

  reporters: ["spec"],

  mochaOpts: {
    timeout: 2000000,
  },
});