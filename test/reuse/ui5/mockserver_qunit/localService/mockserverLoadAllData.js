/* eslint-disable no-undef */
/* eslint-disable no-console */
sap.ui.define([
  "sap/ui/core/util/MockServer",
  "sap/ui/model/json/JSONModel",
  "sap/base/Log"
], function (MockServer, JSONModel, Log) {
  "use strict";

  var _sAppPath = "sap/ui/demo/nav/",
    _sJsonFilesPath = _sAppPath + "localService/mockdata";

  return {

    init: function () {

      return new Promise(function(fnResolve, fnReject) {
        var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
          oManifestModel = new JSONModel(sManifestUrl);

        oManifestModel.attachRequestCompleted(function () {
          var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath),
            oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/employeeRemote"),
            sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

					// create
          var oMockServer = new MockServer({
            rootUri: oMainDataSource.uri
          });

					// configure
          MockServer.config({
            autoRespond: true,
            autoRespondAfter: 500
          });

					// simulate
          oMockServer.simulate(sMetadataUrl, {
            sMockdataBaseUrl: sJsonFilesUrl
          });

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
          oMockServer.setRequests(aRequests);
					// start
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
    }
  };
});