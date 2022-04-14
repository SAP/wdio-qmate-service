const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../../../helper/configurations/report.headless.conf.js");
exports.config = merge(qmateConfig.config, {
  maxInstances: 6,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    path.resolve(__dirname, "getBindingValue.spec.js"),
    path.resolve(__dirname, "getDisplayedElement.spec.js"),
    path.resolve(__dirname, "getDisplayedChildElement.spec.js"),
    path.resolve(__dirname, "getDisplayedElements.spec.js"),
    path.resolve(__dirname, "getElementByText.spec.js"),
    path.resolve(__dirname, "getElementId.spec.js"),
    path.resolve(__dirname, "getValue.spec.js"),
    path.resolve(__dirname, "highlightElement.spec.js"),
    path.resolve(__dirname, "scrollToElement.spec.js"),
    path.resolve(__dirname, "isVisible.spec.js"),
    path.resolve(__dirname, "waitUI5ToStabilize.spec.js")
  ],
  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  },
});