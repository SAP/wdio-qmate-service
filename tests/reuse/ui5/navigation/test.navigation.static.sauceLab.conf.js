const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/sauce.labs.tunnel.conf");

exports.config = merge(qmateConfiguration.config, {
  user: "sso-sap-D056896",
  key: "dbdea161-6aad-42aa-a0ae-296a3bd322ef",
  region: "eu-central-1",

  maxInstances: 2, // note: for the SAP account, only 2 parallel instances is a max value


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