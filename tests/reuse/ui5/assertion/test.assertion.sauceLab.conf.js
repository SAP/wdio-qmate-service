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
    path.resolve(__dirname, "expectAttributeToBe.spec.js"),
    path.resolve(__dirname, "expectValidationError.spec.js"),
    path.resolve(__dirname, "expectValidationSuccess.spec.js"),
    path.resolve(__dirname, "expectAttributeToContain.spec.js"),
    path.resolve(__dirname, "expectBindingPathToBe.spec.js"),
    path.resolve(__dirname, "expectBindingContextPathToBe.spec.js"),
    path.resolve(__dirname, "expectTextToBe.spec.js"),
    path.resolve(__dirname, "expectValueToBe.spec.js"),
    path.resolve(__dirname, "expectValueToBeDefined.spec.js"),
    path.resolve(__dirname, "expectToBeNotEnabled.spec.js"),
    path.resolve(__dirname, "expectToBeEnabled.spec.js"),
    path.resolve(__dirname, "expectToBeVisible.spec.js"),
    path.resolve(__dirname, "expectToBeNotVisible.spec.js"),
    path.resolve(__dirname, "expectToBeVisibleInViewport.spec.js"),
    path.resolve(__dirname, "expectMessageToastTextToBe.spec.js")
  ],

  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  }
});