const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  specFileRetries: 2,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    path.resolve(__dirname, "getBindingValue.spec.js"),
    path.resolve(__dirname, "getDisplayed.spec.js"),
    path.resolve(__dirname, "getAllDisplayed.spec.js"),
    path.resolve(__dirname, "getByText.spec.js"),
    path.resolve(__dirname, "getByParent.spec.js"),
    path.resolve(__dirname, "getByChild.spec.js"),
    path.resolve(__dirname, "getId.spec.js"),
    path.resolve(__dirname, "getPropertyValue.spec.js"),
    path.resolve(__dirname, "highlight.spec.js"),
    path.resolve(__dirname, "isVisible.spec.js")
  ]
});

