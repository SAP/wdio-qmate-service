const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/sauce.labs.conf");

exports.config = merge(qmateConfiguration.config, {
  user: "sso-sap-C5264545",
  key: "bf563257-1589-44c5-96b9-d496a3f5b002",
  region: "eu-central-1",

  maxInstances: 5, // note: for the SAP account, only 5 parallel instances is a max value

  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    path.resolve(__dirname, "clear.spec.js"),
    path.resolve(__dirname, "clearAndFill.spec.js"),
    path.resolve(__dirname, "clearAndFillSmartFieldInput.spec.js"),
    path.resolve(__dirname, "clearAndRetry.spec.js"),
    path.resolve(__dirname, "clearAndFillAndRetry.spec.js"),
    path.resolve(__dirname, "click.spec.js"),
    path.resolve(__dirname, "clickAndRetry.spec.js"),
    path.resolve(__dirname, "clickSelectArrow.spec.js"),
    path.resolve(__dirname, "clickSelectArrowAndRetry.spec.js"),
    path.resolve(__dirname, "clickTab.spec.js"),
    path.resolve(__dirname, "fill.spec.js"),
    path.resolve(__dirname, "fillAndRetry.spec.js"),
    path.resolve(__dirname, "openF4Help.spec.js"),
    path.resolve(__dirname, "searchFor.spec.js"),
    path.resolve(__dirname, "scrollToElement.spec.js"), // error
    path.resolve(__dirname, "selectBox.spec.js"),
    path.resolve(__dirname, "selectComboBox.spec.js"),
    path.resolve(__dirname, "selectMultiComboBox.spec.js")
  ],

  exclude: [],


  mochaOpts: {
    timeout: 2000000,
  },
});