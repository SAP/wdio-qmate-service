// configuration file.
exports.config = {
  // SELENIUM_PROMISE_MANAGER: false,

  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    "browserName": "chrome",
    "acceptInsecureCerts": true,
    "acceptSslCerts": true,
    chromeOptions: {
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--ignore-certificate-errors",
        "--disable-web-security",
        "--enable-logging",
        "--disable-infobars",
        "--headless",
        "--disable-gpu",
        "--window-size=1920,1200",
        "start-maximized",
        "--incognito",
        "--disable-extensions"
      ],
      prefs: {
        // disable chrome's password manager
        "profile.password_manager_enabled": false,
        "credentials_enable_service": false,
        "password_manager_enabled": false
      }
    }
  },

  params: {
    auth: {
      formType: "plain"
    },
    coverage: {
      status: true,
      coverage_files: ["webapp", "!webapp/test", "!webapp/localService", "!webapp/test-resources", "!webapp/resources"],
      sourcePath: "./sourceFolder"
    }
  },


  //baseUrl: "https://super-sensitive.domain.name/ui",
  // baseUrl: "https://super-sensitive.domain.name/ui",
  //baseUrl: "https://super-sensitive.domain.name/ui",
  //baseUrl: "https://uyt928-er9001.wdf.sap.corp/ui",
  baseUrl: "http://localhost:34005/webapp/test/flpSandboxMockServer.html#SupplierInvoice-list1?SupplierInvoiceWthnFiscalYear=5105602883%252F2019",

  // Framework to use. Jasmine is recommended.
  framework: "jasmine2",

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  suites: {
    homepage: "SILCheckFilters.spec.js"
  },
  allScriptsTimeout: 300000,
  getPageTimeout: 300000,
  idleTimeout: 300000,

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000
  }
};