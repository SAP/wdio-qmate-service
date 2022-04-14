const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/sauce.labs.tunnel.conf");

exports.config = merge(qmateConfiguration.config, {
  user: "sso-sap-C5264545",
  key: "bf563257-1589-44c5-96b9-d496a3f5b002",
  region: "eu-central-1",

  maxInstances: 5, // note: for the SAP account, only 5 parallel instances is a max value

  bail: 1,
  baseUrl: "http://localhost:34099/ui",

  services: [
    ["chromedriver", {
      port: 4444
    }]
    // ["static-server", {
    //   port: 34099,
    //   folders: [{
    //     mount: "/ui",
    //     path: path.resolve(__dirname, "./website/main.html")
    //   }, ]
    // }]
  ],

  specs: [
    path.resolve(__dirname, "navigateToApplication.spec.js"),
    // path.resolve(__dirname, "navigateToApplicationAndRetry.spec.js"),
    // path.resolve(__dirname, "navigateToApplicationWithQueryParams.spec.js"),
    // path.resolve(__dirname, "navigateToApplicationWithQueryParamsAndRetry.spec.js")
  ],

  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  },
});