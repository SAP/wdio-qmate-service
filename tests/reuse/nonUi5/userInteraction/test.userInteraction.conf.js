const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  bail: 1,
  baseUrl: "http://localhost:34005/",

  specs: [
    // path.resolve(__dirname, "clear.spec.js"),
    // path.resolve(__dirname, "clearAndFill.spec.js"),
    // path.resolve(__dirname, "clearAndRetry.spec.js"),
    // path.resolve(__dirname, "clearAndFillAndRetry.spec.js"),
    // path.resolve(__dirname, "click.spec.js"),
    // path.resolve(__dirname, "clickAndRetry.spec.js"),
    // path.resolve(__dirname, "doubleClick.spec.js"),
    // path.resolve(__dirname, "fill.spec.js"),
    // path.resolve(__dirname, "fillAndRetry.spec.js"),
    // path.resolve(__dirname, "moveCursorAndClick.spec.js"),
    // path.resolve(__dirname, "checkAttributeAndValue.spec.js"),
    // path.resolve(__dirname, "scrollToElement.spec.js"),
    // path.resolve(__dirname, "rightClick.spec.js"),
    path.resolve(__dirname, "dragAndDrop.spec.js")
  ],
  exclude: [],

  services: [
    ["chromedriver", {
      port: 4444
    }],
    ["static-server", {
      port: 34005,
      folders: [{
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
        mount: "/dragAndDrop.html",
        path: path.resolve(__dirname, "../../../helper/website/dragAndDrop.html")
      }
      ]
    }]
  ]
});