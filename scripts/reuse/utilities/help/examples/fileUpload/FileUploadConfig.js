// An example configuration file.
exports.config = {
  directConnect: true,
  // Capabilities to be passed to the webdriver instance [1]
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      args: [
        "--start-maximized",
        "--disable-web-security",
        "--enable-logging",
        "--disable-infobars",
        "--no-sandbox",
        "--ignore-certificate-errors"
      ]
    }
  },

  params: {
    auth: {
      formType: "plain"
    },
    coverage: false,
    maximizeWindow: true
  },
  baseUrl:
    "https://sapui5.hana.ondemand.com/#/entity/sap.m.UploadCollection/sample/sap.m.sample.UploadCollection",

  framework: "jasmine2",

  specs: ["FileUpload.spec.js"],

  allScriptsTimeout: 29000, //important for loading to complete
  getPageTimeout: 12000,
  idleTimeout: 10000,

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    showColors: false,
    defaultTimeoutInterval: 50000
  }
};
