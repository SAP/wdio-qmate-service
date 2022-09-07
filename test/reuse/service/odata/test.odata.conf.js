const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,
  
  baseUrl: "https://services.odata.org/v4/TripPinServiceRW/",
  
  specs: [
    path.resolve(__dirname, "getEntitySet.spec.js"),
    path.resolve(__dirname, "get.spec.js")
  ]
});