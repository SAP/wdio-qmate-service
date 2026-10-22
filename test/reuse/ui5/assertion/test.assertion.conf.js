const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");
const { BASE_URL } = require("../../../../src/reuse/constants.ts");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  before: async function () {
    const origSwitchToIframe = util.browser.switchToIframe.bind(util.browser);
    util.browser.switchToIframe = async (...args) => {
      await origSwitchToIframe(...args);
      await browser.waitUntil(async () => {
        return browser.execute(() => !!(window.sap && window.sap.ui && window.sap.ui.getCore && window.sap.ui.getCore() && document.readyState === "complete"));
      }, { timeout: 60000, interval: 500 });
    };
  },

  baseUrl: `${BASE_URL}/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_fiori_3`,

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
