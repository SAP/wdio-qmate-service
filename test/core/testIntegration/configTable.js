const { BASE_URL } = require("./constants");
var merge = require("deepmerge");
var path = require("path");
var qmateConf = require("../../helper/configurations/chrome.headless.conf");

// have main config file as default but overwrite environment specific information
exports.config = merge(qmateConf.config, {
  baseUrl: `${BASE_URL}/#/entity/sap.m.Table/sample/sap.m.sample.TableEditable`,

  suites: {
    testLearn: "table.spec.js",
  },
  params: {
    auth: {
      formType: "plain"
    }
  },
  specs: [path.resolve(__dirname, "table.spec.js")]
});
