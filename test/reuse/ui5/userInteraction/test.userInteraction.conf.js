const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 5,
  specFileRetries: 2,

  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3",

  specs: [
    path.resolve(__dirname, "clear.spec.js"),
    path.resolve(__dirname, "clearAndFill.spec.js"),
    path.resolve(__dirname, "clearAndFillSmartFieldInput.spec.js"),
    path.resolve(__dirname, "clearAndRetry.spec.js"),
    path.resolve(__dirname, "clearAndFillAndRetry.spec.js"),
    path.resolve(__dirname, "clearAndFillSmartFieldInputAndRetry.spec.js"),
    path.resolve(__dirname, "click.spec.js"),
    path.resolve(__dirname, "clickAndRetry.spec.js"),
    path.resolve(__dirname, "clickSelectArrow.spec.js"),
    path.resolve(__dirname, "clickSelectArrowAndRetry.spec.js"),
    path.resolve(__dirname, "clickTab.spec.js"),
    path.resolve(__dirname, "selectFromTab.spec.js"),
    path.resolve(__dirname, "fill.spec.js"),
    path.resolve(__dirname, "fillAndRetry.spec.js"),
    path.resolve(__dirname, "openF4Help.spec.js"),
    path.resolve(__dirname, "searchFor.spec.js"),
    path.resolve(__dirname, "scrollToElement.spec.js"),
    path.resolve(__dirname, "selectBox.spec.js"),
    path.resolve(__dirname, "selectComboBox.spec.js"),
    path.resolve(__dirname, "selectMultiComboBox.spec.js"),
    path.resolve(__dirname, "doubleClick.spec.js"),
    path.resolve(__dirname, "rightClick.spec.js"),
    path.resolve(__dirname, "mouseOverElement.spec.js"),
    path.resolve(__dirname, "check.spec.js"),
    path.resolve(__dirname, "uncheck.spec.js")
    // path.resolve(__dirname, "dragAndDrop.spec.js")
  ]
});
