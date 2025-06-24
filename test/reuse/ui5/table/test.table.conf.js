const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 6,
  specFileRetries: 2,

  specs: [
    path.resolve(__dirname, "clickSettingsButton.spec.js"),
    path.resolve(__dirname, "sortColumnAscending.spec.js"),
    path.resolve(__dirname, "sortColumnDescending.spec.js"),
    path.resolve(__dirname, "getTotalNumberOfRows.spec.js"),
    path.resolve(__dirname, "getTotalNumberOfRowsByValues.spec.js"),
    path.resolve(__dirname, "getSelectorForRowByIndex.spec.js"),
    path.resolve(__dirname, "getSelectorsForRowsByValues.spec.js"),
    path.resolve(__dirname, "getAllColumnValuesByName.spec.js"),
    path.resolve(__dirname, "openItemByIndex.spec.js"),
    path.resolve(__dirname, "openItemByValues.spec.js"),
    path.resolve(__dirname, "selectRowByIndex.spec.js"),
    path.resolve(__dirname, "selectRowByValues.spec.js"),
    path.resolve(__dirname, "selectAllRows.spec.js"),
    path.resolve(__dirname, "deselectRowByIndex.spec.js"),
    path.resolve(__dirname, "deselectAllRows.spec.js")
  ]
});
