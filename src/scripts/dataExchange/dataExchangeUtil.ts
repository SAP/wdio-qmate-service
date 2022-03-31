/* eslint-disable no-console */
/**
 * @class importExportDataUtil
 * Utility functions to import data to be used in test specs from JSON files, or folders.
 * Export data to JSON files.
 */
import fs from 'fs-extra'
import path from 'path'

class DataExchangeUtil {

  /**
   * @function getFileAbsPath
   * @param {string} fileWithPath - file with relative or absolute file path
   * @return {string} the file with absolute file path
   * @example await getFileAbsPath("./data/myfolder/po.json");
   */
  getFileAbsPath (fileWithPath: string): string | undefined {
    if (!process.env.CONFIG_PATH) {
      console.warn("Internal error: process.env.CONFIG_PATH not set");
      return;
    }
    return path.resolve(process.env.CONFIG_PATH, fileWithPath);
  };

  /**
   * @function isReadable - checks if file is present and readable
   * @param {string} filename - file name with full path
   * @return {Boolean} - true if file is readable, false if file is not present or not readable  
   */
  async isReadable (filename: string): Promise<boolean> {
    try {
      await fs.access(filename, fs.constants.R_OK);
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
   * @function readJson - reads JSON data from a file. This method has been added, since unlike fs-extra.readJson, this
   * one handles empty JSON files. It returns null object if file is empty.
   * @param {string} filename - file name with full path
   * @return {object} - the JSON data
   * @throws {*} - throws an error if file is not readable, or if data is not valid JSON
   */
  async readJson (filename: string): Promise<object> {
    // handle empty files
    const data = await fs.readFile(filename, "utf-8");
    return data && data.trim() ? JSON.parse(data) : null;
  };

  /**
   * @function outputJson - writes JSON data into a file. This method has been added, since unlike fs-extra.outputJson, this
   * one writes an empty file if JSON data is null or if empty object.
   * fs-extra.outputJson is used internally, which will create the file and output directory if required.
   * @param {string} fileWithPath - file name with full path
   * @param {object} data - the JSON data
   * @param {object} options - options, e.g. {spaces: 2} to pretty print JSON
   * @throws {*} - throws an error if file is not writable
   */
  async outputJson (fileWithPath: string, data: object, options?: object): Promise<void> {
    // if output directory or file does not exist, it gets created
    // handle empty data object
    if (!data ||
      (Array.isArray(data) && data.length <= 0) ||
      Object.keys(data).length <= 0) {
      // write empty file if there is no data
      await fs.outputFile(fileWithPath, "");
    } else {
      options = options || { spaces: 2 };
      await fs.outputJson(fileWithPath, data, options);
    }
  };

  /**
   * @function readData - read import data and assign the values to browser.params.import
   * if params is ["po"] then data read from file or folder will be assigned to browser.params.import.po
   * @param {string} fileOrDir - file or directory with full path
   * @param {string[]} params - the keys under which data should be stored
   */
  async readData (fileOrDir: string, params: string[]): Promise<void> {
    const stat = await fs.stat(fileOrDir);

    if (stat.isDirectory()) {
      await this.readFolder(fileOrDir, params);
    } else if (stat.isFile()) {
      await this.readFile(fileOrDir, params);
    }
  };

  /**
   * @function readFolder - read json files in specified folder and any subfolders under it
   * if params = ["test1", "purchaseRequisition"] then the data read from folder will be 
   * assigned to browser.params.import.test1.purchaseRequisition
   * if file "data1.json" is present in the folder, then the data from this json file will go
   * under browser.params.import.test1.purchaseRequisition.data1, the file prefix is used as key
   * if subfolder "testsubfolder1" is encountered, then the file data will go under
   * browser.params.import.test1.purchaseRequisition.testsubfolder1, the subfolder name is used as key
   * @param {string} folder - folder with complete path
   * @param {string[]} params - the keys hierarchy under which data should be stored
   */
  async readFolder (folder: string, params: string[]): Promise<void> {
    const files = await fs.readdir(folder, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        // recursively add subfolders using the subfolder name as key
        await this.readFolder(path.resolve(folder, file.name), [...params, file.name]);
      } else if (file.isFile()) {
        const filename = file.name;
        const fileWithPath = path.resolve(folder, file.name);
        if (!filename) {
          console.warn("Invalid filename, filename is blank");
        }
        else if (filename.match(/\.json$/)) {
          const filePrefix = filename.replace(/(.*)\.json$/, "$1");
          await this.readFile(fileWithPath, [...params, filePrefix]);
        } else {
          console.warn(
            `Only json data files are read. ${fileWithPath} does not have json file suffix`
          );
        }
      }
    }
  };

  /**
   * @function readFile
   * reads json data in the specified file and assigns to browser.params.import
   * if params = ["test1", "purchaseRequisition"] then the data read from file will be 
   * assigned to browser.params.import.test1.purchaseRequisition
   * @param {string} filename - file to be read, includes path
   * @param {string[]} params - the keys hierarchy under which data should be stored
   */
  async readFile (filename: string, params: string[]): Promise<void> {
    try {
      if (!params || params.length <= 0) {
        console.warn("Invalid key params sent, key array is empty");
        return;
      }
      let browserImport = browser.params.import;
      if (!browserImport) {
        console.warn("Unexpected error encountered. 'browser.params.import' is null");
        return;
      }

      // handle empty files
      const data = await this.readJson(filename);
      params.forEach((p, idx) => {
        // string points to file or folder, remove and replace with empty object
        if (browserImport[p] && typeof browserImport[p] === "string") {
          browserImport[p] = {};
        }
        else if (!browserImport[p]) {
          browserImport[p] = {};
        }

        if (idx === (params.length - 1)) {
          browserImport[p] = data;
        } else {
          browserImport = browserImport[p];
        }
      });
    } catch (err) {
      let browserImport = browser.params.import;
      params.forEach((p, idx) => {
        if (browserImport && idx != (params.length - 1)) {
          browserImport = browserImport[p];
        } else if (browserImport) {
          // delete this param, since it does not point to a valid json file
          delete browserImport[p];
        }
      });

      console.warn(`Could not read ${filename}, it is not a valid json file`);
      console.warn(err);
    }
  };

};


export default new DataExchangeUtil();
// JS SUPPORT
module.exports = new DataExchangeUtil();
