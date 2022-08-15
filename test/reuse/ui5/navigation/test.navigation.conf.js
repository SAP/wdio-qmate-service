const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,
  
  // baseUrl: "https://qs9-702.wdf.sap.corp/ui",

  specs: [
    path.resolve(__dirname, "navigateToSystemAndApplication.spec.js"),
    path.resolve(__dirname, "navigateToSystemAndApplicationAndRetry.spec.js"),
    path.resolve(__dirname, "expectUnsupportedNavigationPopup.spec.js"),
    path.resolve(__dirname, "closePopups.spec.js")
  ]
});
