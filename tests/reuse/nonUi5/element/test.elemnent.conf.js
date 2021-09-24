const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../../helper/configurations/chrome.headless.conf.js");
exports.config = merge(qmateConfig.config, {
  maxInstances: 6,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    path.resolve(__dirname, "waitForElementIsPresent.spec.js"),
    path.resolve(__dirname, "getDisplayedElements.spec.js"),
    path.resolve(__dirname, "waitForAllElements.spec.js"),
    path.resolve(__dirname, "waitForElementIsVisible.spec.js"),
    path.resolve(__dirname, "waitForElementIsClickable.spec.js"),
    path.resolve(__dirname, "getElementByCss.spec.js"),
    path.resolve(__dirname, "getElementById.spec.js"),
    path.resolve(__dirname, "getElementByClass.spec.js"),
    path.resolve(__dirname, "getElementByXPath.spec.js"),
    path.resolve(__dirname, "getValue.spec.js"),
    path.resolve(__dirname, "getElementByChild.spec.js"),
    path.resolve(__dirname, "scrollToElement.spec.js"),
    path.resolve(__dirname, "highlightElement.spec.js"),
    path.resolve(__dirname, "switchToIframe.spec.js"),
    path.resolve(__dirname, "switchToWindow.spec.js"),
    path.resolve(__dirname, "switchToNewWindow.spec.js"),
    path.resolve(__dirname, "getCurrentWindow.spec.js"),
    path.resolve(__dirname, "getElementByName.spec.js"),
    path.resolve(__dirname, "getElementByCssContainingText.spec.js"),
    path.resolve(__dirname, "isVisible.spec.js"),
    path.resolve(__dirname, "isElementPresent.spec.js"),
    path.resolve(__dirname, "isPresent.spec.js"),
    path.resolve(__dirname, "isPresentByCss.spec.js"),
    path.resolve(__dirname, "isPresentByXPath.spec.js")
  ],

  exclude: [],

  services: [
    ["chromedriver", {
      port: 4444
    }],
    ["static-server", {
      port: 34005,
      folders: [{
        mount: "/forms.html",
        path: path.resolve(__dirname, "../../../helper/website/forms.html")
      }]
    }]
  ],

  reporters: ["spec"],
});