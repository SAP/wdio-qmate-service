const merge = require("deepmerge");
const chromeConfig = require("./chrome.conf.js");
exports.config = merge(chromeConfig.config, {
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    timeout: 900000,
  },
});
