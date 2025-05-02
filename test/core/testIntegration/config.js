var merge = require("deepmerge");
var path = require("path");
var qmateConf = require("../../helper/configurations/chrome.headless.conf");
// have main config file as default but overwrite environment specific information
exports.config = merge(qmateConf.config, {
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3",

  suites: {
    testLearn:[path.resolve(__dirname, "./filters1.spec.js")]
  },
  params: {
    auth: {
      formType: "plain"
    }
  },
  specs: [path.resolve(__dirname, "./filters1.spec.js")]
});
