var path = require("path");
var merge = require("deepmerge");
var chromeConfig = require(path.resolve(process.env.CONFIG_TEMPLATES, "chrome.conf.js"));
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
