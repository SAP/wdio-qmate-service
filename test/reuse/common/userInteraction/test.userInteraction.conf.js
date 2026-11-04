const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");
const waitForUI5 = require("../../../helper/waitForUI5");
exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  before: async function () {
    browser.overwriteCommand("url", async (origFn, url) => {
      await origFn(url);
      await util.browser.switchToDefaultContent();
      if (typeof url === "string" && !url.startsWith("http://localhost")) {
        await waitForUI5();
      }
    });
    const origSwitchToIframe = util.browser.switchToIframe.bind(util.browser);
    util.browser.switchToIframe = async (...args) => {
      await origSwitchToIframe(...args);
      await waitForUI5({ optional: true });
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
