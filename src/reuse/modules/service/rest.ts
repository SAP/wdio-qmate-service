"use strict";

import { AxiosRequestConfig, AxiosResponse, AxiosStatic } from "axios";

/**
 * @class rest
 * @memberof service
 */
export class Rest {
  private axios: AxiosStatic = require("axios").default;

  /**
   * @function init
   * @memberOf service.rest
   * @description Returns an axios instance for custom axios handling.
   * @param {Object} [customConfig= {}] - Custom config for axios. If not specified axios defaults will be taken. 
   * @returns {Object} The axios instance.
   * @example const customConfig = {
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {
      'X-Custom-Header': 'foobar'
    }
   * const axios = service.rest.init(customConfig);
   */

  init(customConfig: AxiosRequestConfig<any> | undefined = {}) {
    return this.axios.create(customConfig);
  }

  /**
   * @function get
   * @memberOf service.rest
   * @description makes a GET request.
   * @param {String} uri - The uri to the data source you want to GET.
   * @param {Object} [config] - The config options for the request.
   * @returns {Object} The response of the GET request.
   * @example const uri = https://api.predic8.de/shop/products/";
   * let res = await service.rest.get(uri);
   */
  async get(uri: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
    try {
      return await this.axios.get(uri, config);
    } catch (error: any) {
      if (error.message) {
        if (error.response && error.response.statusText) {
          throw new Error(`${error.response.statusText} - ${error.message}`);
        }
        throw new Error(`${error.message}`);
      } else if (error.response) {
        throw new Error(`Status Code ${error.response.status}, - ${error.response.data}`);
      } else {
        throw new Error(error.request);
      }
    }
  }

  /**
   * @function post
   * @memberOf service.rest
   * @description makes a POST request.
   * @param {String} uri - The uri to the data source you want to POST against.
   * @param {Object} payload - The data you want to POST against your entity set.
   * @param {Object} [config] - The config options for the request.
   * @returns {Object} The response of the POST request.
   * @example let res = await service.rest.delete(`${browser.config.baseUrl}/posts/99`);
   */
  async post(uri: string, payload: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
    try {
      return await this.axios.post(uri, payload, config);
    } catch (error: any) {
      if (error.message) {
        if (error.response && error.response.statusText) {
          throw new Error(`${error.response.statusText} - ${error.message}`);
        }
        throw new Error(`${error.message}`);
      } else if (error.response) {
        throw new Error(`Status Code ${error.response.status}, - ${error.response.data}`);
      } else {
        throw new Error(error.request);
      }
    }
  }

  /**
   * @function delete
   * @memberOf service.rest
   * @description makes a DELETE request.
   * @param {String} uri - The uri to the data source you want to DELETE.
   * @param {Object} [config] - The config options for the request.
   * @returns {Object} The response of the DELETE request.
   * @example let res = await service.rest.delete(`${browser.config.baseUrl}/posts/99`);
   */
  async delete(uri: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
    try {
      return await this.axios.delete(uri, config);
    } catch (error: any) {
      if (error.message) {
        if (error.response && error.response.statusText) {
          throw new Error(`${error.response.statusText} - ${error.message}`);
        }
        throw new Error(`${error.message}`);
      } else if (error.response) {
        throw new Error(`Status Code ${error.response.status}, - ${error.response.data}`);
      } else {
        throw new Error(error.request);
      }
    }
  }

  /**
   * @function patch
   * @memberOf service.rest
   * @description makes a PATCH request.
   * @param {String} uri - The uri to the data source you want to PATCH.
   * @param {Object} [config] - The config options for the request.
   * @returns {Object} The response of the PATCH request.
   * @example let res = await service.rest.patch(`${browser.config.baseUrl}/posts/99`);
   */
  async patch(uri: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
    try {
      return await this.axios.patch(uri, config);
    } catch (error: any) {
      if (error.message) {
        if (error.response && error.response.statusText) {
          throw new Error(`${error.response.statusText} - ${error.message}`);
        }
        throw new Error(`${error.message}`);
      } else if (error.response) {
        throw new Error(`Status Code ${error.response.status}, - ${error.response.data}`);
      } else {
        throw new Error(error.request);
      }
    }
  }
}
export default new Rest();
