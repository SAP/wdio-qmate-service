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
   * common.assertion.expectEqual(res.data.title, "qmate-service");
   */
  async get(uri: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
    try {
      return await this.axios.get(uri, config);
    } catch (error: any) {
      let message = error.message;
      if (error.message) {
        if (error.response && error.response.statusText) {
          message = `${error.response.statusText} - ${error.message}`;
        }
      } else if (error.response) {
        message = `Status Code ${error.response.status}, - ${error.response.data}`;
      }
      const newError = new Error(message);
      throw Object.assign(error, {message, stack: newError.stack}); 
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
   * @example const payload = {
        id: 99,
        title: "qmate-service",
        author: "marvin"
      };
      const config = {
        headers: {
          "X-CSRF-TOKEN": "<CSRF TOKEN>", 
          "Cookie": "<COOKIE>",
          "Content-Type": "application/json"
        }
      };
      let res = await service.rest.post(`${browser.config.baseUrl}/posts/99`, payload, config);
   */
  async post(uri: string, payload: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
    try {
      return await this.axios.post(uri, payload, config);
    } catch (error: any) {
      let message = error.message;
      if (error.message) {
        if (error.response && error.response.statusText) {
          message = `${error.response.statusText} - ${error.message}`;
        }
      } else if (error.response) {
        message = `Status Code ${error.response.status}, - ${error.response.data}`;
      }
      const newError = new Error(message);
      throw Object.assign(error, {message, stack: newError.stack}); 
    }
  }

  /**
   * @function delete
   * @memberOf service.rest
   * @description makes a DELETE request.
   * @param {String} uri - The uri to the data source you want to DELETE.
   * @param {Object} [config] - The config options for the request.
   * @returns {Object} The response of the DELETE request.
   * @example 
   *  const config = {
        auth: {
          "username": "<username>", 
          "password": "<password>"
        }
      };
      let res = await service.rest.delete(`${browser.config.baseUrl}/posts/99`, config);
   */
  async delete(uri: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
    try {
      return await this.axios.delete(uri, config);
    } catch (error: any) {
      let message = error.message;
      if (error.message) {
        if (error.response && error.response.statusText) {
          message = `${error.response.statusText} - ${error.message}`;
        }
      } else if (error.response) {
        message = `Status Code ${error.response.status}, - ${error.response.data}`;
      }
      const newError = new Error(message);
      throw Object.assign(error, {message, stack: newError.stack}); 
    }
  }

  /**
   * @function patch
   * @memberOf service.rest
   * @description makes a PATCH request.
   * @param {String} uri - The uri to the data source you want to PATCH.
   * @param {Object} payload - The data to be used for updating the entity.
   * @param {Object} [config] - The config options for the request.
   * @returns {Object} The response of the PATCH request.
   * @example 
   *  const config = {
        auth: {
          "username": "<username>", 
          "password": "<password>"
        }
      };
      const payload = {
        "title": "patched-qmate-service",
        "author": "qmate-tester"
      },
      let res = await service.rest.patch(`${browser.config.baseUrl}/posts/99`, payload, config);
   */
  async patch(uri: string, payload: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
    try {
      return await this.axios.patch(uri, payload, config);
    } catch (error: any) {
      let message = error.message;
      if (error.message) {
        if (error.response && error.response.statusText) {
          message = `${error.response.statusText} - ${error.message}`;
        }
      } else if (error.response) {
        message = `Status Code ${error.response.status}, - ${error.response.data}`;
      }
      const newError = new Error(message);
      throw Object.assign(error, {message, stack: newError.stack}); 
    }
  }

  /**
   * @function put
   * @memberOf service.rest
   * @description makes a PUT request.
   * @param {String} uri - The uri to the data source you want to PUT.
   * @param {Object} payload - The data to be used for updating the entity.
   * @param {Object} [config] - The config options for the request.
   * @returns {Object} The response of the PUT request.
   * @example 
   *  const config = {
        auth: {
          "username": "<username>", 
          "password": "<password>"
        }
      }
      const payload = {
        "id": 99,
        "title": "put-qmate-service",
        "author": "qmate-tester"
      },
      let res = await service.rest.put(`${browser.config.baseUrl}/posts/99`, payload, config);
   */
    async put(uri: string, payload: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> {
      try {
          return await this.axios.put(uri, payload, config);
      } catch (error: any) {
        let message = error.message;
        if (error.message) {
          if (error.response && error.response.statusText) {
            message = `${error.response.statusText} - ${error.message}`;
          }
        } else if (error.response) {
          message = `Status Code ${error.response.status}, - ${error.response.data}`;
        }
        const newError = new Error(message);
        throw Object.assign(error, {message, stack: newError.stack}); 
      }
    }
}
export default new Rest();
