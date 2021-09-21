const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../configurations/chrome.headless.conf.js");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",
  specs: [
    path.resolve(__dirname, "executeControlInBrowser.spec.js"),
    path.resolve(__dirname, "getControlAggregationProperty.spec.js"),
    path.resolve(__dirname, "getControlAssociationProperty.spec.js"),
    path.resolve(__dirname, "getControlBindingContextPathProperty.spec.js"),
    path.resolve(__dirname, "getControlProperty.spec.js"),
    path.resolve(__dirname, "getControlPropertyBinding.spec.js")
  ]
});
