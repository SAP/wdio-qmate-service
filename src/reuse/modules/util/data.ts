"use strict";
/**
 * @class data
 * @memberof util
 */
export class Data {
  constructor() {
    try {
      require("dotenv").config({
        path: `${__dirname}/../../../private.env`,
      });
    } catch (error) {
      // do nothing
    }
  }

  /**
   * @function getData
   * @memberOf util.data
   * @description Returns the data object with the given filename (JSON, stored in data folder).
   * @param {String} filename - The name of the data file.
   * @returns {String} The data object.
   * @example const data = util.data.getData("myTest");
   */
  getData(filename: string): string {
    if (browser.config.params && browser.config.params.import && browser.config.params.import.data) {
      if (browser.config.params.import.data[filename]) {
        return browser.config.params.import.data[filename];
      } else {
        throw new Error(`Function 'getData' failed. No file with name ${filename} found'`);
      }
    } else {
      throw new Error(`Function 'getData' failed. No data path defined in config.`);
    }
  }

  /**
   * @function getSecureData
   * @memberOf util.data
   * @description Returns and encrypts the data object with the given filename (JSON, stored in data folder). Will return the local file object if private key is not accessible.
   * @param {String} filename - The name of the data file (without suffix '.secure' or '.local').
   * @returns {String} The encrypted or local data object.
   * @example const secureData = util.data.getSecureData("myTest");
   */
  getSecureData(filename: string): string {
    const privateKeyFound = process.env.PRIVATEKEY_FOUND === "true";

    if (privateKeyFound) {
      filename = `${filename}.secure`;
    } else {
      filename = `${filename}.local`;
    }

    if (browser.config.params && browser.config.params.import && browser.config.params.import.data) {
      if (browser.config.params.import.data[filename]) {
        const data = browser.config.params.import.data[filename];

        if (privateKeyFound) {
          this.decryptRecursively(data);
        }

        return data;
      } else {
        throw new Error(`Function 'getSecureData' failed. File '${filename}.json' not found'`);
      }
    } else {
      throw new Error(`Function 'getSecureData' failed. No data path defined in config.`);
    }
  }

  private decryptRecursively(data: any): any {
    for (const key in data) {
      if (typeof data[key] === "object") {
        data[key] = this.decryptRecursively(data[key]);
      } else if (typeof data[key] === "string") {
        data[key] = util.data.decrypt(data[key]);
      }
    }
    return data;
  }
}
export default new Data();
