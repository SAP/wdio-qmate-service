const merge = require("deepmerge");
const baseConfig = require("./base.conf.js");

exports.config = merge(baseConfig.config, {
  port: 4723,

  services: [
    [
      "appium",
      {
        logPath: "./logs",
        logFileName: "qmate-appium.log"
      }
    ]
  ]
});
