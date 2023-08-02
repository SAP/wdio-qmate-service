const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    path.resolve(__dirname, "select.spec.js"),
  ]
});
