var constants = require("./constants.js");
var mockDataMapper = require("./mockDataMapper.js");

module.exports = {

  /**
   * This function is used to convert a json message in stringify form so the messages can be passed in the addOrOverrideRequest method
   * @param {String} msg The json message to be mocked (sap-message header)
   */
  formatMsg: function (msg) {
    try {
      return JSON.stringify(msg);
    } catch (error) {
      throw new Error("Could not convert message to string, make sure your input is a valid json");
    }
  },

  /**
   * This method make sure that the mockserver is appropriately configured and started and in the end
   * (once mockserver initialization is finished), the application initialization will be performed
   * @param {Object} startMockParams The start up parameters to be used for the mockserver
   */
  initMockServerAndApplication: async function (startMockParams) {
    // Executes the init method of your mockserver file
    await mockDataMapper.initMockServer(constants.applicationPath, startMockParams, constants.mockDelay);
    // Starts mockserver
    await ui5.mockserver.startMockServer(constants.pathToMockServer);
    // Initialize application by calling sap.ushell.Container.createRenderer().placeAt("content");
    await ui5.mockserver.initApplication(constants.pathToMockServer);
  },

  /**
   * This method make sure that the mockserver is appropriately configured and started
   * @param {Object} startMockParams The start up parameters to be used for the mockserver
   */
  initMockServer: async function (startMockParams) {
    // Executes the init method of your mockserver file
    await mockDataMapper.initMockServer(constants.applicationPath, startMockParams, constants.mockDelay);
    // Starts mockserver
    await ui5.mockserver.startMockServer(constants.pathToMockServer);
  },

  /**
   * This method make sure that the mockserver is appropriately configured and started
   * @param {Object} startMockParams The start up parameters to be used for the mockserver
   */
  initMockServerDynamically: async function (startMockParams) {
    await ui5.mockserver.waitForUi5ApplicationLoad();
    // Prepare mockserver initialization parameters
    var oMockServerOptions = {
      appPath: constants.applicationPath,
      mockDataPath: startMockParams.pathToMockDataRel,
      entitiesToload: startMockParams.entitiesToload,
      delay: 1
    };
    await ui5.mockserver.interactWithMockServer(constants.pathToMockServer, function (mockserver, mockServerOpts, done) {
      if (!mockserver) throw new Error("Mockserver file not yet loaded or is missing");
      //debugger;
      mockserver.init(mockServerOpts).catch(function (oError) {
        // load MessageBox only when needed as it otherwise bypasses the preload of sap.m
        // eslint-disable-next-line no-undef
        sap.ui.require(["sap/m/MessageBox"], function (MessageBox) {
          MessageBox.error(oError.message);
        });
      }).finally(function () {
        // initialize the embedded component on the HTML page
        // eslint-disable-next-line no-undef
        sap.ui.require(["sap/ui/core/ComponentSupport"]);
        done();
      });
    }, oMockServerOptions);
  },

  /**
   * This method make sure that the application initialization is appropriately finalized
   * @param {Object} startMockParams The start up parameters to be used for the mockserver
   */
  initApplication: async function () {
    // Initialize application by calling sap.ushell.Container.createRenderer().placeAt("content");
    await ui5.mockserver.initApplication(constants.pathToMockServer);
  },

  initApplicationDynamically: async function () {
    await ui5.mockserver.waitForUi5ApplicationLoad();
    await ui5.mockserver.interactWithMockServer(constants.pathToMockServer, function (mockserver, done) {
      if (!mockserver) throw new Error("Mockserver file not yet loaded or is missing");
      //debugger;
      // eslint-disable-next-line no-undef
      sap.ushell.Container.createRenderer().placeAt("content");
      done();
    });
  },

  /**
   * Set mocked draft http response for the request triggered by UI action
   * @param {String|Object} expandedEntityOrPath The path to  json or the json object used as response
   * @param {String} sMessages The mock messages response to be used
   */
  getEmployeesCount: async function (nCount) {
    // Add expand response
    await ui5.mockserver.addOrOverrideRequest(
      constants.httpMethod.get,
      constants.pathToMockServer,
      constants.regexRequests.getEmployeesCount,
      nCount,
      200, true);

    //Register new response [start mockserver is required]    
    await ui5.mockserver.startMockServer(constants.pathToMockServer);
  },

  /**
   * Set mocked draft http response for the request triggered by UI action
   * @param {String|Object} expandedEntityOrPath The path to  json or the json object used as response
   * @param {String} sMessages The mock messages response to be used
   */
  getEmployees: async function (expandedEntityOrPath) {
    var expandedEntity = expandedEntityOrPath;
    if (typeof expandedEntityOrPath === "string") {
      expandedEntity = await ui5.mockserver.loadMockDataFile(expandedEntityOrPath);
    }
    // Add expand response specific
    await ui5.mockserver.addNewRequest(
      constants.httpMethod.get,
      constants.pathToMockServer,
      constants.regexRequests.getEmployees,
      expandedEntity,
      200, false);

    //Register new response [start mockserver is required]    
    await ui5.mockserver.startMockServer(constants.pathToMockServer);
  },


  setResumes: async function (expandedEntityOrPath) {
    var expandedEntity = expandedEntityOrPath;
    if (typeof expandedEntityOrPath === "string") {
      expandedEntity = await ui5.mockserver.loadMockDataFile(expandedEntityOrPath);
    }
    // Add expand response specific
    await ui5.mockserver.setEntitySetData(
      constants.pathToMockServer,
      constants.entitySet.resumes,
      expandedEntity);

    //Register new response [start mockserver is required]    
    await ui5.mockserver.startMockServer(constants.pathToMockServer);
  },

  setEmployee: async function (expandedEntityOrPath) {
    var expandedEntity = expandedEntityOrPath;
    if (typeof expandedEntityOrPath === "string") {
      expandedEntity = await ui5.mockserver.loadMockDataFile(expandedEntityOrPath);
    }
    // Add expand response specific
    await ui5.mockserver.setEntitySetData(
      constants.pathToMockServer,
      constants.entitySet.employees,
      expandedEntity);

    //Register new response [start mockserver is required]    
    await ui5.mockserver.startMockServer(constants.pathToMockServer);
  },

  /**
   * Set mocked draft http response for the request triggered by UI action
   * @param {String|Object} expandedEntityOrPath The path to  json or the json object used as response
   * @param {String} sMessages The mock messages response to be used
   */
  getResumes: async function (expandedEntityOrPath) {
    var expandedEntity = expandedEntityOrPath;
    if (typeof expandedEntityOrPath === "string") {
      expandedEntity = await ui5.mockserver.loadMockDataFile(expandedEntityOrPath);
    }
    // Add expand response specific
    await ui5.mockserver.addNewRequest(
      constants.httpMethod.get,
      constants.pathToMockServer,
      constants.regexRequests.getResumes,
      expandedEntity,
      200, false);

    //Register new response [start mockserver is required]    
    await ui5.mockserver.startMockServer(constants.pathToMockServer);
  },

  getResumeForEmployee: async function () {
    const oParams = {
      regexp: constants.regexRequests.getResumeForEmployee
    };
    // Add expand response specific
    await ui5.mockserver.attachFunctionAfter(
      constants.httpMethod.get,
      constants.pathToMockServer,
      function (oEvent) {
        var urlPathEscRegex = oParams.regexp.substring(1, oParams.regexp.length - 1);
        if (RegExp(urlPathEscRegex).test(oEvent.getParameter("oXhr").url)) {
          var filterData = oEvent.getParameter("oFilteredData");
          if (filterData) {
            filterData.Information = filterData.Information + " tests";
          }
        }
      }, oParams
    );

    const dataResums = await ui5.mockserver.getEntitySetData(constants.pathToMockServer, constants.entitySet.resumes);
    //Register new response [start mockserver is required]    
    await ui5.mockserver.startMockServer(constants.pathToMockServer);
    return dataResums[0].Information;
  },

  /**
   * Take coverage snapshot, use in teardown
   */
  takeCoverageSnapshot: async function () {
    // In qmate-wdio browser parameters can be accessed only via `browser.config.params`.
    // Please have a look at migration guide (documentation/topics/migration.md)
    if (browser.config.params && browser.config.params.coverage.status && browser.config.params.coverage.status !== "false") {
      await util.browser.sleepAndCollectCoverage(2000);
    }
  }
};