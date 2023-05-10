/* eslint-disable no-console */
/* eslint-disable no-undef */

sap.ui.define([
  "sap/ui/core/util/MockServer",
  "sap/ui/model/json/JSONModel",
  "sap/base/Log",
  "sap/base/util/UriParameters",
  "sap/ui/thirdparty/sinon"
], function (
  MockServer,
  JSONModel,
  Log,
  UriParameters,
  // eslint-disable-next-line no-unused-vars
  sinonInst) {
  "use strict";

  var oMockServer;

  var mockServerHandler = {

    
		/**
		 * Initializes the mock server asynchronously.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @protected
		 * @param {object} [oOptionsParameter] init parameters for the mockserver
		 * @returns{Promise} a promise that is resolved when the mock server has been started
		 */
    init : function (oOptionsParameter) {
      // Assign options coming from the setup json file
      var oOptions = oOptionsParameter || {};
      var sJsonFilesPath = oOptions.appPath + oOptions.mockDataPath;
      // Return a promise 
      return new Promise(function(fnResolve, fnReject) {
        var sManifestUrl = sap.ui.require.toUrl(oOptions.appPath + "manifest.json"),
          oManifestModel = new JSONModel(sManifestUrl);
        // Load manifest.json
        oManifestModel.attachRequestCompleted(function ()  {
          var oUriParameters = UriParameters.fromQuery(window.location.search),
            // parse manifest for local metadata URI
            sJsonFilesUrl = sap.ui.require.toUrl(sJsonFilesPath),
            oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/employeeRemote");
          if (!oMainDataSource) {
            fnReject("Main Service cannot be detected in manifest.json");
          }
          var sMetadataUrl = sap.ui.require.toUrl(oOptions.appPath + oMainDataSource.settings.localUri),
          // ensure there is a trailing slash
            sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/";
					// create a mock server instance or stop the existing one to reinitialize
          if (!oMockServer) {
            oMockServer = new MockServer({
              rootUri: sMockServerUrl
            });
          } else {
            oMockServer.stop();
          }
					// configure mock server with the given options or a default delay of 0.5s
          MockServer.config({
            autoRespond : true,
            autoRespondAfter : (oOptions.delay || oUriParameters.get("serverDelay") || 500)
          });
					// simulate all requests using mock data
          oMockServer.simulate(sMetadataUrl, {
            sMockdataBaseUrl : sJsonFilesUrl,
            bGenerateMissingMockData : false,
            aEntitySetsNames: oOptions.entitiesToload
          });

          var aRequests = oMockServer.getRequests();
					// compose an error response for requesti
          var fnResponse = function (iErrCode, sMessage, aRequest) {
            aRequest.response = function(oXhr){
              oXhr.respond(iErrCode, {"Content-Type": "text/plain;charset=utf-8"}, sMessage);
            };
          };

					// simulate metadata errors
          if (oOptions.metadataError || oUriParameters.get("metadataError")) {
            aRequests.forEach(function (aEntry) {
              if (aEntry.path.toString().indexOf("$metadata") > -1) {
                fnResponse(500, "metadata Error", aEntry);
              }
            });
          }

					// simulate request errors
          var sErrorParam = oOptions.errorType || oUriParameters.get("errorType"),
            iErrorCode = sErrorParam === "badRequest" ? 400 : 500;
          if (sErrorParam) {
            aRequests.forEach(function (aEntry) {
              fnResponse(iErrorCode, sErrorParam, aEntry);
            });
          }

          ////////ADD FOR DEBUGGING PURPOSES ONLY////////////
          // eslint-disable-next-line no-redeclare
          var aRequests = oMockServer.getRequests();
          aRequests.push({
            method: "GET",
            path: new RegExp(".*"),
            response: function (oXhr) {
              console.error("Request URL--->" + oXhr.url);
              return false; // Continue default processing
            }
          });
          aRequests.push({
            method: "POST",
            path: new RegExp(".*"),
            response: function (oXhr) {
              console.error("Request URL--->" + oXhr.url);
              return false; // Continue default processing
            }
          });
          ////////////////////////////////////////////////////	

          // set requests and start the server
          oMockServer.setRequests(aRequests);
          // Starting from qmate
          oMockServer.start();

          Log.info("Running the app with mock data");
          fnResolve();
        });

        oManifestModel.attachRequestFailed(function () {
          var sError = "Failed to load application manifest";
          Log.error(sError);
          fnReject(new Error(sError));
        });
      });
    },

	/**
	 * @public returns the mockserver of the app, should be used in integration tests
	 * @returns {sap.ui.core.util.MockServer} the mockserver instance
	 */
    getMockServer : function () {
      return oMockServer;
    }
  };

  return mockServerHandler;
});
