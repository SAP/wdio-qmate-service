var path = require("path");
var merge = require("deepmerge");
var vyperConfig = require("../../../../configurations/chrome.headless.conf.js");
exports.config = merge(vyperConfig.config, {
  maxInstances: 1,
  bail: 0,

  specFileRetries: 2,
  specFileRetriesDelay: 1,
  specFileRetriesDeferred: true,

  specs: [
    path.resolve(__dirname, "retryGlobal.test.js"),
    path.resolve(__dirname, "successFileForGlobal.test.js")
  ],
});
