/* eslint-disable no-return-await */
/* eslint-disable no-useless-escape */
// Note: functions to be executed in browser need to be stringified (fn.toString()).
// E.g. `await lib.mockServerActionInBrowser(function (mockserver, method, fnAfterCallbackAsString, oParams, done){...})`
// It is not required to check the type (function or string) - toString() function can be applied to a string too.

"use strict";

import { RequestMethodType } from "./types/mockserver.types";

/**
 * @class mockserver  
 * @memberof ui5
 */
export class Mockserver {

  private lib = require("../../../scripts/hooks/utils/lib.js");

  // =================================== MAIN ===================================
  /**
   * @function waitForUi5ApplicationLoad
   * @memberOf ui5.mockserver
   * @description Waits for the UI5 framework to load and makes sure XHR request finished und busy indicators are not visible anymore.
   * @param {Integer} interval - The intervals to use when waiting UI5 to load.
   * @example await ui5.mockserver.waitForUi5ApplicationLoad(100);
   */
  async waitForUi5ApplicationLoad (interval = 100) {
    await this.lib.waitUI5ToStabilize(); // Note: interval is hardcoded in  lib.js
  };

  /**
   * @function interactWithMockServer
   * @memberOf ui5.mockserver
   * @description Execute client script function to enable interaction with mockserver instance [you can write code in ui5 app context]
   * @param {String} mockServerPath - The full path to your mockserver instance
   * @param {String | Object} fnCallback - The client script function that you can use to interact with your mockserver instance.
   * [Caution] The first and last parameter is reserved (1st param is the mockserver instance and last parameter the promise resolve function - done)
   * @param {String} oParams - Additional parameters you would like to inject in your client script function
   * @example await ui5.mockserver.interactWithMockServer("path/to/project/localService/main/mockserver", fnCallback, oParams);
   */
  async interactWithMockServer (mockServerPath: string, fnCallback: any, oParams: string) {
    // fnCallback-> function(mockServerInstance, oParams, done){...}
    await this.lib.mockServerActionInBrowser(fnCallback, mockServerPath, oParams);
    return await ui5.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function attachFunctionBefore
   * @memberOf ui5.mockserver
   * @description Attaches a callback function in mockserver attachBefore event to be executed
   * @param {String} method - The attachAfter http method [GET or POST].
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method so the mockserver instance can be consumed].
   * @param {String | Object} fnBeforeCallback - The callback function to be used in the native attachBefore method as described (https://sapui5.hana.ondemand.com/#/api/sap.ui.core.ui5.mockserver%23methods/Summary)
   * @param {Object} oParams - Additional parameters you would like to inject in your client script function
   * @example await ui5.mockserver.attachFunctionBefore("GET", "path/to/project/localService/main/mockserver", fnBeforeCallback, oParams);
   */
  async attachFunctionBefore (method: RequestMethodType, mockServerPath: string, fnBeforeCallback: any, oParams: any) {
    const fnBeforeCallbackString = fnBeforeCallback.toString();
    await this.lib.mockServerActionInBrowser(function (mockserver: any, method: RequestMethodType, fnBeforeCallbackString: any, oParams: any, done: any) {
      const mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        console.error("Mockserver not yet initialized or method getMockServer is missing");
        done();
      }
      const beforeCallback = "beforeCallback = " + fnBeforeCallbackString;
      const fnFunction = eval(beforeCallback);
      mockServerInst.attachBefore(method, fnFunction);
      done();
    }, mockServerPath, method, fnBeforeCallbackString, oParams);
    return await ui5.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function attachFunctionAfter
   * @memberOf ui5.mockserver 
   * @description Attaches a callback function in mockserver attachAfter event to be executed
   * @param {String} method - The attachAfter http method [GET or POST].
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method so the mockserver instance can be consumed].
   * @param {String|Object} fnAfterCallback - The callback function to be used in the native attachAfter method as described (https://sapui5.hana.ondemand.com/#/api/sap.ui.core.ui5.mockserver%23methods/Summary)
   * @param {Object} oParams - Additional parameters you would like to inject in your client script function
   * @example await ui5.mockserver.attachFunctionAfter("GET", "path/to/project/localService/main/mockserver",  fnAfterCallback);
   */
  async attachFunctionAfter (method: RequestMethodType, mockServerPath: string, fnAfterCallback: any, oParams: any) {
    const fnAfterCallbackString = fnAfterCallback.toString();
    await this.lib.mockServerActionInBrowser(function (mockserver: any, method: RequestMethodType, fnAfterCallbackString: any, oParams: any, done: any) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        console.error("Mockserver not yet initialized or method getMockServer is missing");
        done();
      }
      var afterCallback = "afterCallback = " + fnAfterCallbackString;
      var fnFunction = eval(afterCallback);
      mockServerInst.attachAfter(method, fnFunction);
      done();
    }, mockServerPath, method, fnAfterCallbackString, oParams);
    return await ui5.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function addNewRequest
   * @memberOf ui5.mockserver
   * @description Adds new mock request
   * @param {String} method - The http method [GET,POST..].
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} urlPathRegex - The url path regex to filter the requests
   * @param {String} responseJsonPath - The json object or the path to your json file to be used as response [use relative path from the html page started].
   * @param {Integer} returnCode - The http response code to simulate for this mock request.
   * @param {Boolean} isText - If true then content type is text/plain otherwise application/json.
   * @param {String} responseMessages - Mocks the gw sap-message response messages [Don't forget to stringify your json before: JSON.stringify(msg)]
   * @param {String} responseLocation - Mocks the location response messages header
   * @example await ui5.mockserver.addNewRequest("GET","path/to/project/localService/main/mockserver", "*.Headers.*", "path/to/project/localService/main/mockdata/test.json", 200, true, JSON.stringify(msg));
   */
  async addNewRequest (method: RequestMethodType, mockServerPath: string, urlPathRegex: string, responseJsonPath: string, returnCode: number, isText: boolean, responseMessages: any, responseLocation: any) {
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
    await this.lib.mockServerActionInBrowser(function (mockserver: any, method: RequestMethodType, urlPathRegex: any, responseJsonPath: any, responseMessages: any, responseLocation: any, returnCode: number, isText: any, done: any) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) throw new Error("Mockserver not yet initialized or method getMockServer is missing");
      var fnResponse = function (oXhr: any) {
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
              // @ts-ignore
              var oResponse = jQuery.sap.sjax({
                url: responseJsonPath,
                dataType: "text"
              });
            } else {
              // @ts-ignore
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
                  console.error("The mock data are invalid");
                }
              } else {
                if (Array.isArray(oResponse.data)) {
                  oData = oResponse.data;
                } else {
                  console.error("The mock data could not be loaded due to wrong format!");
                }
              }
            }
          }
        }
        var resHeader: any = {};
        resHeader["content-encoding"] = "identity";
        // @ts-ignore
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
          console.error("path regex wasn't provided");
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
    return await ui5.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function removeRequest
   * @memberOf ui5.mockserver
   * @description Removes request mock [Doesn't work currently - Mockserver bug]
   * @param {String} method - The http method [GET,POST..].
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} urlPathRegex - The url path regex to filter the requests
   * @example await ui5.mockserver.removeRequest("GET","path/to/project/localService/main/mockserver", "*.Headers.*");
   */
  async removeRequest (method: RequestMethodType, mockServerPath: string, urlPathRegex: string) {
    await this.lib.mockServerActionInBrowser(function (mockserver: any, method: RequestMethodType, urlPathRegex: string, done: any) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        console.error("Mockserver not yet initialized or method getMockServer is missing");
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
    return await ui5.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function addOrOverrideRequest
   * @memberOf ui5.mockserver
   * @description Adds new or overrides an existing mock request
   * @param {String} method - The http method [GET,POST..].
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} urlPathRegex - The url path regex to filter the requests
   * @param {String} responseJsonPath - The json object or the path to your json file to be used as response [use relative path from the html page started].
   * @param {Integer} returnCode - The http response code to simulate for this mock request.
   * @param {Boolean} isText - If true then content type is text/plain otherwise application/json.
   * @param {String} responseMessages - Mocks the gw sap-message response messages [Don't forget to stringify your json before: JSON.stringify(msg)]
   * @param {String} responseLocation - Mocks the location response messages header
   * @example await ui5.mockserver.addOrOverrideRequest("GET","path/to/project/localService/main/mockserver", "*.Headers.*", "path/to/project/localService/main/mockdata/test.json", 200, true, JSON.stringify(msg));
   */
  async addOrOverrideRequest (method: RequestMethodType, mockServerPath: string, urlPathRegex: string, responseJsonPath: string, returnCode: number, isText: any, responseMessages: any, responseLocation: any) {
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
    await this.lib.mockServerActionInBrowser(function (mockserver: any, method: RequestMethodType, urlPathRegex: string, responseJsonPath: string, responseMessages: any, responseLocation: any, returnCode: any, isText: any, done: any) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) throw new Error("Mockserver not yet initialized or method getMockServer is missing");
      var fnResponse = function (oXhr: any) {
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
              // @ts-ignore
              var oResponse = jQuery.sap.sjax({
                url: responseJsonPath,
                dataType: "text"
              });
            } else {
              // @ts-ignore
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
                  console.error("The mock data are invalid");
                }
              } else {
                if (Array.isArray(oResponse.data)) {
                  oData = oResponse.data;
                } else {
                  console.error("The mock data could not be loaded due to wrong format!");
                }
              }
            }
          }
        }
        var resHeader: any = {};
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
          console.error("path regex wasnt provided");
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
    return await ui5.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function startMockServer
   * @memberOf ui5.mockserver
   * @description (Re-)Starts mock server instance
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @example await ui5.mockserver.startMockServer("path/to/project/localService/main/mockserver");
   */
  async startMockServer (mockServerPath: string) {
    await this.lib.mockServerActionInBrowser(function (mockserver: any, done: any) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        console.error("Mockserver not yet initialized or method getMockServer is missing");
        done();
      }
      mockServerInst.start();

      done();
    }, mockServerPath);
    return await ui5.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function initMockServer
   * @memberOf ui5.mockserver
   * @description Initializes the provide mockserver instance on the fly
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} mockServerOptions - The mock server options
   * @example await ui5.mockserver.initMockServer("path/to/project/localService/main/mockserver", mockServerOptions);
   */
  async initMockServer (mockServerPath: string, mockServerOptions: string) {
    var mockServerOpts = JSON.stringify(mockServerOptions);
    return await this.lib.mockServerActionInBrowser(function (mockserver: any, mockServerOpts: string, done: any) {
      if (!mockserver) {
        console.error("Mockserver file not yet loaded or is missing");
        done();
      }
      mockserver.init(JSON.parse(mockServerOpts)).catch(function (oError: any) {
        // load MessageBox only when needed as it otherwise bypasses the preload of sap.m
        // eslint-disable-next-line no-undef
        sap.ui.require(["sap/m/MessageBox"], function (MessageBox: any) {
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
   * @memberOf ui5.mockserver
   * @description Initializes the application [Used in the beggining of script, once the mockserver is fully initialized and request mocking is done]
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @example await ui5.mockserver.initApplication("path/to/project/localService/main/mockserver");
   */
  async initApplication (mockServerPath: string) {
    await this.lib.mockServerActionInBrowser(function (mockserver: any, done: any) {
      if (!mockserver) {
        console.error("Mockserver file not yet loaded or is missing");
        done();
      }
      // eslint-disable-next-line no-undef
      sap.ushell.Container.createRenderer().placeAt("content");
      done();
    }, mockServerPath);
    return await ui5.mockserver.waitForUi5ApplicationLoad();
  };

  /**
   * @function stopMockServer
   * @memberOf ui5.mockserver
   * @description Stops the mockserver instance
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @example await ui5.mockserver.stopMockServer("path/to/project/localService/main/mockserver");
   */
  async stopMockServer (mockServerPath: string) {
    return await this.lib.mockServerActionInBrowser(function (mockserver: any, done: any) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        console.error("Mockserver not yet initialized or method getMockServer is missing");
        done();
      }
      mockServerInst.stop();
      done();
    }, mockServerPath);
  };

  /**
   * @function loadMockDataFile
   * @memberOf ui5.mockserver
   * @description Loads a mock data file
   * @param {String} filePath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {Boolean} isText - If true then content type is text/plain otherwise application/json.
   * @returns {String} The json object
   * @example await ui5.mockserver.loadMockDataFile("path/to/project/mockData/myData.json", true);
   */
  async loadMockDataFile (filePath: string, isText: boolean) {
    return await this.lib.loadMockData(filePath, isText);
  };

  /**
   * @function getEntitySetData
   * @memberOf ui5.mockserver
   * @description Retrieves entity data
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} entitySetName - The entity set name
   * @returns {Array} An array of json objects
   * @example await ui5.mockserver.getEntitySetData("path/to/project/localService/main/mockserver", "Headers");
   */
  async getEntitySetData (mockServerPath: string, entitySetName: string) {
    return await this.lib.mockServerActionInBrowser(function (mockserver: any, entitySetName: string, done: any) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        console.error("Mockserver not yet initialized or method getMockServer is missing");
        done();
      }
      const oData = mockServerInst.getEntitySetData(entitySetName);
      done(oData);
    }, mockServerPath, entitySetName);
  };

  /**
   * @function setEntitySetData
   * @memberOf ui5.mockserver
   * @description Override entity data entries
   * @param {String} mockServerPath - The full path to your mockserver file [make sure you implemented getMockServer method in this file to return the mockserver instance].
   * @param {String} entitySetName - The entity name
   * @param {String} entries - The json object to be used as data to be inserted [use relative path from the html page started].
   * @example await ui5.mockserver.setEntitySetData("path/to/project/localService/main/mockserver", "Headers", entries);
   */
  async setEntitySetData (mockServerPath: string, entitySetName: string, entries: string) {
    var responseData = entries;
    try {
      if (typeof entries !== "string" && typeof entries === "object") {
        responseData = JSON.stringify(entries);
      }
    } catch (error) {
      throw new Error("Something went wrong with the conversion" + error);
    }
    return await this.lib.mockServerActionInBrowser(function (mockserver: any, entitySetName: string, entries: any, done: any) {
      var mockServerInst = mockserver.getMockServer();
      if (!mockServerInst) {
        console.error("Mockserver not yet initialized or method getMockServer is missing");
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
          // @ts-ignore
          oData = [].concat(tempOData);
        }
      } catch (e) {
        // @ts-ignore
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
              console.error("The mock data are invalid");
            }
          } else {
            if (Array.isArray(oResponse.data)) {
              oData = [].concat(oResponse.data);
            } else {
              console.error("The mock data could not be loaded due to wrong format!");
            }
          }
        }
      }
      mockServerInst.setEntitySetData(entitySetName, oData);
      done(oData);
    }, mockServerPath, entitySetName, responseData);
  };

};
export default new Mockserver();