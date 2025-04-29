const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3",

  specs: [
    path.resolve(__dirname, "clickOk.spec.js"),
    path.resolve(__dirname, "clickCancel.spec.js"),
    path.resolve(__dirname, "clickYes.spec.js"),
    path.resolve(__dirname, "clickNo.spec.js"),
    path.resolve(__dirname, "clickDelete.spec.js"),
    path.resolve(__dirname, "clickRevokeApproval.spec.js"),
    path.resolve(__dirname, "clickCreate.spec.js"),
    path.resolve(__dirname, "clickButton.spec.js"),
  ]
});
