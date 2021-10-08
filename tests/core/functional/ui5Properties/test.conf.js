var path = require("path");
var merge = require("deepmerge");
var qmateConfig = require("../../../helper/configurations/chrome.headless.conf.js");

exports.config = merge(qmateConfig.config, {
  maxInstances: 6,
  bail: 1,
  specs: [
    path.resolve(__dirname, "getProperties.test.js"),
    path.resolve(__dirname, "getAggregations.test.js"),
    path.resolve(__dirname, "getAssociations.test.js"),
    path.resolve(__dirname, "getBindingInfos.test.js")
  ],

  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html"
});
