"use strict";

// =================================== TYPES ====================================
interface IHeaders {
  [key: string]: string;
}

interface IParams {
  [key: string]: string;
}

// =================================== CONSTANTS ================================
const SERVICE_INIT_ERROR = "Service instance not found. Make sure the service is initialized and passed to the request.";
const entitySetError = (entitySet: any) => `Entity Set "${entitySet}" not found in service.`;

// =================================== MAIN =====================================
/**
 * @class odata
 * @memberof service
 */
export class OData {
  readonly utilModule = require("util");
  readonly urlLib = require("url").URL;
  readonly axios = require("axios");

  Service: any;
  constructor() {
    try {
      this.Service = require("@sap_oss/odata-library").Service;
    } catch (error) {
      util.console.error("OData test client Service issue: Probably @sap_oss/odata-library was not installed as a npm module.");
    }
  }

  /**
   * @function init
   * @memberOf service.odata
   * @description Initializes the OData Service.
   * XCSRF-Token will be automatically fetched and stored in the service instance.
   * Cookies will also automatically assembled and stored in the service instance.
   * @param {String} url - The base url of the service.
   * @param {String} username - The username to authenticate the service.
   * @param {String} password - The password of the username.
   * @param {Boolean}  [loggingEnabled=false] - The boolean param to control whether user wants to see logs during build run.
   * @param {Object} [params={}] - JSON object with key-value pairs of parameter names and corresponding values.
   * By default we send {
   *  "client": "715",
   *  "documentation": ["heading", "quickinfo"],
   *  "language": "EN"
   * }
   * These can be overridden by sending params as JSON object with additional params as shown in example.
   * @param {String} [authType] - authentication type, in case you want to override the default
   * SAML authentication. Set this to "basic", to use basic authentication for communication users for whom SAML login doesn't work.
   * Or "none" for no authentication.
   * @param {Object} [headers=undefined] - JSON object with key-value pairs of optional headers.
   * @returns {Object} The initialized service object.
   * @example const url = "<urlToSystem>/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
   * const params = {
   *  "saml2": "disabled",
   *  "language": "de"
   * }
   * const srv = await service.odata.init(url, user, password, false, params);
   * @example const base64Credentials = Buffer.from(`${user}:${password}`).toString("base64");
   * const authHeaders = {
   *   "Authorization": `Basic ${base64Credentials}`,
   *   "DwC-Tenant": tenant
   * };
   *
   * const srv = await service.odata.init(url, user, password, true, params, "headers", authHeaders);
   */
  async init(url: string, username: string, password: string, loggingEnabled = false, params = {}, authType?: string, headers?: any): Promise<any> {
    const logger = {
      trace: () => {},
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error
    };

    const auth: any = {
      username,
      password
    };
    if (authType) auth.type = authType;
    if (headers && Object.entries(headers).length > 0) auth.headers = headers;

    const srv = new this.Service({
      logger: loggingEnabled ? logger : "",
      url,
      auth,
      params,
      strict: false
    });

    await srv.init;

    return srv;
  }

  /**
   * @function get
   * @memberOf service.odata
   * @description Sends a GET request to retrieve data from the specified OData entity set.
   * @param {Object} srv - An instance of the service.
   * @param {String} entitySet - The entity set from which data is to be retrieved.
   * @param {Object} keys - The required keys for the GET request.
   * @param {Boolean} [raw=false] - Specifies whether the response should include all header contents.
   * @param {Object} [headers] - Optional headers to be included in the request.
   * @param {Object} [queryParams] - JSON object of key value pairs of custom query parameters.
   * @returns {Promise} A Promise that resolves to the response data.
   * @example const url = "<baseUrl>/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/";
   * const srv = await service.odata.init(url, user, password);
   * const keys = {
   *   PurchaseOrder: "4100000000"
   * };
   * const queryParams = {
   *  "$top" : 5,
   *  "$skip" : 10,
   * };
   * const headers = {
   *   'X-Custom-Header': 'foobar'
   * }
   * const res = await service.odata.get(srv, "A_PurchaseOrder", keys, false, headers, queryParams);
   */
  async get(srv: any, entitySet: string, keys: any, raw: boolean = false, headers?: IHeaders, queryParams?: any): Promise<any> {
    if (!srv) throw new Error(SERVICE_INIT_ERROR);

    let entity = srv[entitySet];
    if (!entity) throw new Error(entitySetError(entitySet));

    if (headers) entity = this._applyHeaders(entity, headers);

    if (queryParams) entity = this._applyQueryParameters(entity, queryParams);

    if (raw) entity = entity.raw();

    if (keys && Object.entries(keys).length > 0) {
      return entity.get(keys);
    } else {
      return entity.get();
    }
  }

  /**
   * @function getEntitySet
   * @memberOf service.odata
   * @description GET's the EntitySet collection.
   * @param {Object} srv - Instance of the service
   * @param {String} entitySet - The entitySet you want to GET from.
   * @param {String} [filterString] - The filters to be applied on get query
   * @param {String} [selectionFields] - comma separated list of fields to be selected
   * @param {Object} [queryParams] - JSON object of key value pairs of custom query parameters.
   * @returns {Promise} A Promise that resolves to the response data.
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
  async getEntitySet(srv: any, entitySet: string, filterString: string = "", selectionFields: string = "", queryParams?: any): Promise<any> {
    if (!srv) throw new Error(SERVICE_INIT_ERROR);

    let entity = srv[entitySet];
    if (!entity) throw new Error(entitySetError(entitySet));

    if (filterString) entity = entity.filter(filterString);

    if (selectionFields) entity = entity.select(selectionFields.split(","));

    if (queryParams) entity = this._applyQueryParameters(entity, queryParams);

    return entity.get();
  }

  /**
   * @function post
   * @memberOf service.odata
   * @description Sends a POST request to retrieve data from the specified OData entity set for the given payload.
   * @param {Object} srv - Instance of the service
   * @param {String} entitySet - The entitySet you want to POST against.
   * @param {Object} payload - The payload of the POST request.
   * @param {Boolean} [raw=false] - Specifies whether the response should include all header contents.
   * @param {Object} [headers] - Optional headers to be included in the request.
   * @param {Object} [queryParams] - JSON object of key value pairs of custom query parameters.
   * @returns {Promise} A Promise that resolves to the response data.
   * @example
   * const payload = {
   *  "PurchaseOrder": "4500007108",
   *  "DraftUUID": "00000000-0000-0000-0000-000000000000",
   *  "IsActiveEntity": "true"
   * };
   * const res = await service.odata.post(srv, "A_PurchaseOrder", payload);
   */
  async post(srv: any, entitySet: string, payload: any, raw: boolean = false, headers?: IHeaders, queryParams?: any): Promise<any> {
    if (!srv) throw new Error(SERVICE_INIT_ERROR);

    let entity = srv[entitySet];
    if (!entity) throw new Error(entitySetError(entitySet));

    if (headers) entity = this._applyHeaders(entity, headers);

    if (queryParams) entity = this._applyQueryParameters(entity, queryParams);

    if (raw) entity = entity.raw();

    return entity.post(payload);
  }

  /**
   * @function merge
   * @memberOf service.odata
   * @description @description Sends a MERGE request to merge data from the specified OData entity set for the given payload.
   * @param {Object} srv - Instance of the service
   * @param {String} entitySet - The entitySet you want to MERGE in.
   * @param {Object} payload - The payload of the MERGE request.
   * @param {Object} [headers] - Optional headers to be included in the request.
   * @returns {Promise} A Promise that resolves to the response data.
   * @example
   * const res = await service.odata.merge(srv, "A_PurchaseOrderScheduleLine", {
   *  "PurchasingDocument": "4500007108",
   *  "PurchasingDocumentItem": "10",
   *  "ScheduleLine": "1",
   *  "ScheduleLineDeliveryDate": new Date()
   * };
   */
  async merge(srv: any, entitySet: string, payload: any, headers?: IHeaders): Promise<any> {
    if (!srv) throw new Error(SERVICE_INIT_ERROR);

    let entity = srv[entitySet];
    if (!entity) throw new Error(entitySetError(entitySet));

    if (headers) entity = this._applyHeaders(entity, headers);

    return await entity.merge(payload);
  }

  /**
   * @function delete
   * @memberOf service.odata
   * @description Sends a DELETE request to the specified OData entity set.
   * @param {Object} srv - Instance of the service.
   * @param {String} entitySet - The entitySet you want to DELETE.
   * @param {Object} options - The options for the DELETE request.
   * @param {Object} [headers] - Optional headers to be included in the request.
   * @returns {Promise} A Promise that resolves to the response data.
   * @example
   * const options = {
   *  "PurchaseOrder": "",
   *  "DraftUUID": draftUUID,
   *  "IsActiveEntity": false
   * };
   * const res = await service.odata.delete(srv, "C_PurchaseOrderTP", options);
   */
  async delete(srv: any, entitySet: string, options: any, headers?: IHeaders): Promise<any> {
    if (!srv) throw new Error(SERVICE_INIT_ERROR);

    let entity = srv[entitySet];
    if (!entity) throw new Error(entitySetError(entitySet));

    if (headers) entity = this._applyHeaders(entity, headers);

    return await entity.delete(options);
  }

  /**
   * @function callFunctionImport
   * @memberOf service.odata
   * @description Sends a function import request to the OData service instance.
   * @param {Object} srv - Instance of the service.
   * @param {String} functionImportName - Name of Function Import.
   * @param {Object} options - Parameters for function import.
   * @returns {Promise} A Promise that resolves to the response data.
   * @example
   * const options = {
   *  CentralRequestForQuotation : "7500000026",
   *  Supplier : "100006"
   * };
   * const res = await service.odata.callFunctionImport(srv, "Cancel", options);
   */
  async callFunctionImport(srv: any, functionImportName: string, options: any, raw: boolean = false): Promise<any> {
    if (!srv) throw new Error(SERVICE_INIT_ERROR);

    let functionImport = srv.functionImports[functionImportName];

    if (raw) functionImport = functionImport.raw();

    return await functionImport.call(options);
  }

  /**
   * @function isFeatureToggleActivated
   * @memberOf service.odata
   * @description Checks if a feature toggle is switched on or off.
   * @param {Object} srv - Instance of the service
   * @param {String} featureName - The name of the feature you want know the status of.
   * @returns {Promise} A Promise that resolves to a bool value.
   * @example const url = browser.params.systemUrl + "/sap/opu/odata/SAP/CA_FM_FEATURE_TOGGLE_STATUS_SRV/";
   * const srv = await service.odata.init(url, user, password);
   * let isFeatureActive = await service.odata.isFeatureToggleActivated(srv, "MM_PUR_PO_BATCHES_IN_MANAGE_PO");
   */
  async isFeatureToggleActivated(srv: any, featureName: string): Promise<boolean> {
    if (!srv) throw new Error(SERVICE_INIT_ERROR);

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
  }

  // =================================== PDF ======================================
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
  async getOutputManagementPdfStream(outputConf: any, url: string, username: string, password: string) {
    if (arguments.length < 4) {
      throw new Error("getOutputManagementPdfStream Failed. Please send correct parameters");
    }
    const uri = new this.urlLib(url);
    url = uri.origin + "/sap/opu/odata/sap/CA_OC_OUTPUT_REQUEST_SRV/";
    const srv = await service.odata.init(url, username, password);
    const dataBuffer = await srv.Items.key(outputConf).GetDocument.get();
    return dataBuffer;
  }

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
  async readPdfFromDirectUrl(url: string, username: string, password: string, isSaml = false) {
    if (url === undefined || url === null) {
      throw new Error("Function 'readPdfFromDirectUrl' Failed. Please provide valid url as first parameter");
    }
    return await this._doRequest(url, username, password, isSaml);
  }

  // =================================== HELPER ===================================
  async _doRequest(url: string, username: string, password: string, isSaml: boolean) {
    //const auth = new Buffer(username + ":" + password).toString("base64");
    const options: any = {
      encoding: null,
      "content-type": "application/pdf"
    };
    if (username && password) {
      if (isSaml) {
        // works only for SAP odata services
        const serviceUrl = url.match(/.*\/[a-zA-Z0-9_]+_SRV\//)?.[0];
        if (serviceUrl) {
          let relativePath = "/" + url.substring(serviceUrl.length);
          const srv = await service.odata.init(serviceUrl, username, password);
          const pdfResp = await srv.agent.get(relativePath);
          return pdfResp.arrayBuffer();
        } else {
          throw new Error("SAML login option is available only for SAP ODATA services");
        }
      } else {
        options.auth = {
          user: username,
          pass: password
        };
      }
    }
    return new Promise((resolve, reject) => {
      this.axios.get(url, options)
        .then((response: any) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }

  _applyHeaders(entity: any, headers: IHeaders) {
    for (const [key, value] of Object.entries(headers)) {
      entity.header(key, value);
    }

    return entity;
  }

  _applyQueryParameters(entity: any, params: IParams) {
    for (const [key, value] of Object.entries(params)) {
      entity.queryParameter(key, value);
    }

    return entity;
  }
}
export default new OData();
