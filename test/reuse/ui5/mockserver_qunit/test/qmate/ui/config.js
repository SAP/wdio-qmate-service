const path = require("path");
const merge = require("deepmerge");
const plainConfig = require("../../../../../../helper/configurations/base.conf.js");
exports.config = merge(plainConfig.config, {
  capabilities: [{

    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    // maxInstances: 3,
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
        // "--headless",
        // "--disable-gpu",
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

  services: [
    ["selenium-standalone"],
    ["static-server", {
      port: 34005,
      folders: [{
        mount: "/test/flpSandboxMockServer.html",
        path: path.resolve(__dirname, "../../flpSandboxMockServer.html")
      },
        // Need to mount "/" path to "mockNavigation" root folder
        // as UI5 app will request Component.js, manifest.json, localService inner files, i18n inner files etc.
      {
        mount: "/",
        path: path.resolve(__dirname, "../../../")
      },
      ]
    }]
  ],

  params: {
    // clientInterval: 50,
    auth: {
      formType: "plain"
    },
    coverage: {
      status: false,
      coverage_files: [
        "Component.js",
        "controller",
        "!test",
        "!localService",
        "!test-resources",
        "!resources"
      ],
      sourcePath: "./sourceFolder"
    }
  },

  baseUrl: "http://localhost:34005/test/flpSandboxMockServer.html#home-view",

  specs: [
    path.resolve(__dirname, "qunitExecution/specs/runQUnitTests.spec.js"),
    path.resolve(__dirname, "testDisplayNotFound/specs/testDisplayNotFound.spec.js"),
    path.resolve(__dirname, "testShowEmployeeList/specs/testShowEmployeeList.spec.js")
  ]
});