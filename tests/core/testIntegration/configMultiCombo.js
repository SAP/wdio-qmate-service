var merge = require("deepmerge");
var path = require("path");
var qmateConf = require("../../helper/configurations/chrome.headless.conf");

// have main config file as default but overwrite environment specific information
exports.config = merge(qmateConf.config, {
  baseUrl: "https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox",
  params: {
    auth: {
      formType: "plain"
    }
  },
  suites: {
    testLearn: "multicombobox.spec.js",
  },
  specs: [path.resolve(__dirname, "multicombobox.spec.js")]
});
