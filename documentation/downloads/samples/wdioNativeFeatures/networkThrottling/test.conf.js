const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../configurations/devtools.conf.js");
const config = merge(qmateConfig.config, {
  maxInstances: 1,

  specs: [
    path.resolve(__dirname, "throttling.test.js")
  ],

  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",
});
exports.config = config;