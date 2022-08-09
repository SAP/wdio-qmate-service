
var constants = require("./constants.js");
module.exports = {
  /**
   * Initialize the mockserver by calling the mocksever.js file method init() and getMockServer()
   * @param {String} appPath 
   * @param {String} mockDataPath 
   * @param {Number} delay 
   */
  initMockServer: async function(appPath, mockDataPath, delay) {
    if (mockDataPath && appPath) {
      // Prepare mockserver initialization parameters
      var oMockServerOptions = {
        appPath: appPath,
        mockDataPath: mockDataPath.pathToMockDataRel,
        entitiesToload: mockDataPath.entitiesToload,
        delay: delay
      };
      // Call mockserver initMockServer qmate utility method
      await ui5.mockserver.initMockServer(constants.pathToMockServer, oMockServerOptions);
    }
  }
};