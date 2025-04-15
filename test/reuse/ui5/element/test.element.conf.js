const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3",

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
    path.resolve(__dirname, "isVisible.spec.js"),
    path.resolve(__dirname, "waitForAll.spec.js"),
    path.resolve(__dirname, "getCssPropertyValue.spec.js")
  ]
});
