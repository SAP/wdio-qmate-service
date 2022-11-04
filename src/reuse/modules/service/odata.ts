"use strict";
/**
 * @class odata
 * @memberof service
 */
export class OData {
  readonly utilModule = require("util");
  readonly urlLib = require("url").URL;
  readonly curl = require("curl");

  Service: any;
  constructor() {
    try {
      this.Service = require("@sap_oss/odata-library/lib/Service.js");
    } catch (error) {
      util.console.error("OData test client Service issue: Probably @sap_oss/odata-library was not installed as a npm module.");
    }
  }

  /**
   * @function init
   * @memberOf service.odata
   * @description Initializes The service to work with.
   * XCSRF-Token will be automatically fetched and stored in the service instance.
   * Cookies will also automatically assembled and stored in the service instance.
   * @param {String} url - The base url of the service
   * @param {String} username - The username.
   * @param {String} password - The password of the username.
   * @param {boolean}  [loggingEnabled=false] - The boolean param to control whether user wants to see logs during build run
   * @param {Object} [params={}] - JSON object with key-value pairs of parameter names and corresponding values 
   * by default we send {
   *  "client": "715",
   *  "documentation": ["heading", "quickinfo"],
   *  "language": "EN"
   * }
   * These can be overridden by sending params as JSON object with additional params as shown in example 
   * @param {String} [authType] - authentication type, in case you want to override the default
   * SAML authentication. Set this to "basic", to use basic authentication for communication users for whom SAML login doesn't work.
   * Or "none" for no authentication. 
   * @returns {Object} The initialized service object.
   * @example const url = "<urlToSystem>/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
   * const params = {
   *  "saml2": "disabled",
   *  "language": "de"
   * }
   * srv = await service.odata.init(url, user, password, false, params);
   */
  async init (url: string, username: string, password: string, loggingEnabled = false, params = {}, authType: string = ""): Promise<any> {
    const logger = {
      "trace": () => {},
      "debug": console.debug,
      "info": console.info,
      "warn": console.warn,
      "error": console.error
    };

    const parameters = {
      "client": "715",
      "documentation": ["heading", "quickinfo"],
      "language": "EN"
    };

    if (params) {
      // @ts-ignore
      Object.keys(params).forEach((key) => parameters[key] = params[key]);
    }

    const auth: any = {
      "username": username,
      "password": password
    };

    if (authType) {
      auth["type"] = authType;
    }
    const srv = new this.Service({
      "logger": loggingEnabled ? logger : "",
      "url": url,
      "auth": auth,
      "parameters": parameters, //Define initial request by $metadata?sap-client=<client-number>&sap-documentation=&sap-language=EN
      "strict": false // ignore non critical errors, e.g. orphaned annotations
    });
    await srv.init;

    return srv;
  };

  /**
   * @function get
   * @memberOf service.odata
   * @description makes a GET request.
   * @param {Object} srv - Instance of the service
   * @param {String} entitySet - The entitySet you want to GET from.
   * @param {Object} keys - The required keys for the GET-request.
   * @example const url = "<baseUrl>/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
   * srv = await service.odata.init(url, user, password);
   * const keys = {
   *   PurchaseOrder: "4100000000"
   * };
   * const res = await service.odata.get(srv, "A_PurchaseOrder", keys);
   */
  async get (srv: any, entitySet: string, keys: any): Promise<any> {
    const entity = srv[entitySet];
    if (!entity) {
      throw new Error(`No entity set '${entitySet}' available in service`);
    }
    return entity.get(keys);
  };

  /**
   * @function getEntitySet
   * @memberOf service.odata
   * @description GET's the EntitySet collection.
   * @param {Object} srv - Instance of the service
   * @param {String} entitySet - The entitySet you want to GET from.
   * @param {String} [filterString] - The filters to be applied on get query
   * @param {String} [selectionFields] - comma separated list of fields to be selected
   * @param {Object} [queryParams] - JSON object of key value pairs of custom query parameters.
   * @returns {Array} - Result set array
   * @example 
   * const url = "<baseUrl>/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
   * srv = await service.odata.init(url, user, password);
   * 
   * let filterString = "Status eq '01'";
   * let res = await service.odata.getEntitySet(srv, "A_PurchaseOrder", filterString);
   * 
   * let select = "CentralPurchaseContract,PurchasingProcessingStatus" ;
   * let res = await service.odata.getEntitySet(srv, "A_PurchaseOrder", filterString, select);
   * 
   * let queryParams = {
   *  "$top" : 5,
   *  "$skip" : 10,
   * };
   * let res = await service.odata.getEntitySet(srv, "A_PurchaseOrder", filterString, select, queryParams);
   */
  async getEntitySet (srv: any, entitySet: string, filterString: string = "", selectionFields: string = "", queryParams: any = {}) {
    if (!srv) {
      throw new Error("Service is not defined. Please make sure to initialize and pass the service.");
    } else {
      let entity = srv[entitySet];
      if (!entity) {
        throw new Error(`No entity set '${entitySet}' available in service`);
      }
      if (filterString) {
        entity = entity.filter(filterString);
      }
      if (selectionFields) {
        entity = entity.select(selectionFields.split(","));
      }
      if (queryParams) {
        Object.keys(queryParams).forEach((key) => {
          entity = entity.queryParameter(key, queryParams[key]);
        });
      }
      const res = entity.get();
      return res;
    }
  };

  /**
   * @function isFeatureToggleActivated
   * @memberOf service.odata
   * @description checks if a feature toggle is switched on or off
   * @param {Object} srv - Instance of the service
   * @param {String} featureName - The name of the feature you want know the status of.
   * @example const url = browser.params.systemUrl + "/sap/opu/odata/SAP/CA_FM_FEATURE_TOGGLE_STATUS_SRV/";
   * const srv = await service.odata.init(url, user, password);
   * let isFeatureActive = await service.odata.isFeatureToggleActivated(srv, "MM_PUR_PO_BATCHES_IN_MANAGE_PO");
   */
  async isFeatureToggleActivated (srv: any, featureName: string): Promise<boolean> {
    const res = await this.getEntitySet(srv, "ToggleStatusSet");
    for (const featureEntity of Object.values(res)) {
      // @ts-ignore
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
   * @param {Object} srv - Instance of the service
   * @param {String} entitySet - The entitySet you want to POST against.
   * @param {Object} payload - The payload for the POST-request.
   * @example 
   * let payload = {
   *  "PurchaseOrder": "4500007108",
   *  "DraftUUID": "00000000-0000-0000-0000-000000000000",
   *  "IsActiveEntity": "true"
   * };
   * let res = await service.odata.post(srv, "A_PurchaseOrder", payload);
   */
  async post (srv: any, entitySet: string, payload: any) {
    const entity = srv[entitySet];
    if (!entity) {
      throw new Error(`No entity set '${entitySet}' available in service`);
    }
    return entity.post(payload);
  };

  /**
   * @function merge
   * @memberOf service.odata
   * @description makes a MERGE request.
   * @param {Object} srv - Instance of the service
   * @param {String} entitySet - The entitySet you want to MERGE in.
   * @param {Object} payload - The payload for the MERGE-request.
   * @example 
   * let res = await service.odata.merge(srv, "A_PurchaseOrderScheduleLine", {
   *  "PurchasingDocument": "4500007108",
   *  "PurchasingDocumentItem": "10",
   *  "ScheduleLine": "1",
   *  "ScheduleLineDeliveryDate": new Date()
   * };
   */
  async merge (srv: any, entitySet: string, payload: any) {
    const entity = srv[entitySet];
    if (!entity) {
      throw new Error(`No entity set '${entitySet}' available in service`);
    }
    const res = await entity.merge(payload);
    return res;
  };

  /**
   * @function delete
   * @memberOf service.odata
   * @description makes a DELETE request.
   * @param {Object} srv - Instance of the service
   * @param {String} entitySet - The entitySet you want to DELETE.
   * @param {Object} options - The options for the DELETE-request.
   * @example 
   * let options = {
   *  "PurchaseOrder": "",
   *  "DraftUUID": draftUUID,
   *  "IsActiveEntity": false
   * };
   * await service.odata.delete(srv, "C_PurchaseOrderTP", options);
   */
  async delete (srv: any, entitySet: string, options: any) {
    const entity = srv[entitySet];
    if (!entity) {
      throw new Error(`No entity set '${entitySet}' available in service`);
    }
    const res = await entity.delete(options);
    return res;
  };

  /**
   * @function callFunctionImport
   * @memberOf service.odata
   * @description makes a function import request on an OData service.
   * @param {Object} srv - Instance of the service
   * @param {String} functionImportName - Name of Function Import
   * @param {Object} options - parameters for function import
   * @example 
   * const options = {
   *  CentralRequestForQuotation : "7500000026",
   *  Supplier : "100006"
   * };
   * const res = await service.odata.callFunctionImport(srv, "Cancel", options);
   */
  async callFunctionImport (srv: any, functionImportName: string, options: any) {
    const functionImport = srv.functionImports[functionImportName];

    const res = await functionImport.call(options);
    return res;
  };

  /**
   * @function getOutputManagementPdfStream
   * @memberOf service.odata
   * @description returns a stream of output management pdf file.
   * @param {Object} outputConf - Configuration for the output management pdf.
   * @param {String} url - system url
   * @param {String} username - username for login
   * @param {String} password - password for login
   * @example 
   * const outputConf = 
   *  ApplObjectType: "REQUEST_FOR_QUOTATION",
   *  ApplObjectId: "7000002653",
   *  ItemId: "1"
   * };
   * const pdfStream = await service.odata.getOutputManagementPdfStream(outputConf, url, user, password);
   */
  async getOutputManagementPdfStream (outputConf: any, url: string, username: string, password: string) {
    if (arguments.length < 4) {
      throw new Error("getOutputManagementPdfStream Failed. Please send correct parameters");
    }
    const uri = new this.urlLib(url);
    url = uri.origin + "/sap/opu/odata/sap/CA_OC_OUTPUT_REQUEST_SRV/";
    const srv = await service.odata.init(url, username, password);
    const dataBuffer = await srv.Items.key(outputConf).GetDocument.get();
    return dataBuffer;
  };

  /**
   * @function readPdfFromDirectUrl
   * @memberOf service.odata
   * @description returns a stream of pdf file which is part of attachment.
   * @param {String} url - system url
   * @param {String} [username] - username for login
   * @param {String} [password] - password for login
   * @param {Boolean} [isSaml=false] - use SAML login if true
   * @example 
   * const url = "https://domain.com/getPdfFile";
   * const pdfStream = await service.odata.readPdfFromDirectUrl(url, "username", "Password");
   */
  async readPdfFromDirectUrl (url: string, username: string, password: string, isSaml = false) {
    if (url === undefined || url === null) {
      throw new Error("Function 'readPdfFromDirectUrl' Failed. Please provide valid url as first parameter");
    }
    const res = await this._doRequest(url, username, password, isSaml);
    return res;
  };

  // =================================== HELPER ===================================
  _doRequest(url: string, username: string, password: string, isSaml: boolean) {
    //const auth = new Buffer(username + ":" + password).toString("base64");
    const options : any = {
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
    return new Promise((resolve, reject) => {
      this.curl.get(url, options, function (error: any, res: any, body: any) {
        if (!error) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }

};
export default new OData();
