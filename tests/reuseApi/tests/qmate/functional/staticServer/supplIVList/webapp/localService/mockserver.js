sap.ui.define([
  "sap/ui/core/util/MockServer"
], function (MockServer) {
  "use strict";
  var oMockServer,
    _sAppModulePath = "ui.s2p.mm.supplinvoice.list/";

  return {

    /**
     * Initializes the mock server.
     * You can configure the delay with the URL parameter "serverDelay".
     * The local mock data in this folder is returned instead of the real data for testing.
     * @public
     */

    init: function () {
      var sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
        oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
        oDataSource = oManifest["sap.app"].dataSources;

      for (var sDataSourceName in oDataSource) {
        if (oDataSource[sDataSourceName].type === "OData") {
          this.createMockServer(oDataSource, sDataSourceName);
        }
      }
    },

    mockFunctionImportMockReqRes: function (oMockServer) {
      var aMyRequests = [];

      aMyRequests.push({
        method: "POST",
        path: new RegExp(".*Delete.*"),
        response: function (oXhr) {
          jQuery.sap.log.debug("Incoming request for createItemRequest");
          var sSupplInvNumber = oXhr.url.substring(oXhr.url.indexOf("SupplierInvoice="), oXhr.url.indexOf("&FiscalYear=")).split("=")[1];
          if (!sSupplInvNumber || sSupplInvNumber === "''") {
            oXhr.respondJSON(200,
              {
                "Content-Type": "application/json",
                "sap-message": JSON.stringify({
                  code: "APPL_MM_IV_MODEL/087",
                  message: "Draft was deleted.",
                  severity: "success",
                  target: "/C_SupplierInvoiceList(SupplierInvoice='',FiscalYear='0000',SupplierInvoiceUUID=guid'1c98ec18-1855-1ed9-aebe-2234baaa6f10')",
                  transition: false,
                  details: []
                })
              }, JSON.stringify({
                d: {
                  "Delete": {
                    "__metadata": { "type": "MM_SUPPLIER_INVOICE_LIST_ENH_SRV.ActionResult" }, "STATUS_CODE": "X"
                  }
                }
              }));
          } else {
            oXhr.respondJSON(400, {}, JSON.stringify({
              "error": {
                "code": "M8/255",
                "message": { "lang": "en", "value": "Document 5105603038 has been posted" },
                "innererror": {
                  "application": {
                    "component_id": "MM-IV-LIV",
                    "service_namespace": "/SAP/",
                    "service_id": "MM_SUPPLIER_INVOICE_LIST_ENH_SRV",
                    "service_version": "0001"
                  },
                  "transactionid": "41B666B821FE4E8AAADD0507511459A2",
                  "timestamp": "",
                  "Error_Resolution": {
                    "SAP_Transaction": "",
                    "SAP_Note": "See SAP Note 1797736 for error analysi",
                    "Batch_SAP_Note": "See SAP Note 1869434 for details about working with"
                  },
                  "errordetails": [{
                    "code": "M8/255",
                    "message": "Document 5105603038 has been posted",
                    "longtext_url": "/sap/opu/odata/iwbep/message_text;o=LOCAL/T100_longtexts(MSGID='M8',MSGNO='255',MESSAGE_V1='5105603038',MESSAGE_V2='2019',MESSAGE_V3='',MESSAGE_V4='')/$value",
                    "propertyref": "",
                    "severity": "error",
                    "transition": false,
                    "target": "/C_SupplierInvoiceList(SupplierInvoice='5105603038',FiscalYear='2019',SupplierInvoiceUUID=guid'98be94f7-bf51-1ee9-b6c0-dfa4a0d1d05c')"
                  }
                  ]
                }

              }
            })
            );
          }
        }
      });

      return aMyRequests;
    },

    createMockServer: function (oDataSource, sDataSourceName) {
      var oMainDataSource = oDataSource[sDataSourceName],
        sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUri.replace(".xml", ""), ".xml"),
        sMockServerPath = sMetadataUrl.slice(0, sMetadataUrl.lastIndexOf("/") + 1),
        // ensure there is a trailing slash
        sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/",
        aAnnotations = oMainDataSource.settings.annotations || [];

      oMockServer = new MockServer({
        rootUri: sMockServerUrl
      });

      MockServer.config({
        autoRespond: true
      });

      // load local mock data
      oMockServer.simulate(sMetadataUrl, {
        sMockdataBaseUrl: sMockServerPath + "/mockdata",
        bGenerateMissingMockData: false
      });

      var aRequests = oMockServer.getRequests();
      var aRequestsWithFunctionImport = this.mockFunctionImportMockReqRes(oMockServer);
      MockServer.prototype.setRequests.call(oMockServer, aRequestsWithFunctionImport.concat(aRequests));
      oMockServer.start();

      aAnnotations.forEach(function (sAnnotationName) {
        var oAnnotation = oDataSource[sAnnotationName],
          sUri = oAnnotation.uri,
          sLocalUri = jQuery.sap.getModulePath(_sAppModulePath + oAnnotation.settings.localUri.replace(".xml", ""), ".xml");

        ///annotations
        new MockServer({
          rootUri: sUri,
          requests: [{
            method: "GET",
            path: new RegExp(".*"),
            response: function (oXhr) {
              jQuery.sap.require("jquery.sap.xml");
              var oAnnotations = jQuery.sap.sjax({
                url: sLocalUri,
                dataType: "xml"
              }).data;
              oXhr.respondXML(200, {}, jQuery.sap.serializeXML(oAnnotations));
              return true;
            }
          }]

        }).start();

      });

    }
  };

});
