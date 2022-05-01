const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/sauce.labs.conf");

exports.config = merge(qmateConfiguration.config, {
  user: "sso-sap-D056896",
  key: "dbdea161-6aad-42aa-a0ae-296a3bd322ef",
  region: "eu-central-1",

  maxInstances: 2, // note: for the SAP account, only 2 parallel instances is a max value


  bail: 1,

  specs: [
    path.resolve(__dirname, "clickClose.spec.js"),
    path.resolve(__dirname, "expectToBeVisible.spec.js")
  ],

  exclude: [],


  mochaOpts: {
    timeout: 2000000,
  },
});