const { BASE_URL } = require("../../../../src/reuse/constants.ts");
const path = require("path");
const merge = require("deepmerge");
const profile = require("../../../helper/configurations/chrome.headless.conf");

exports.config = merge(profile.config, {
  maxInstances: 4,
  specFileRetries: 2,

  baseUrl: `${BASE_URL}/`,

  params: {
    import: {
      data: "./data/",
      customSourceData: "./customSourceData"
    }
  },

  specs: [
    path.resolve(__dirname, "storeEntryPoint.spec.js"),
    path.resolve(__dirname, "loadEntryPoint.spec.js"),
  ]
});
