// Note: functions to be executed in browser need to be stringified (fn.toString()).
// E.g. 'await lib.mockServerActionInBrowser(function (mockserver, method, afterCallbackAsString, params, done) {...})'
// It is not required to check the type (function or string) - toString() function can be applied to a string too.

/**
 * @class mockserver  
 * @memberof util
 */
const Mockserver = function () {

  const lib = require("../../../hooks/utils/lib.js"); // TODO

  /**
   * @function waitForUi5ApplicationLoad
   * @memberOf util.mockserver
   * @description Waits for the UI5 framework, XHR requests and busy indicators to be finished.
   * @example await util.mockserver.waitForUi5ApplicationLoad();
   */
  this.waitForUi5ApplicationLoad = async function () {
    await lib.waitUI5ToStabilize(); // Note: interval is hardcoded in lib.js
  };

  /**
   * @function interactWithMockServer
   * @memberOf util.mockserver
   * @description Executes client script function to interact with the mockserver instance. Code can be written in UI5 context.
   * @param {String} mockServerPath - The full path to the mockserver instance.
   * @param {Function} callback - The client script function you can use to interact with the mockserver instance.
   * Caution: The first and last parameter is reserved for the mockserver instance and the promise resolve function - done.
   * @param {Object} params - Additional parameters you would like to inject in your client script function.
   * @example const callback = function(mockServerInstance, params, done) {...};
   * await util.mockserver.interactWithMockServer("path/to/project/localService/main/mockserver", callback, params);
   */
  this.interactWithMockServer = async function (mockServerPath, callback, params) {
    await lib.mockServerActionInBrowser(callback, mockServerPath, params);
    await util.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function attachFunctionBefore
   * @memberOf util.mockserver
   * @description Attaches a callback function in mockserver attachBefore event to be executed.
   * @param {String} method - The attachBefore http method (GET or POST).
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method so the mockserver instance can be consumed].
   * @param {String | Object} beforeCallback - The callback function to be used in the native attachBefore method as described (https://sapui5.hana.ondemand.com/#/api/sap.ui.core.util.MockServer%23methods/Summary)
   * @param {Object} params - Additional parameters you would like to inject in your client script function
   * @example await util.mockserver.attachFunctionBefore("GET", "path/to/project/localService/main/mockserver", beforeCallback, params);
   */
  this.attachFunctionBefore = async function (method, mockServerPath, beforeCallback, params) {
    const beforeCallbackString = beforeCallback.toString();
    await lib.mockServerActionInBrowser(function (mockserver, method, beforeCallbackString, params, done) {
      const mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        util.console.error("Mockserver not yet initialized or method getMockServer is missing.");
        done();
      }
      const beforeCallback = "beforeCallback = " + beforeCallbackString;
      const fnFunction = eval(beforeCallback);
      mockServerInst.attachBefore(method, fnFunction);
      done();
    }, mockServerPath, method, beforeCallbackString, params);
    return util.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function attachFunctionAfter
   * @memberOf util.mockserver 
   * @description Attaches a callback function in mockserver attachAfter event to be executed
   * @param {String} method - The attachAfter http method (GET or POST).
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method so the mockserver instance can be consumed].
   * @param {String|Object} afterCallback - The callback function to be used in the native attachAfter method as described (https://sapui5.hana.ondemand.com/#/api/sap.ui.core.util.MockServer%23methods/Summary)
   * @param {Object} params - Additional parameters you would like to inject in your client script function
   * @example await util.mockserver.attachFunctionAfter("GET", "path/to/project/localService/main/mockserver",  afterCallback);
   */
  this.attachFunctionAfter = async function (method, mockServerPath, afterCallback, params) {
    const afterCallbackString = afterCallback.toString();
    await lib.mockServerActionInBrowser(function (mockserver, method, afterCallbackString, params, done) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        util.console.error("Mockserver not yet initialized or method getMockServer is missing.");
        done();
      }
      var afterCallback = "afterCallback = " + afterCallbackString;
      var fnFunction = eval(afterCallback);
      mockServerInst.attachAfter(method, fnFunction);
      done();
    }, mockServerPath, method, afterCallbackString, params);
    return util.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function addNewRequest
   * @memberOf util.mockserver
   * @description Adds new mock request
   * @param {String} method - The http method [GET,POST..].
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} urlPathRegex - The url path regex to filter the requests
   * @param {String} responseJsonPath - The json object or the path to your json file to be used as response [use relative path from the html page started].
   * @param {Integer} returnCode - The http response code to simulate for this mock request.
   * @param {Boolean} isText - If true then content type is text/plain otherwise application/json.
   * @param {String} responseMessages - Mocks the gw sap-message response messages [Don't forget to stringify your json before: JSON.stringify(msg)]
   * @param {String} responseLocation - Mocks the location response messages header
   * @example await util.mockserver.addNewRequest("GET","path/to/project/localService/main/mockserver", "*.Headers.*", "path/to/project/localService/main/mockdata/test.json", 200, true, JSON.stringify(msg));
   */
  this.addNewRequest = async function (method, mockServerPath, urlPathRegex, responseJsonPath, returnCode, isText, responseMessages, responseLocation) {
    var responseData = responseJsonPath;
    try {
      if (typeof responseJsonPath !== "string" && typeof responseJsonPath === "object") {
        responseData = JSON.stringify(responseJsonPath);
      }
    } catch (error) {
      throw new Error("Something went wrong with the conversion" + error);
    }
    // If undefined dont add any messages
    if (!responseMessages) {
      responseMessages = false;
    }
    // If undefined dont add any location
    if (!responseLocation) {
      responseLocation = false;
    }
    await lib.mockServerActionInBrowser(function (mockserver, method, urlPathRegex, responseJsonPath, responseMessages, responseLocation, returnCode, isText, done) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) throw new Error("Mockserver not yet initialized or method getMockServer is missing.");
      var fnResponse = function (oXhr) {
        // If connection close dont redo response
        if (oXhr.readyState && oXhr.readyState === 4) return true;
        var oData = null;
        try {
          if (isText && isText !== "false") {
            oData = responseJsonPath;
          } else {
            oData = JSON.parse(responseJsonPath);
          }
        } catch (e) {
          if (typeof responseJsonPath === "string" && !RegExp(".?([^\/\s]+\/)(.*)").test(responseJsonPath)) {
            oData = responseJsonPath;
          } else {
            if (isText && isText !== "false") {
              var oResponse = jQuery.sap.sjax({
                url: responseJsonPath,
                dataType: "text"
              });
            } else {
              oResponse = jQuery.sap.sjax({
                url: responseJsonPath,
                dataType: "json"
              });
            }
            if (oResponse.success) {
              if (isText && isText !== "false" && oResponse.data) {
                oData = oResponse.data;
              } else if (oResponse.data.d) {
                if (oResponse.data.d.results) {
                  oData = oResponse.data;
                } else if (oResponse.data.d) {
                  // Function Import or single data
                  oData = oResponse.data;
                } else {
                  util.console.error("The mock data are invalid.");
                }
              } else {
                if (Array.isArray(oResponse.data)) {
                  oData = oResponse.data;
                } else {
                  util.console.error("The mock data could not be loaded due to wrong format.");
                }
              }
            }
          }
        }
        var resHeader = {};
        resHeader["content-encoding"] = "identity";
        let parsedReturnCode = parseInt(returnCode);
        if (isNaN(parsedReturnCode)) {
          parsedReturnCode = 200;
        }
        if (isText && isText !== "false") {
          if (responseMessages && responseMessages !== "false") {
            resHeader["sap-message"] = responseMessages;
          }
          if (responseLocation && responseLocation !== "false") {
            resHeader["location"] = responseLocation;
          }
          resHeader["Content-Type"] = "text/plain;charset=utf-8";
          oXhr.respond(parsedReturnCode, resHeader, oData);
        } else {
          if (responseMessages && responseMessages !== "false") {
            resHeader["sap-message"] = responseMessages;
          }
          if (responseLocation && responseLocation !== "false") {
            resHeader["location"] = responseLocation;
          }
          resHeader["Content-Type"] = "application/json;charset=utf-8";
          oXhr.respond(parsedReturnCode, resHeader, JSON.stringify(oData));
        }
        return true;
      };
      var aRequests = mockServerInst.getRequests();
      const isOverride = false;
      if (!isOverride) {
        if (!urlPathRegex) {
          util.console.error("Path regex wasn't provided");
          done();
        }
        //Remove regexp slashes so we read them if needed
        var urlPathEscRegex = urlPathRegex.substring(1, urlPathRegex.length - 1);
        aRequests.push({
          method: method,
          path: new RegExp(urlPathEscRegex),
          response: fnResponse
        });
        mockServerInst.setRequests(aRequests);
      }
      done();
    }, mockServerPath, method, urlPathRegex, responseData, responseMessages, responseLocation, returnCode, isText);
    return util.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function removeRequest
   * @memberOf util.mockserver
   * @description Removes request mock [Doesn't work currently - Mockserver bug]
   * @param {String} method - The http method [GET,POST..].
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} urlPathRegex - The url path regex to filter the requests
   * @example await util.mockserver.removeRequest("GET","path/to/project/localService/main/mockserver", "*.Headers.*");
   */
  this.removeRequest = async function (method, mockServerPath, urlPathRegex) {
    await lib.mockServerActionInBrowser(function (mockserver, method, urlPathRegex, done) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        util.console.error("Mockserver not yet initialized or method getMockServer is missing.");
        done();
      }
      var aExistingRequests = mockServerInst.getRequests();
      var aRequests = [].concat(aExistingRequests);
      var elemDeleted = false;
      if (urlPathRegex && method && aExistingRequests) {
        //var urlRegEsc = RegExp(urlPathRegex).source.replace(/\\/g, "");
        for (let index = 0; index < aExistingRequests.length; index++) {
          const mockRequest = aExistingRequests[index];
          var regExpPath = mockRequest.path.toString();
          if (mockRequest.method === method && urlPathRegex === regExpPath) {
            aRequests.splice(index, 1);
            elemDeleted = true;
          }
        }
      }
      mockServerInst.setRequests(aRequests);
      done(elemDeleted);
    }, mockServerPath, method, urlPathRegex);
    return util.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function addOrOverrideRequest
   * @memberOf util.mockserver
   * @description Adds new or overrides an existing mock request
   * @param {String} method - The http method [GET,POST..].
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} urlPathRegex - The url path regex to filter the requests
   * @param {String} responseJsonPath - The json object or the path to your json file to be used as response [use relative path from the html page started].
   * @param {Integer} returnCode - The http response code to simulate for this mock request.
   * @param {Boolean} isText - If true then content type is text/plain otherwise application/json.
   * @param {String} responseMessages - Mocks the gw sap-message response messages [Don't forget to stringify your json before: JSON.stringify(msg)]
   * @param {String} responseLocation - Mocks the location response messages header
   * @example await util.mockserver.addOrOverrideRequest("GET","path/to/project/localService/main/mockserver", "*.Headers.*", "path/to/project/localService/main/mockdata/test.json", 200, true, JSON.stringify(msg));
   */
  this.addOrOverrideRequest = async function (method, mockServerPath, urlPathRegex, responseJsonPath, returnCode, isText, responseMessages, responseLocation) {
    var responseData = responseJsonPath;
    try {
      if (typeof responseJsonPath !== "string" && typeof responseJsonPath === "object") {
        responseData = JSON.stringify(responseJsonPath);
      }
    } catch (error) {
      throw new Error("Something went wrong with the conversion" + error);
    }
    // If undefined dont add any messages
    if (!responseMessages) {
      responseMessages = false;
    }
    // If undefined dont add any location
    if (!responseLocation) {
      responseLocation = false;
    }
    await lib.mockServerActionInBrowser(function (mockserver, method, urlPathRegex, responseJsonPath, responseMessages, responseLocation, returnCode, isText, done) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) throw new Error("Mockserver not yet initialized or method getMockServer is missing.");
      var fnResponse = function (oXhr) {
        // If connection close dont redo response
        if (oXhr.readyState && oXhr.readyState === 4) return true;
        var oData = null;
        try {
          if (isText && isText !== "false") {
            oData = responseJsonPath;
          } else {
            oData = JSON.parse(responseJsonPath);
          }
        } catch (e) {
          if (typeof responseJsonPath === "string" && !RegExp(".?([^\/\s]+\/)(.*)").test(responseJsonPath)) {
            oData = responseJsonPath;
          } else {
            if (isText && isText !== "false") {
              var oResponse = jQuery.sap.sjax({
                url: responseJsonPath,
                dataType: "text"
              });
            } else {
              oResponse = jQuery.sap.sjax({
                url: responseJsonPath,
                dataType: "json"
              });
            }
            if (oResponse.success) {
              if (isText && isText !== "false" && oResponse.data) {
                oData = oResponse.data;
              } else if (oResponse.data.d) {
                if (oResponse.data.d.results) {
                  oData = oResponse.data;
                } else if (oResponse.data.d) {
                  // Function Import or single data
                  oData = oResponse.data;
                } else {
                  util.console.error("The mock data are invalid.");
                }
              } else {
                if (Array.isArray(oResponse.data)) {
                  oData = oResponse.data;
                } else {
                  util.console.error("The mock data could not be loaded due to wrong format.");
                }
              }
            }
          }
        }
        var resHeader = {};
        resHeader["content-encoding"] = "identity";
        let parsedReturnCode = parseInt(returnCode);
        if (isNaN(parsedReturnCode)) {
          parsedReturnCode = 200;
        }
        if (isText && isText !== "false") {
          if (responseMessages && responseMessages !== "false") {
            resHeader["sap-message"] = responseMessages;
          }
          if (responseLocation && responseLocation !== "false") {
            resHeader["location"] = responseLocation;
          }
          resHeader["Content-Type"] = "text/plain;charset=utf-8";
          oXhr.respond(parsedReturnCode, resHeader, oData);
        } else {
          if (responseMessages && responseMessages !== "false") {
            resHeader["sap-message"] = responseMessages;
          }
          if (responseLocation && responseLocation !== "false") {
            resHeader["location"] = responseLocation;
          }
          resHeader["Content-Type"] = "application/json;charset=utf-8";
          oXhr.respond(parsedReturnCode, resHeader, JSON.stringify(oData));
        }
        return true;
      };
      var aRequests = mockServerInst.getRequests();
      const isOverride = false;
      if (!isOverride) {
        if (!urlPathRegex) {
          util.console.error("Path regex wasn't provided.");
          done();
        }
        //Remove regexp slashes so we read them if needed
        var urlPathEscRegex = urlPathRegex.substring(1, urlPathRegex.length - 1);
        aRequests.push({
          method: method,
          path: new RegExp(urlPathEscRegex),
          response: fnResponse
        });
        mockServerInst.setRequests(aRequests);
      }
      done();
    }, mockServerPath, method, urlPathRegex, responseData, responseMessages, responseLocation, returnCode, isText);
    return util.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function startMockServer
   * @memberOf util.mockserver
   * @description (Re-)Starts mock server instance
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @example await util.mockserver.startMockServer("path/to/project/localService/main/mockserver");
   */
  this.startMockServer = async function (mockServerPath) {
    await lib.mockServerActionInBrowser(function (mockserver, done) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        util.console.error("Mockserver not yet initialized or method getMockServer is missing.");
        done();
      }
      mockServerInst.start();

      done();
    }, mockServerPath);
    return util.mockserver.waitForUi5ApplicationLoad();
  };



  /**
   * @function initMockServer
   * @memberOf util.mockserver
   * @description Initializes the provide mockserver instance on the fly
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} mockServerOptions - The mock server options
   * @example await util.mockserver.initMockServer("path/to/project/localService/main/mockserver", mockServerOptions);
   */
  this.initMockServer = async function (mockServerPath, mockServerOptions) {
    var mockServerOpts = JSON.stringify(mockServerOptions);
    return lib.mockServerActionInBrowser(function (mockserver, mockServerOpts, done) {
      if (!mockserver) {
        util.console.error("Mockserver file not yet loaded or is missing.");
        done();
      }
      mockserver.init(JSON.parse(mockServerOpts)).catch(function (oError) {
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
    }, mockServerPath, mockServerOpts);
  };


  /**
   * @function initApplication
   * @memberOf util.mockserver
   * @description Initializes the application [Used in the beginning of script, once the mockserver is fully initialized and request mocking is done]
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @example await util.mockserver.initApplication("path/to/project/localService/main/mockserver");
   */
  this.initApplication = async function (mockServerPath) {
    await lib.mockServerActionInBrowser(function (mockserver, done) {
      if (!mockserver) {
        util.console.error("Mockserver file not yet loaded or is missing.");
        done();
      }
      // eslint-disable-next-line no-undef
      sap.ushell.Container.createRenderer().placeAt("content");
      done();
    }, mockServerPath);
    return util.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function stopMockServer
   * @memberOf util.mockserver
   * @description Stops the mockserver instance
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @example await util.mockserver.stopMockServer("path/to/project/localService/main/mockserver");
   */
  this.stopMockServer = async function (mockServerPath) {
    return lib.mockServerActionInBrowser(function (mockserver, done) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        util.console.error("Mockserver not yet initialized or method getMockServer is missing.");
        done();
      }
      mockServerInst.stop();
      done();
    }, mockServerPath);
  };

  /**
   * @function loadMockDataFile
   * @memberOf util.mockserver
   * @description Loads a mock data file
   * @param {String} filePath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {Boolean} isText - If true then content type is text/plain otherwise application/json.
   * @returns {String} The json object
   * @example await util.mockserver.loadMockDataFile("path/to/project/mockData/myData.json", true);
   */
  this.loadMockDataFile = async function (filePath, isText) {
    return lib.loadMockData(filePath, isText);
  };

  /**
   * @function getEntitySetData
   * @memberOf util.mockserver
   * @description Retrieves entity data
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} entitySetName - The entity set name
   * @returns {Array} An array of json objects
   * @example await util.mockserver.getEntitySetData("path/to/project/localService/main/mockserver", "Headers");
   */
  this.getEntitySetData = async function (mockServerPath, entitySetName) {
    return lib.mockServerActionInBrowser(function (mockserver, entitySetName, done) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        util.console.error("Mockserver not yet initialized or method getMockServer is missing.");
        done();
      }
      const oData = mockServerInst.getEntitySetData(entitySetName);
      done(oData);
    }, mockServerPath, entitySetName);
  };

  /**
   * @function setEntitySetData
   * @memberOf util.mockserver
   * @description Override entity data entries
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} entitySetName - The entity name
   * @param {String} entries - The json object to be used as data to be inserted [use relative path from the html page started].
   * @example await util.mockserver.setEntitySetData("path/to/project/localService/main/mockserver", "Headers", entries);
   */
  this.setEntitySetData = async function (mockServerPath, entitySetName, entries) {
    var responseData = entries;
    try {
      if (typeof entries !== "string" && typeof entries === "object") {
        responseData = JSON.stringify(entries);
      }
    } catch (error) {
      throw new Error("Something went wrong with the conversion:" + error);
    }
    return lib.mockServerActionInBrowser(function (mockserver, entitySetName, entries, done) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        util.console.error("Mockserver not yet initialized or method getMockServer is missing.");
        done();
      }
      var oData = [];
      try {
        var tempOData = JSON.parse(entries);
        if (!Array.isArray(tempOData)) {
          if (tempOData.d.results) oData = [].concat(tempOData.d.results);
          else if (tempOData.d) oData = [].concat(tempOData.d);
          else oData = [].concat(tempOData);
        } else {
          oData = [].concat(tempOData);
        }
      } catch (e) {
        var oResponse = jQuery.sap.sjax({
          url: entries,
          dataType: "json"
        });
        if (oResponse.success) {
          if (oResponse.data.d) {
            if (oResponse.data.d.results) {
              oData = oResponse.data.d.results;
            } else if (oResponse.data.d) {
              // Single data
              oData.push(oResponse.data.d);
            } else if (oResponse.data) {
              // Fallback Single data
              oData.push(oResponse.data);
            } else {
              util.console.error("The mock data is invalid.");
            }
          } else {
            if (Array.isArray(oResponse.data)) {
              oData = [].concat(oResponse.data);
            } else {
              util.console.error("The mock data could not be loaded due to wrong format.");
            }
          }
        }
      }
      mockServerInst.setEntitySetData(entitySetName, oData);
      done(oData);
    }, mockServerPath, entitySetName, responseData);
  };

};
module.exports = new Mockserver();