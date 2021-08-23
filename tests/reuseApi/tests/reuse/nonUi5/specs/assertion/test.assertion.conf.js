const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../../../../configurations/chrome.headless.conf.js");
exports.config = merge(qmateConfig.config, {
  maxInstances: 6,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    path.resolve(__dirname, "expectDefined.spec.js"),
    path.resolve(__dirname, "expectUndefined.spec.js"),
    path.resolve(__dirname, "expectEqual.spec.js"),
    path.resolve(__dirname, "expectUnequal.spec.js"),
    path.resolve(__dirname, "expectTrue.spec.js"),
    path.resolve(__dirname, "expectToBeVisible.spec.js"),
    path.resolve(__dirname, "expectValueToBe.spec.js"),
    path.resolve(__dirname, "isVisible.spec.js"),
    path.resolve(__dirname, "isElementPresent.spec.js"),
    path.resolve(__dirname, "isPresent.spec.js"),
    path.resolve(__dirname, "isPresentByCss.spec.js"),
    path.resolve(__dirname, "isPresentByXPath.spec.js"),
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  // baseUrl for static service: "http://localhost:34005/"
  services: [
    ["chromedriver", { port: 4444 }],
    ["static-server", {
      port: 34005,
      folders: [
        { mount: "/waitForElements.html", path: path.resolve(__dirname, "../../website/waitForElements.html") },
        { mount: "/buttons.html", path: path.resolve(__dirname, "../../website/buttons.html") },
        { mount: "/checkBox.html", path: path.resolve(__dirname, "../../website/checkBox.html") },
        { mount: "/dropdown.html", path: path.resolve(__dirname, "../../website/dropdown.html") },
        { mount: "/forms.html", path: path.resolve(__dirname, "../../website/forms.html") },
        { mount: "/scrollPage.html", path: path.resolve(__dirname, "../../website/scrollPage.html") },
        { mount: "/hiddenAndVisible.html", path: path.resolve(__dirname, "../../website/hiddenAndVisible.html") },
        { mount: "/tables.html", path: path.resolve(__dirname, "../../website/tables.html") }
      ]
    }]
  ],
  // The number of times to retry the entire specfile when it fails as a whole
  //specFileRetries: 1,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html
  reporters: ["spec"],
});