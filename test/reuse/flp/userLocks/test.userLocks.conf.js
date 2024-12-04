const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  params: {
    import: {
      data: "./data/"
    }
  },
  maxInstances: 1,

  specs: [
    path.resolve(__dirname, "getNumberOfLockEntries.spec.js"),
    path.resolve(__dirname, "deleteExistingLockEntries.spec.js"),
  ]
});
