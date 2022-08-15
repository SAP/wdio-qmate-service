const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 4,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/demoapps/demokit/rta/fiori-elements/test/index.html#Shell-home",

  specs: [
    path.resolve(__dirname, "clickBack.spec.js"),
    path.resolve(__dirname, "clickUserIcon.spec.js"),
    path.resolve(__dirname, "expectPageTitle.spec.js"),
    path.resolve(__dirname, "expectShellHeader.spec.js")
  ]
});