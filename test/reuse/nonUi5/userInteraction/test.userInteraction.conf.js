const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  baseUrl: "http://localhost:34005/",

  specs: [
    path.resolve(__dirname, "clear.spec.js"),
    path.resolve(__dirname, "clearAndFill.spec.js"),
    path.resolve(__dirname, "clearAndRetry.spec.js"),
    path.resolve(__dirname, "clearAndFillAndRetry.spec.js"),
    path.resolve(__dirname, "click.spec.js"),
    path.resolve(__dirname, "clickAndRetry.spec.js"),
    path.resolve(__dirname, "clickElementInSvg.spec.js"),
    path.resolve(__dirname, "doubleClick.spec.js"),
    path.resolve(__dirname, "fill.spec.js"),
    path.resolve(__dirname, "fillAndRetry.spec.js"),
    path.resolve(__dirname, "mouseOverElement.spec.js"),
    path.resolve(__dirname, "moveCursorAndClick.spec.js"),
    path.resolve(__dirname, "checkAttributeAndValue.spec.js"),
    path.resolve(__dirname, "scrollToElement.spec.js"),
    path.resolve(__dirname, "rightClick.spec.js"),
    path.resolve(__dirname, "dragAndDrop.spec.js"),
    path.resolve(__dirname, "check.spec.js"),
    path.resolve(__dirname, "uncheck.spec.js"),
  ],

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
          },
          {
            mount: "/dragAndDropWdioExample.html",
            path: path.resolve(__dirname, "../../../helper/website/dragAndDropWdioExample.html")
          },
          {
            mount: "/dragAndDropFailing.html",
            path: path.resolve(__dirname, "../../../helper/website/dragAndDropFailing.html")
          }
        ]
      }
    ]
  ]
});
