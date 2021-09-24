/**
 * @class odata
 * @memberof service.odata
 */
const OData = function () {
  const util = require("util");
  const urlLib = require("url").URL;
  const curl = require("curl");


  let Service;
  try {
    Service = require("@sap_oss/odata-library/lib/Service.js");
  } catch (error) {
    util.console.error("OData test client Service issue: Probably @sap_oss/odata-library was not installed as a npm module.");
  }

  //@TODO: markdown that there is no draft for odata-API's
  //If user wants to send requests against normal Services UUID and isActiveEntity as key are mandatory!

  /**
   * @function init
   * @memberOf service.odata
   * @description Initializes The service to work with.
   * XCSRF-Token will be automatically fetched and stored in the service instance.
   * Cookies will also automatically assembled and stored in the service instance.
   * @param {url} url - The base url of the service
   * @param {username} username - The username.
   * @param {password} password - The password of the username.
   * @returns {Object} The initialized service object.
   * @example const url = "https://hbr-715.wdf.sap.corp/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
   * srv = await service.odata.init(url, user, password);
   */
  this.init = async function (url, username, password, loggingEnabled = false) {
    const logger = {
      "trace": () => {},
      "debug": console.debug,
      "info": console.info,
      "warn": console.warn,
      "error": console.error
    };

    const srv = new Service({
      "logger": loggingEnabled ? logger : "",
      "url": url,
      "auth": {
        "username": username,
        "password": password
      },
      "parameters": { //Define initial request by $metadata?sap-client=<client-number>&sap-documentation=&sap-language=EN
        "client": "715",
        "documentation": ["heading", "quickinfo"],
        "language": "EN"
      },
      "strict": false // ignore non critical errors, e.g. orphaned annotations
    });
    await srv.init;

    return srv;
  };

  /**
   * @function get
   * @memberOf service.odata
   * @description makes a GET request.
   * @param {service} service - Instance of the service
   * @param {entitySet} entitySet - The entitySet you want to GET from.
   * @param {keys} keys - The required keys for the GET-request.
   * @example const url = "https://qs9-715.wdf.sap.corp/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
   * srv = await service.odata.init(url, user, password);
   */
  this.get = async function (srv, entitySet, options) {
    return srv[entitySet].get(options);
  };

  /**
   * @function getEntitySet
   * @memberOf service.odata
   * @description GET's the EntitySet collection.
   * @param {service} service - Instance of the service
   * @param {entitySet} entitySet - The entitySet you want to GET from.
   * @example const url = "https://qs9-715.wdf.sap.corp/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
   * srv = await service.odata.init(url, user, password);
   * let res = await service.odata.getEntitySet(service, "A_PurchaseOrder");
   */
  this.getEntitySet = async function (srv, entitySet) {
    if (!srv) {
      throw new Error("Service is not defined. Please make sure to initialize and pass the service.");
    } else {
      const res = await srv[entitySet].get();
      return res;
    }
  };

  /**
   * @function isFeatureToggleActivated
   * @memberOf service.odata
   * @description checks if a feature toggle is switched on or off
   * @param {service} service - Instance of the service
   * @param {featureName} featureName - The name of the feature you want know the status of.
   * @example const url = browser.params.systemUrl + "/sap/opu/odata/SAP/CA_FM_FEATURE_TOGGLE_STATUS_SRV/";
   * service = await service.odata.init(url, user, password);
   * let isFeatureActive = await service.odata.isFeatureToggleActivated(service, "MM_PUR_PO_BATCHES_IN_MANAGE_PO");
   */
  this.isFeatureToggleActivated = async function (srv, featureName) {
    const res = await this.getEntitySet(srv, "ToggleStatusSet");
    for (const featureEntity of Object.values(res)) {
      if (featureEntity.Featureid === featureName) {
        //feature toggle is disabled if found
        util.console.info(`Feature Toggle "${featureName}" is disabled.`);
        return false;
      }
    }
    //feature toggle is enabled if NOT found
    util.console.info(`Feature Toggle "${featureName}" is enabled.`);
    return true;
  };

  /**
   * @function post

   * @memberOf service.odata
   * @description makes a POST request.
   * @param {service} service - Instance of the service
   * @param {entitySet} entitySet - The entitySet you want to POST against.
   * @param {payload} payload - The payload for the POST-request.
   * @example let keys = {
   *              "PurchaseOrder": "4500007108",
   *              "DraftUUID": "00000000-0000-0000-0000-000000000000",
   *              "IsActiveEntity": "true"
   *          };
   * let res = await service.odata.get(service, "A_PurchaseOrder", keys);
   */
  this.post = async function (srv, entitySet, payload) {
    return srv[entitySet].post(payload);
  };

  /**
   * @function merge
   * @memberOf service.odata
   * @description makes a MERGE request.
   * @param {service} service - Instance of the service
   * @param {entitySet} entitySet - The entitySet you want to MERGE in.
   * @param {payload} payload - The payload for the MERGE-request.
   * @example let res = await service.odata.merge(service, "A_PurchaseOrderScheduleLine", {
   *              "PurchasingDocument": "4500007108",
   *              "PurchasingDocumentItem": "10",
   *              "ScheduleLine": "1",
   *              "ScheduleLineDeliveryDate": new Date()
   *          };
   * let res = await service.odata.get(service, "A_PurchaseOrder", keys);
   */
  this.merge = async function (srv, entitySet, payload) {
    const res = await srv[entitySet].merge(payload);
    return res;
  };

  /**
  * @function delete
  * @memberOf service.odata
  * @description makes a DELETE request.
  * @param {service} service - Instance of the service
  * @param {entitySet} entitySet - The entitySet you want to DELETE.
  * @param {options} options - The options for the DELETE-request.
  * @example  let options = {
                "PurchaseOrder": "",
                "DraftUUID": draftUUID,
                "IsActiveEntity": false
              };
              await service.odata.delete(service, "C_PurchaseOrderTP", options);
  */
  this.delete = async function (srv, entitySet, options) {
    const res = await srv[entitySet].delete(options);
    return res;
  };

  /**
  * @function callFunctionImport
  * @memberOf service.odata
  * @description makes a function import request on an OData service.
  * @param {service} service - Instance of the service
  * @param {entitySet} functionImportName - Name of Function Import
  * @param {options} options - parameters for function import
  * @example  const options = {
    CentralRequestForQuotation : "7500000026",
    Supplier : "100006"
  };
  const res = await oData.common.service.callFunctionImport(service, functionImportName, options);
  */
  this.callFunctionImport = async function (srv, functionImportName, options) {
    const functionImport = srv.functionImports[functionImportName];

    const res = await functionImport.call(options);
    return res;
  };

  /**
  * @function getOutputManagementPdfStream
  * @memberOf service.odata
  * @description returns a stream of output management pdf file.
  * @param {outputConf} outputConf - Configuration for the output management pdf.
  * @param {url} url - system url
  * @param {username} - username for login
  * @param {password} - password for login
  * @example  const outputConf = {
                ApplObjectType: "REQUEST_FOR_QUOTATION",
                ApplObjectId: "7000002653",
                ItemId: "1"
              };
              const pdfStream = await oData.common.service.getOutputManagementPdfStream(outputConf, url, user, password);

  */
  this.getOutputManagementPdfStream = async function (outputConf, url, username, password) {
    if (arguments.length < 4) {
      throw new Error("getOutputManagementPdfStream Failed. Please send correct parameters");
    }
    const uri = new urlLib(url);
    url = uri.origin + "/sap/opu/odata/sap/CA_OC_OUTPUT_REQUEST_SRV/";
    const srv = await service.odata.init(url, username, password);
    //await service.init;
    const dataBuffer = await srv.Items.key(outputConf).GetDocument.get();
    return dataBuffer;
  };

  /**
  * @function readPdfFromDirectUrl
  * @memberOf service.odata
  * @description returns a stream of pdf file which is part of attachment.
  * @param {url} url - system url
  * @param {username} - [OPTIONAL] username for login
  * @param {password} - [OPTIONAL] password for login
  * @example  const url = "https://domain.com/getPdfFile";
      const pdfStream = await oData.common.service.readPdfFromDirectUrl(url, "username", "Password");
  */
  this.readPdfFromDirectUrl = async function (url, username, password, isSaml = false) {
    if (url === undefined || url === null) {
      throw new Error("Function 'readPdfFromDirectUrl' Failed. Please provide valid url as first parameter");
    }
    const res = await _doRequest(url, username, password, isSaml);
    return res;
  };

  // =================================== HELPER ===================================
  function _doRequest(url, username, password, isSaml) {
    //const auth = new Buffer(username + ":" + password).toString("base64");
    const options = {
      encoding: null,
      "content-type": "application/pdf"
    };
    if (username && password) {
      if (isSaml) {
        options.auth = username + ":" + password;
      } else {
        options.auth = {
          user: username,
          pass: password
        };
      }

    }
    curl.getAsync = util.promisify(curl.get);
    return curl.getAsync(url, options);
  }

};
module.exports = new OData();