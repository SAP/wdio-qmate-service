var path = require("path");
var merge = require("deepmerge");
var chromeConfig = require(path.resolve(process.env.CONFIG_TEMPLATES, "chrome.conf.js"));
exports.config = merge(chromeConfig.config, {
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: [["devtools"]],
});
