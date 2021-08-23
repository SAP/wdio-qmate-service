/* eslint-disable no-console */
const util = require("util");

/**
* @class service
* @memberof odata.common
*/
const Service = function () {
  const urlLib = require("url").URL;
  const curl = require("curl");
  //private function to do curl request.
  function doRequest(url, username, password, isSaml) {
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

  let Service;
  try {
    Service = require("@sap_oss/odata-library/lib/Service");
  } catch (error) {
    console.error("OData test client Service problem - probably @sap_oss/odata-library was not installed as an npm module");
  }

  //@TODO: markdown that there is no draft for odata-API's
  //If user wants to send requests against normal Services UUID and isActiveEntity as key are mandatory!

  /**
   * @function init

   * @memberOf odata.common.service
   * @description Intializes The service to work with.
   * XCSRF-Token will be automatically fetched and stored in the service instance.
   * Cookies will also automatically assembled and stored in the service instance.
   * @param {url} url - The base url of the service
   * @param {username} username - The username.
   * @param {password} password - The password of the username.
   * @returns {Object} The initialized service object.
   * @example const url = "https://super-sensitive.domain.name/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
   * service = await odata.common.service.init(url, user, password);
   */
  this.init = async function (url, username, password, loggingEnabled = false) {
    const logger = {
      "trace": () => { },
      "debug": console.debug,
      "info": console.info,
      "warn": console.warn,
      "error": console.error
    };

    const service = new Service({
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
    await service.init;

    return service;
  };

  /**
   * @function get
   * @memberOf odata.common.service
   * @description makes a GET request.
   * @param {service} service - Instance of the service
   * @param {entitySet} entitySet - The entitySet you want to GET from.
   * @param {keys} keys - The required keys for the GET-request.
   * @example const url = "https://super-sensitive.domain.name/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
   * service = await odata.common.service.init(url, user, password);
   */
  this.get = async function (service, entitySet, options) {
    return service[entitySet].get(options);
  };

  /**
   * @function getEntitySet
   * @memberOf odata.common.service
   * @description GET's the EntitySet collection.
   * @param {service} service - Instance of the service
   * @param {entitySet} entitySet - The entitySet you want to GET from.
   * @example const url = "https://super-sensitive.domain.name/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
   * service = await odata.common.service.init(url, user, password);
   * let res = await odata.common.service.getEntitySet(service, "A_PurchaseOrder");
   */
  this.getEntitySet = async function (service, entitySet) {
    if (!service) {
      throw new Error("Service is not defined. Please make sure to initialize and pass the service.");
    } else {
      const res = await service[entitySet].get();
      return res;
    }
  };

  /**
  * @function isFeatureToggleActivated
  * @memberOf odata.common.service
  * @description checks if a feature toggle is switched on or off
  * @param {service} service - Instance of the service
  * @param {featureName} featureName - The name of the feature you want know the status of.
  * @example const url = browser.params.systemUrl + "/sap/opu/odata/SAP/CA_FM_FEATURE_TOGGLE_STATUS_SRV/";
  * service = await odata.common.service.init(url, user, password);
  * let isFeatureActive = await odata.common.service.isFeatureToggleActivated(service, "MM_PUR_PO_BATCHES_IN_MANAGE_PO");
  */
  this.isFeatureToggleActivated = async function (service, featureName) {
    const res = await this.getEntitySet(service, "ToggleStatusSet");
    for (const featureEntity of Object.values(res)) {
      if (featureEntity.Featureid === featureName) {
        //feature toggle is disabled if found
        console.log(`Feature Toggle "${featureName}" is disabled.`);
        return false;
      }
    }
    //feature toggle is enabled if NOT found
    console.log(`Feature Toggle "${featureName}" is enabled.`);
    return true;
  };

  /**
   * @function post

   * @memberOf odata.common.service
   * @description makes a POST request.
   * @param {service} service - Instance of the service
   * @param {entitySet} entitySet - The entitySet you want to POST against.
   * @param {payload} payload - The payload for the POST-request.
   * @example let keys = {
   *              "PurchaseOrder": "4500007108",
   *              "DraftUUID": "00000000-0000-0000-0000-000000000000",
   *              "IsActiveEntity": "true"
   *          };
   * let res = await odata.common.service.get(service, "A_PurchaseOrder", keys);
   */
  this.post = async function (service, entitySet, payload) {
    const res = await service[entitySet].post(payload);
    return res;
  };

  /**
  * @function merge
  * @memberOf odata.common.service
  * @description makes a MERGE request.
  * @param {service} service - Instance of the service
  * @param {entitySet} entitySet - The entitySet you want to MERGE in.
  * @param {payload} payload - The payload for the MERGE-request.
  * @example let res = await odata.common.service.merge(service, "A_PurchaseOrderScheduleLine", {
  *              "PurchasingDocument": "4500007108",
  *              "PurchasingDocumentItem": "10",
  *              "ScheduleLine": "1",
  *              "ScheduleLineDeliveryDate": new Date()
  *          };
  * let res = await odata.common.service.get(service, "A_PurchaseOrder", keys);
  */
  this.merge = async function (service, entitySet, payload) {
    const res = await service[entitySet].merge(payload);
    return res;
  };

  /**
  * @function delete
  * @memberOf odata.common.service
  * @description makes a DELETE request.
  * @param {service} service - Instance of the service
  * @param {entitySet} entitySet - The entitySet you want to DELETE.
  * @param {options} options - The options for the DELETE-request.
  * @example  let options = {
                "PurchaseOrder": "",
                "DraftUUID": draftUUID,
                "IsActiveEntity": false
              };
              await odata.common.service.delete(service, "C_PurchaseOrderTP", options);
  */
  this.delete = async function (service, entitySet, options) {
    const res = await service[entitySet].delete(options);
    return res;
  };

  /**
  * @function callFunctionImport
  * @memberOf odata.common.service
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
  this.callFunctionImport = async function (service, functionImportName, options) {
    const functionImport = service.functionImports[functionImportName];

    const res = await functionImport.call(options);
    return res;
  };

  // /**
  // * @function getOutputManagementPdfStream
  // * @memberOf odata.common.service
  // * @description returns a stream of output management pdf file.
  // * @param {outputConf} outputConf - Configuration for the output management pdf.
  // * @param {url} url - system url
  // * @param {username} - username for login
  // * @param {password} - password for login
  // * @example  const outputConf = {
  //               ApplObjectType: "REQUEST_FOR_QUOTATION",
  //               ApplObjectId: "7000002653",
  //               ItemId: "1"
  //             };
  //             const pdfStream = await oData.common.service.getOutputManagementPdfStream(outputConf, url, user, password);

  // */
  this.getOutputManagementPdfStream = async function (outputConf, url, username, password) {
    if (arguments.length < 4) {
      throw new Error("getOutputManagementPdfStream Failed. Please send correct parameters");
    }
    const uri = new urlLib(url);
    url = uri.origin + "/sap/opu/odata/sap/CA_OC_OUTPUT_REQUEST_SRV/";
    const service = await oData.common.service.init(url, username, password);
    //await service.init;
    const dataBuffer = await service.Items.key(outputConf).GetDocument.get();
    return dataBuffer;
  };

  /**
  * @function readPdfFromDirectUrl
  * @memberOf odata.common.service
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
    const res = await doRequest(url, username, password, isSaml);
    return res;
  };

};
module.exports = new Service();