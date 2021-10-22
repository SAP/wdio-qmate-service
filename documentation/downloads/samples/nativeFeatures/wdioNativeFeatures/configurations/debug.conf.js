var merge = require("deepmerge");
var chromeConfig = require("./chrome.headless.conf");
exports.config = merge(chromeConfig.config, {
  //
  maxInstances: 1,
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    timeout: 900000,
  },

});
