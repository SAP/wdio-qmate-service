"use strict";

// Common imports
import { promises as fs } from "fs";
import * as path from "path";

// Own imports
import importExportDataUtil from "../../../scripts/dataExchange/dataExchangeUtil";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";

// Types
type DecryptionOptions = {
  useBase64Input: boolean;
  useBase64Output: boolean;
  includeRepoUrl: boolean;
};

/**
 * @class data
 * @memberof util
 */
export class Data {
  // ========================== Class variables ==========================
  private vlf = new VerboseLoggerFactory("util", "data");
  private ErrorHandler = new ErrorHandler();

  private _alreadyDecryptedData: Array<string> = [];

  // ========================== Public functions ==========================
  /**
   * @function getData
   * @memberOf util.data
   * @description Returns the data object with the given filename (JSON, stored in data folder).
   * @param {String} filename - The name of the data file.
   * @param {String} [source=data] - The source key defined under params.import of the config file.
   * @returns {Object} The data object.
   * @example const data = util.data.getData("myTest");
   */
  getData(filename: string, source: string = "data"): object {
    const vl = this.vlf.initLog(this.getData);
    if (browser.config.params && browser.config.params.import && browser.config.params.import[source]) {
      if (browser.config.params.import[source][filename]) {
        return browser.config.params.import[source][filename];
      } else {
        return this.ErrorHandler.logException(new Error(`File '${filename}.json' empty or not defined under '${source}'`));
      }
    } else {
      return this.ErrorHandler.logException(new Error(`Data path '${source}' not defined in config.`));
    }
  }

  /**
   * @function getSecureData
   * @memberOf util.data
   * @description Returns and encrypts the data object with the given filename (JSON, stored in data folder). Will return the local file object if private key is not accessible.
   * @param {String} filename - The name of the data file (without suffix '.secure' or '.local').
   * @param {String} [source=data] - The source key defined under params.import of the config file.
   * @param {Object} [options] - The options object.
   * @returns {Object} The encrypted or local data object.
   * @example const secureData = util.data.getSecureData("myTest");
   */
  getSecureData(filename: string, source: string = "data", options?: { useBase64Input: false; useBase64Output: false; includeRepoUrl: true }): object {
    const vl = this.vlf.initLog(this.getSecureData);

    const privateKeyFound = global.util.data.privateKeyFound === true;

    if (privateKeyFound) {
      filename = `${filename}.secure`;
    } else {
      util.console.info("getSecureData: No private key found. Continue using local file.");
      filename = `${filename}.local`;
    }

    if (browser.config.params && browser.config.params.import && browser.config.params.import[source]) {
      if (browser.config.params.import[source][filename]) {
        const data = browser.config.params.import[source][filename];
        const dataIdentifier = `${source}_${filename}`;

        // Decrypt data if not already decrypted and private key is found
        if (!this._alreadyDecryptedData.includes(dataIdentifier) && privateKeyFound) {
          this._decryptRecursively(data, options);
        }

        // Make sure data is not decrypted again
        this._alreadyDecryptedData.push(dataIdentifier);

        return data;
      } else {
        return this.ErrorHandler.logException(new Error(`File '${filename}.json' empty or not defined under '${source}'`));
      }
    } else {
      return this.ErrorHandler.logException(new Error(`Data path '${source}' not defined in config.`));
    }
  }

  /**
   * @function readDataFromFile
   * @memberOf util.data
   * @description Reads the data object from the given filepath.
   * @param {String} filePath - The filepath.
   * @returns {Object} The data object.
   * @example const data = util.data.readDataFromFile("./data/myData.json");
   */
  async readDataFromFile(filePath: string): Promise<any> {
    const relativeFilePath = importExportDataUtil.getFileAbsPath(filePath);

    if (!relativeFilePath) {
      return this.ErrorHandler.logException(new Error("Filepath could not be resolved."));
    }

    try {
      return JSON.parse(await fs.readFile(path.resolve(relativeFilePath), "utf8"));
    } catch (error) {
      return this.ErrorHandler.logException(new Error(), (error as Error).message);
    }
  }

  /**
   * @function writeDataToFile
   * @memberOf util.data
   * @description Writes the data object to the given filepath.
   * @param {String} filePath - The filepath.
   * @param {Object} data - The data object to write.
   * @example const data = util.data.writeDataToFile("myTest");
   */
  async writeDataToFile(filePath: string, data: any): Promise<void> {
    const relativeFilePath = importExportDataUtil.getFileAbsPath(filePath);

    if (!relativeFilePath) {
      return this.ErrorHandler.logException(new Error("Filepath could not be resolved."));
    }

    try {
      await fs.writeFile(path.resolve(relativeFilePath), JSON.stringify(data));
    } catch (error) {
      return this.ErrorHandler.logException(new Error(), (error as Error).message);
    }
  }

  /**
   * @function decrypt
   * @memberOf util.data
   * @description Decrypts the passed input data.
   * @param {String | Array<String>} data - The encrypted data to decrypt. Single value or array of values for different keys.
   * @param {Object} options - The decryption options.
   * @returns {String} The decrypted data.
   * @example const decrypted = util.data.decrypt("d704004c262faa8ef4bdcf34c8a94883e15524872c7bef334d26a391a1934cf47338b749d99426980ee4cc7a81deaef21439c6894ab0324cdb29b9b6332635baca442651c5d37847f52bb90b8868e037271a7d456024b39b65fdf4dc62e8d82a3d5683a72e4324c59d339742fc79749f0ee74abef916d38e306218adc48e3547a2b346962249320c962d22cb46d9998de36d8219a2496c0997d0fc389f76fb1431a9b57c317886e9c9795c0a09ad98d9fa0b7687d10814dc7973397f3f72a227a04ead4c3d1d428c096a51922ffc4d7afc3952df1c130def5c5fb3e834605cbf1454885966cc65c77046343f4c678e74931fb2dd6cac8dae17837cf674f288d6550dd7fa6b01f5b7ea68aa6bd27d79dd5d53edb5fd4b4edce824bd31b3939352ad7a71a16bab8c54025c2bb92c54e022fcd23ff08bc54a17fc50d00dc3b884cadbfdefe1e75901fdf80e7324ad02a891f2c4863fa120ca238520b79126c65a03");
   */
  decrypt(data: string | Array<string>, options: DecryptionOptions): string {
    const vl = this.vlf.initLog(this.decrypt);
    return global.util.data.decrypt(data, options); // Function is defined under: scripts\hooks\utils\decryption.js
  }

  // ========================== Private functions ==========================
  private _decryptRecursively(data: any, options?: DecryptionOptions): any {
    const vl = this.vlf.initLog(this._decryptRecursively);
    vl.log(`Decrypting ${data}`);
    for (const key in data) {
      if (typeof data[key] === "object" && !Array.isArray(data[key])) {
        data[key] = this._decryptRecursively(data[key], options);
      } else if (typeof data[key] === "string" || Array.isArray(data[key])) {
        data[key] = global.util.data.decrypt(data[key], options);
      }
    }
    return data;
  }
}
export default new Data();
