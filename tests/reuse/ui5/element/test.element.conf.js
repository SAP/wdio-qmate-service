const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../configurations/chrome.headless.conf");
exports.config = merge(qmateConfig.config, {
  maxInstances: 6,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    path.resolve(__dirname, "getBindingValue.spec.js"),
    path.resolve(__dirname, "getDisplayedElement.spec.js"),
    path.resolve(__dirname, "getDisplayedElements.spec.js"),
    path.resolve(__dirname, "getDisplayedChildElement.spec.js"),
    path.resolve(__dirname, "getElementByText.spec.js"),
    path.resolve(__dirname, "getElementId.spec.js"),
    path.resolve(__dirname, "getPropertyValue.spec.js"),
    path.resolve(__dirname, "highlightElement.spec.js"),
    path.resolve(__dirname, "isVisible.spec.js")
  ],

  exclude: [],

  reporters: ["spec"],

  mochaOpts: {
    timeout: 2000000,
  },
});