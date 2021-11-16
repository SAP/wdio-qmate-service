const path = require("path");
const WdioQmateService = require("@wdio/qmate-service");
exports.config = {
  runner: "local",

  // Default timeout for all waitFor* commands.
  waitforTimeout: 60000,

  // UI5 waiting timeout waiting for page to load
  waitForUI5Timeout: 90000,

  // UI5 waiting timeout waiting for page to load polling interval
  waitForUI5PollingInterval: 150,

  // After finding elements will recount again to make sure the count is stable, as many times as defined here
  stableCountTries: 1,

  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 90000,

  // Default request retries count
  connectionRetryCount: 3,
  capabilities: [{

    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    maxInstances: 3,
    //
    browserName: "chrome",
    acceptInsecureCerts: true,
    // If outputDir is provided WebdriverIO can capture driver session logs
    // it is possible to configure which logTypes to include/exclude.
    // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    // excludeDriverLogs: ['bugreport', 'server'],

    "goog:chromeOptions": {
      // to run chrome headless the following flags are required
      // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--ignore-certificate-errors",
        "--disable-web-security",
        "--allow-insecure-localhost",
        "--enable-logging",
        "--disable-infobars",
        "--headless",
        "--disable-gpu",
        "--window-size=1920,1200",
        //"start-maximized",
        //"--incognito",
        "--disable-extensions",
        "--lang=en-US"
      ],
      prefs: {
        // disable chrome's annoying password manager
        "profile.password_manager_enabled": false,
        "credentials_enable_service": false,
        "password_manager_enabled": false,
        "intl.accept_languages": "en,en_US"
      }
    }
  }],

  logLevel: "error",
  bail: 0,
  services: [["selenium-standalone"], [WdioQmateService], ["static-server", {
    port: 34005,
    folders: [
      {mount: "/test/flpSandboxMockServer.html", path: path.resolve(__dirname, "../../flpSandboxMockServer.html")},
      // Need to mount "/" path to "mockSample" root folder
      // as UI5 app will request Component.js, manifest.json, localService inner files, i18n inner files etc.
      {mount: "/", path: path.resolve(__dirname, "../../../")},
    ]
  }]],

  params: {
    // clientInterval: 50,
    auth: {
      formType: "plain"
    }
  },

  baseUrl: "http://localhost:34005/test/flpSandboxMockServer.html#home-view",

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: [
    path.resolve(__dirname, "qunitExecution/specs/runQUnitTests.spec.js"),
    path.resolve(__dirname, "testDisplayNotFound/specs/testDisplayNotFound.spec.js"),
    path.resolve(__dirname, "testShowEmployeeList/specs/testShowEmployeeList.spec.js")
  ],
  reporters: ["spec"],

  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 3000000
  }
};