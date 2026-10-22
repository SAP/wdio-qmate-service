const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  before: async function () {
    browser.overwriteCommand("url", async (origFn, url) => {
      await origFn(url);
      if (typeof url === "string" && !url.startsWith("http://localhost")) {
        await browser.waitUntil(async () => {
          return browser.execute(() => !!(window.sap && window.sap.ui && window.sap.ui.getCore && window.sap.ui.getCore() && document.readyState === "complete"));
        }, { timeout: 60000, interval: 500 });
      }
    });
    const origSwitchToIframe = util.browser.switchToIframe.bind(util.browser);
    util.browser.switchToIframe = async (...args) => {
      await origSwitchToIframe(...args);
      await browser.waitUntil(async () => {
        return browser.execute(() => !!(window.sap && window.sap.ui && window.sap.ui.getCore && window.sap.ui.getCore() && document.readyState === "complete"));
      }, { timeout: 60000, interval: 500 }).catch(() => {});
    };
  },

  baseUrl: "http://localhost:34005/",

  specs: [path.resolve(__dirname, "pressKey.spec.js"), path.resolve(__dirname, "clearAndFillActive.spec.js"), path.resolve(__dirname, "clearAndFillActiveAndRetry.spec.js"), path.resolve(__dirname, "fillActive.spec.js"), path.resolve(__dirname, "fillActiveAndRetry.spec.js")],

  services: [
    [
      "static-server",
      {
        port: 34005,
        folders: [
          {
            mount: "/waitForElements.html",
            path: path.resolve(__dirname, "../../../helper/website/waitForElements.html")
          },
          {
            mount: "/buttons.html",
            path: path.resolve(__dirname, "../../../helper/website/buttons.html")
          },
          {
            mount: "/checkBox.html",
            path: path.resolve(__dirname, "../../../helper/website/checkBox.html")
          },
          {
            mount: "/dropdown.html",
            path: path.resolve(__dirname, "../../../helper/website/dropdown.html")
          },
          {
            mount: "/forms.html",
            path: path.resolve(__dirname, "../../../helper/website/forms.html")
          },
          {
            mount: "/scrollPage.html",
            path: path.resolve(__dirname, "../../../helper/website/scrollPage.html")
          },
          {
            mount: "/tables.html",
            path: path.resolve(__dirname, "../../../helper/website/tables.html")
          }
        ]
      }
    ]
  ]
});
