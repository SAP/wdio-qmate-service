var merge = require("deepmerge");
var path = require("path");
var qmateConf = require(path.resolve(process.env.QMATE_CONFIGS, "performance.config"));

// have main config file as default but overwrite environment specific information
exports.config = merge(qmateConf.config, {
  baseUrl: "https://sapui5.hana.ondemand.com/#/entity/sap.m.MultiComboBox/sample/sap.m.sample.MultiComboBox",

  suites: {
    testLearn: "multicombobox.spec.js",
  },
});
