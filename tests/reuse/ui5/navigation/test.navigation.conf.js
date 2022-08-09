const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 3,
  // baseUrl: "https://super-sensitive.domain.name/ui",

  specs: [
    path.resolve(__dirname, "navigateToSystemAndApplication.spec.js"),
    path.resolve(__dirname, "navigateToSystemAndApplicationAndRetry.spec.js"),
    path.resolve(__dirname, "expectUnsupportedNavigationPopup.spec.js"),
    path.resolve(__dirname, "closePopups.spec.js"),
  ]
});
