const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3",

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
    path.resolve(__dirname, "expectMessageToastTextToBe.spec.js"),
    path.resolve(__dirname, "expectCssPropertyValueToBe.spec.js")
  ]
});
