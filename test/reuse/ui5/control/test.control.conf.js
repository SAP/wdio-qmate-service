const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3",

  specs: [
    path.resolve(__dirname, "execute.spec.js"),
    path.resolve(__dirname, "focus.spec.js"),
    path.resolve(__dirname, "getAggregationProperty.spec.js"),
    path.resolve(__dirname, "getAssociationProperty.spec.js"),
    path.resolve(__dirname, "getBindingContextPathProperty.spec.js"),
    path.resolve(__dirname, "getProperty.spec.js"),
    path.resolve(__dirname, "getPropertyBinding.spec.js")
  ]
});
